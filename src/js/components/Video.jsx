import React from 'react';
import Addons from 'react/addons';
import Constants from '../Constants';
import MotionStore from '../stores/MotionStore';
import MotionActions from '../actions/MotionActions';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// LIFECYCLE ////////////////////////////
	componentDidMount: function() {
		this._onResize();
		window.addEventListener('resize', this._onResize);
		MotionStore.addRAFListener(this._onRAF);
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this._onResize);
		MotionStore.removeRAFListener(this._onRAF);
	},
	componentWillReceiveProps: function(nextProps) {
		if(nextProps.src && !this.props.src) {
			setTimeout(this._handlePlay, 0);  // delay here to allow src to be set on element before trying to play it
		}
	},
	// EVENTS ////////////////////////////////
	_onResize: function() {
		let videoNode = React.findDOMNode(this.refs.video);
		MotionActions.videoResize([
			videoNode.clientWidth,
			videoNode.clientHeight
		]);
	},
	_onRAF: function() {
		this.captureFrame();
	},
	// METHODS ///////////////////////////////
	_handlePlay: function() {
		let that = this,
			videoNode = React.findDOMNode(this.refs.video);
		// play webcam feed
		videoNode.play();
		// poll to check when video is actually playing so we can update video width/height with real values
		let videoReadyInterval = window.setInterval(function() {
			if(videoNode.readyState === 4) {
				if(that.isMounted()) {
					that._onResize();
					MotionActions.play();
				}
				window.clearInterval(videoReadyInterval);
			}
		}, 100);
	},
	captureFrame: function() {
		var canvas        = document.createElement('canvas'),
			video         = React.findDOMNode(this.refs.video),
			captureWidth  = this.props.videoWidth / this.props.motionZoneDensity,
			captureHeight = this.props.videoHeight / this.props.motionZoneDensity;
		canvas.width  = captureWidth;
		canvas.height = captureHeight;
		canvas.getContext('2d').drawImage(video, 0, 0, captureWidth, captureHeight);
		MotionActions.captureFrame(canvas); // now that we have the frame, we need to send it to an action so other components like motion can see it
	},
	// RENDERING ////////////////////////
	render: function() {
		let canvasStyle = {
			position: 'absolute',
			bottom: 0
		};
		return (
			<div id="video-container" className="absolute fill">
				<video ref="video" className="video-cover" muted src={this.props.src}></video>
			</div>
		);
	},
});