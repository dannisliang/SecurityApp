import React from 'react';
import Addons from 'react/addons';
import Constants from '../Constants';
import MotionStore from '../stores/MotionStore';
import MotionActions from '../actions/MotionActions';
import MotionOverlay from './MotionOverlay.jsx';
import MotionZonesGrid from './MotionZonesGrid.jsx';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return MotionStore.getAll();
	},
	// LIFECYCLE //////////////////////////
	componentDidMount: function() {
		MotionStore.addChangeListener(this._onChange);
		MotionStore.addRAFListener(this._onRAF);
		this.previousFrameCanvas = React.findDOMNode(this.refs.previousFrameCanvas);
		this.currentFrameCanvas = React.findDOMNode(this.refs.currentFrameCanvas);
	},
	componentWillUnmount: function() {
		MotionStore.removeChangeListener(this._onChange);
		MotionStore.removeRAFListener(this._onRAF);
	},
	// EVENT HANDLERS ////////////////////////
	_onChange: function() {
		this.setState(MotionStore.getAll());
	},
	_onRAF: function() {
		if(this.props.previousFrame && this.props.currentFrame) {
			this.compareFrames(this.props.previousFrame, this.props.currentFrame);
		}
	},
	// METHODS //////////////////////////////
	// TODO: move these to webworkers if possible
	compareFrames: function(previousFrame, currentFrame) {
		if(!previousFrame || !currentFrame) { return; }
		// reset vars
		let motionZones = [],
			captureWidth = this.props.videoWidth / this.props.motionZoneDensity,
			captureHeight = this.props.videoHeight / this.props.motionZoneDensity,
			previousFrameCanvasContext = this.previousFrameCanvas.getContext('2d'),
			currentFrameCanvasContext = this.currentFrameCanvas.getContext('2d');
		// set proper w/h for canvas before clearing/drawing
		this.previousFrameCanvas.width  = captureWidth;
		this.previousFrameCanvas.height = captureHeight;
		this.currentFrameCanvas.width   = captureWidth;
		this.currentFrameCanvas.height  = captureHeight;
		// clear previous canvas
		previousFrameCanvasContext.clearRect(0, 0, 9999, 9999);
		currentFrameCanvasContext.clearRect(0, 0, 9999, 9999);
		previousFrameCanvasContext.drawImage(previousFrame, 0, 0, previousFrame.width, previousFrame.height);
		currentFrameCanvasContext.drawImage(currentFrame, 0, 0, currentFrame.width, currentFrame.height);
		// compare pixels in frame canvases
		for(var y=0, l=captureHeight; y<l; y++) {
			for(var x=0, l2=captureWidth; x<l2; x++) {
				var pixel1 = previousFrameCanvasContext.getImageData(x, y, 1, 1).data,
					pixel2 = currentFrameCanvasContext.getImageData(x, y, 1, 1).data;
				if(!this.comparePixels(pixel1, pixel2)) {
					motionZones.push({x: x, y:y});
				}
			}
		}
		if(motionZones.length) {
			MotionActions.setMotionZones(motionZones);
			if(motionZones.length >= this.props.activeZonesNeeded) {
				MotionActions.setMotionDetected(true);
			} else {
				MotionActions.setMotionDetected(false);
			}
		} else {
			MotionActions.setMotionZones([]);
			MotionActions.setMotionDetected(false);
		}
	},
	comparePixels: function(pixel1, pixel2) {
		var matches = true;
		for(var i=0, l=pixel1.length; i<l; i++) {
			var t1 = Math.round(pixel1[i] / this.props.motionZoneDensity) * this.props.motionZoneDensity,
				t2 = Math.round(pixel2[i] / this.props.motionZoneDensity) * this.props.motionZoneDensity;
			if(t1 !== t2 && (t1 + this.props.sensitivity < t2 || t1 - this.props.sensitivity > t2)) {
				matches = false;
			}
		}
		return matches;
	},
	// RENDERING ////////////////////////////
	render: function() {
		let motionZoneDensityProps = {
			videoWidth   : this.state.videoWidth,
			videoHeight  : this.state.videoHeight,
			motionZones  : this.state.motionZones,
			motionZoneDensity : this.props.motionZoneDensity,
			armed: this.state.armed
		};
		let motionOverlayComponent   = this.state.effects ? <MotionOverlay motionDetected={this.state.motionDetected} /> : null;
		let motionZonesGridComponent = this.state.effects ? <MotionZonesGrid {...motionZoneDensityProps} /> : null;
		return (
			<div id="motion-container" className="fill absolute">
				<div id="motion-canvas-frames-container">
					<canvas ref="previousFrameCanvas" className="absolute"></canvas>
					<canvas ref="currentFrameCanvas" className="absolute"></canvas>
				</div>
				{motionOverlayComponent}
				{motionZonesGridComponent}
			</div>
		);
	},
});