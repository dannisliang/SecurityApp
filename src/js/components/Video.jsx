import React from 'react';
import Addons from 'react/addons';
import Constants from '../Constants';
import MotionStore from '../stores/MotionStore';
import SettingsStore from '../stores/SettingsStore';
import ArmStore from '../stores/ArmStore';
import MotionActions from '../actions/MotionActions';
import ImageActions from '../actions/ImageActions';
import GrantWebcamAccess from './GrantWebcamAccess.jsx';
import assign from 'object-assign';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return assign({}, MotionStore.getAll(), SettingsStore.getAll(), ArmStore.getAll());
	},
	// LIFECYCLE ////////////////////////////
	componentDidMount: function() {
		MotionStore.addChangeListener(this._onMotionChange);
		SettingsStore.addChangeListener(this._onSettingsChange);
		ArmStore.addChangeListener(this._onArmChange);
		window.addEventListener('resize', this._onResize);
		MotionStore.addRAFListener(this._onRAF);
		this._onResize();
	},
	componentWillUnmount: function() {
		MotionStore.removeChangeListener(this._onMotionChange);
		SettingsStore.removeChangeListener(this._onSettingsChange);
		ArmStore.removeChangeListener(this._onArmChange);
		window.removeEventListener('resize', this._onResize);
		MotionStore.removeRAFListener(this._onRAF);
	},
	componentDidUpdate: function(prevProps, prevState) {
		var that = this;
		if(!prevState.src && this.state.src) {
			setTimeout(this._handlePlay, 0);
		}
		if(!this.captureBreachDelay && this.state.armed && this.state.motionDetected) {
			// motion was detected when system was armed - need to take a full size cap of video
			this._captureFrame(true);
			this.captureBreachDelay = setTimeout(function() {
				delete that.captureBreachDelay;
			}, 500);
		}
	},
	// EVENT HANDLERS ////////////////////////
	_onMotionChange: function() {
		this.setState(MotionStore.getAll());
	},
	_onSettingsChange: function() {
		this.setState(SettingsStore.getAll());
	},
	_onArmChange: function() {
		this.setState(ArmStore.getAll());
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
		this._captureFrame();
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
	_captureFrame: function(isSecurityBreachPhoto) {
		var canvas        = document.createElement('canvas'),
			video         = React.findDOMNode(this.refs.video),
			captureWidth  = isSecurityBreachPhoto ? this.state.videoWidth : this.state.videoWidth / this.state.motionZoneDensity,
			captureHeight = isSecurityBreachPhoto ? this.state.videoHeight : this.state.videoHeight / this.state.motionZoneDensity;
		canvas.width  = captureWidth;
		canvas.height = captureHeight;
		canvas.getContext('2d').drawImage(video, 0, 0, captureWidth, captureHeight);
		if(!isSecurityBreachPhoto) {
			MotionActions.captureFrame(canvas); // now that we have the frame, we need to send it to an action so other components like motion can see it
		} else {
			ImageActions.captureBreach(canvas);
		}
	},
	// USER INPUT EVENTS ////////////////////
	_handleGetVideoSrc: function() {
		MotionActions.addVideoSrc();
	},
	// RENDERING ////////////////////////
	render: function() {
		let canvasStyle = {
			position: 'absolute',
			bottom: 0
		};
		let grantWebcamAccess = this.state.src ? null : <GrantWebcamAccess />;
		return (
			<div id="video-container" className="absolute fill">
				{grantWebcamAccess}
				<video ref="video" className="video-cover" muted src={this.state.src}></video>
			</div>
		);
	},
});