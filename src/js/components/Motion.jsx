import React from 'react';
import Constants from '../Constants';
import WebcamMotionStore from '../stores/WebcamMotionStore';
import WebcamMotionActionCreator from '../actions/WebcamMotionActionCreator';
import Dispatcher from '../Dispatcher';
import MotionBox from './MotionBox.jsx';

export default React.createClass({
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
	compareFrames: function(previousFrame, currentFrame) {
		console.log('compare');
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
					/*if(x < motionZoneTopLeftX) {
						motionZoneTopLeftX = x;
						this.setState({
							motionZoneTopLeftX: motionZoneTopLeftX
						});
					}
					if(y < motionZoneTopLeftY) {
						motionZoneTopLeftY = y;
						this.setState({
							motionZoneTopLeftY: motionZoneTopLeftY
						});
					}
					if(x > motionZoneBottomRightX) {
						motionZoneBottomRightX = x;
						this.setState({
							motionZoneBottomRightX: motionZoneBottomRightX
						});
					}
					if(y > motionZoneBottomRightY) {
						motionZoneBottomRightY = y;
						this.setState({
							motionZoneBottomRightY: motionZoneBottomRightY
						});
					}*/
				}
			}
			if(motionDetected && !this.props.debug) { break; }
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
				<MotionBox />
				<canvas ref="previousFrameCanvas"></canvas>
				<canvas ref="currentFrameCanvas"></canvas>
			</div>
		);
	},
});