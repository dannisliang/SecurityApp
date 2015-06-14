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
		this.captureWidth  = this.props.width / this.props.pixelDensity;
		this.captureHeight = this.props.height / this.props.pixelDensity;
	},
	componentWillReceiveProps: function(nextProps) {
		if(nextProps.src && !this.props.src) {
			setTimeout(this.play, 0); // timeout here to allow src to be set on the video element before we try to play it
		}
		//console.log(nextProps.raf, !this.props.raf);
		if(nextProps.raf && !this.props.raf) {
			this.captureFrame();
		}
	},
	// METHODS ///////////////////////////////
	play: function() {
		React.findDOMNode(this.refs.video).play();
	},
	captureFrame: function() {
		var canvas    = document.createElement('canvas'),
			video     = React.findDOMNode(this.refs.video);
		canvas.width  = this.captureWidth;
		canvas.height = this.captureHeight;
		canvas.getContext('2d').drawImage(video, 0, 0, this.captureWidth, this.captureHeight);
		MotionActions.captureFrame(canvas); // now that we have the frame, we need to send it to an action so other components like motion can see it
	},
	// RENDERING ////////////////////////
	render: function() {
		return (
			<div id="video-container">
				<video ref="video" width={this.props.width} height={this.props.height} muted src={this.props.src}></video>
			</div>
		);
	},
});