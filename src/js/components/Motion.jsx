import React from 'react';
import Addons from 'react/addons';
import Constants from '../Constants';
import WebcamMotionStore from '../stores/WebcamMotionStore';
import WebcamMotionActionCreator from '../actions/WebcamMotionActionCreator';
import Dispatcher from '../Dispatcher';
import MotionBox from './MotionBox.jsx';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	getInitialState: function() {
		return {
			motionZone: [{x:0,y:0},{x:0,y:0}]
		};
	},
	// LIFECYCLE ////////////////////////////
	componentDidMount: function() {
		console.log('Motion.jsx > init');
		// by setting the prev/next frame canvases here we avoid finding them during RAF
		this.previousFrameCanvasContext = React.findDOMNode(this.refs.previousFrameCanvas).getContext('2d');
		this.currentFrameCanvasContext  = React.findDOMNode(this.refs.currentFrameCanvas).getContext('2d');
	},
	componentWillUnmount: function() {
		WebcamMotionStore.removeChangeListener(this._onChange);
	},
	componentWillReceiveProps: function(nextProps) {
		if(!this.props.raf && nextProps.raf && nextProps.previousFrame && nextProps.currentFrame) {
			this.compareFrames(nextProps.previousFrame, nextProps.currentFrame);
		}
	},
	// METHODS //////////////////////////////
	// TODO: move these to webworkers if possible
	compareFrames: function(previousFrame, currentFrame) {
		if(!previousFrame || !currentFrame) { return; }
		// reset vars
		var motionDetected = false,
			motionZoneTopLeftX = Infinity,
			motionZoneTopLeftY = Infinity,
			motionZoneBottomRightX = 0,
			motionZoneBottomRightY = 0;
		// clear & draw
		this.previousFrameCanvasContext.clearRect(0,0, 64, 48);
		this.currentFrameCanvasContext.clearRect(0,0, 64, 48);
		this.previousFrameCanvasContext.drawImage(previousFrame, 0, 0, 64, 48);
		this.currentFrameCanvasContext.drawImage(currentFrame, 0, 0, 64, 48);
		// compare pixels
		for(var y=0, l=48; y<l; y++) {
			for(var x=0, l2=64; x<l2; x++) {
				var pixel1 = this.previousFrameCanvasContext.getImageData(x, y, 1, 1).data,
					pixel2 = this.currentFrameCanvasContext.getImageData(x, y, 1, 1).data;
				if(!this.comparePixels(pixel1, pixel2)) {
					motionDetected = true;
					if(!this.props.debug) { break; }
					// set motion zone corners if in debug mode
					if(x < motionZoneTopLeftX) { motionZoneTopLeftX = x; }
					if(y < motionZoneTopLeftY) { motionZoneTopLeftY = y; }
					if(x > motionZoneBottomRightX) { motionZoneBottomRightX = x; }
					if(y > motionZoneBottomRightY) { motionZoneBottomRightY = y; }
				}
			}
			if(motionDetected && !this.props.debug) { break; }
		}
		// set overall motion zone area to state if in debug mode (this component and its children are the only ones that use this)
		if(this.props.debug) {
			this.setState({motionZone: [
				{
					x: motionZoneTopLeftX * 10,
					y: motionZoneTopLeftY * 10
				},
				{
					x: motionZoneBottomRightX * 10,
					y: motionZoneBottomRightY * 10
				}
			]});
		}
	},
	comparePixels: function(pixel1, pixel2) {
		var matches = true;
		for(var i=0, l=pixel1.length; i<l; i++) {
			var t1 = Math.round(pixel1[i]/10)*10,
				t2 = Math.round(pixel2[i]/10)*10;
			if(t1 !== t2 && (t1 + 40 < t2 || t1 - 40 > t2)) {
				matches = false;
			}
		}
		return matches;
	},
	// RENDERING ////////////////////////////
	render: function() {
		return (
			<div id="motion-container">
				<MotionBox motionzone={this.state.motionZone}/>
				<canvas ref="previousFrameCanvas"></canvas>
				<canvas ref="currentFrameCanvas"></canvas>
			</div>
		);
	},
});