import React from 'react';
import Addons from 'react/addons';
import Constants from '../Constants';
import MotionStore from '../stores/MotionStore';
import MotionActions from '../actions/MotionActions';
import MotionBox from './MotionBox.jsx';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return MotionStore.getAll();
	},
	// EVENT HANDLERS ////////////////////////
	_onChange: function() {
		this.setState(MotionStore.getAll());
	},
	// LIFECYCLE //////////////////////////
	componentDidMount: function() {
		MotionStore.addChangeListener(this._onChange);
		// by setting the prev/next frame canvases here we avoid finding them during RAF
		this.previousFrameCanvasContext = React.findDOMNode(this.refs.previousFrameCanvas).getContext('2d');
		this.currentFrameCanvasContext  = React.findDOMNode(this.refs.currentFrameCanvas).getContext('2d');
	},
	componentWillReceiveProps: function(nextProps) {
		//console.log('props');
		if(!this.props.raf && nextProps.raf && nextProps.previousFrame && nextProps.currentFrame) {
			this.compareFrames(nextProps.previousFrame, nextProps.currentFrame);
		}
	},
	componentWillUnmount: function() {
		MotionStore.removeChangeListener(this._onChange);
	},
	// METHODS //////////////////////////////
	// TODO: move these to webworkers if possible
	compareFrames: function(previousFrame, currentFrame) {
		if(!previousFrame || !currentFrame) { return; }
		// reset vars
		var captureWidth = this.props.width / this.props.pixelDensity,
			captureHeight = this.props.height / this.props.pixelDensity,
			motionDetected = false,
			motionZoneTopLeftX = Infinity,
			motionZoneTopLeftY = Infinity,
			motionZoneBottomRightX = 0,
			motionZoneBottomRightY = 0;
		// clear & draw
		this.previousFrameCanvasContext.clearRect(0,0, captureWidth, captureHeight);
		this.currentFrameCanvasContext.clearRect(0,0, captureWidth, captureHeight);
		this.previousFrameCanvasContext.drawImage(previousFrame, 0, 0, captureWidth, captureHeight);
		this.currentFrameCanvasContext.drawImage(currentFrame, 0, 0, captureWidth, captureHeight);
		// compare pixels
		for(var y=0, l=captureHeight; y<l; y++) {
			for(var x=0, l2=captureWidth; x<l2; x++) {
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
		// set overall motion zone area to state if in debug mode (displays a box over the video showing where motion is being detected in the frame)
		if(this.props.debug && motionDetected) {
			let motionZoneTop    = motionZoneTopLeftY * this.props.pixelDensity;
			let motionZoneLeft   = motionZoneTopLeftX * this.props.pixelDensity;
			let motionZoneWidth  = (motionZoneBottomRightX * this.props.pixelDensity) - motionZoneLeft;
			let motionZoneHeight = (motionZoneBottomRightY * this.props.pixelDensity) - motionZoneTop;
			MotionActions.motionZone({
				top    : motionZoneTop,
				left   : motionZoneLeft,
				width  : motionZoneWidth,
				height : motionZoneHeight
			});
		}
	},
	comparePixels: function(pixel1, pixel2) {
		var matches = true;
		for(var i=0, l=pixel1.length; i<l; i++) {
			var t1 = Math.round(pixel1[i] / this.props.pixelDensity) * this.props.pixelDensity,
				t2 = Math.round(pixel2[i] / this.props.pixelDensity) * this.props.pixelDensity;
			if(t1 !== t2 && (t1 + this.props.sensitivity < t2 || t1 - this.props.sensitivity > t2)) {
				matches = false;
			}
		}
		return matches;
	},
	// RENDERING ////////////////////////////
	render: function() {
		let motionBoxComponent = this.state.motionZone ? <MotionBox motionZone={this.state.motionZone} /> : null;
		return (
			<div id="motion-container">
				<canvas ref="previousFrameCanvas"></canvas>
				<canvas ref="currentFrameCanvas"></canvas>
				{motionBoxComponent}
			</div>
		);
	},
});