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
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this._onResize);
	},
	componentWillReceiveProps: function(nextProps) {
		if(nextProps.src && !this.props.src) {
			setTimeout(this.play, 0); // timeout here to allow src to be set on the video element before we try to play it
		}
		if(nextProps.raf && !this.props.raf) {
			this.captureFrame();
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
	// METHODS ///////////////////////////////
	play: function() {
		React.findDOMNode(this.refs.video).play();
	},
	captureFrame: function() {
		var canvas        = document.createElement('canvas'),
			video         = React.findDOMNode(this.refs.video),
			captureWidth  = this.props.videoWidth / this.props.pixelDensity,
			captureHeight = this.props.videoHeight / this.props.pixelDensity;
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
		}
		return (
			<div id="video-container" className="fill absolute">
				<video ref="video" className="video-cover" muted src={this.props.src}></video>
			</div>
		);
	},
});