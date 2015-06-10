import React from 'react';
import Constants from '../Constants';
import WebcamMotionStore from '../stores/WebcamMotionStore';
import WebcamMotionActionCreator from '../actions/WebcamMotionActionCreator';
import Dispatcher from '../Dispatcher';

export default React.createClass({
	// LOCAL VARS ////////////////////////////
	isPlaying: false,
	// EVENT HANDLERS ////////////////////////
	_onChange: function() {
		this.setState(WebcamMotionStore.getAll());
		/*if(this.state.capture = true) {
			this.capture();
		}*/
	},
	_onPlay: function() {
		if(this.isPlaying) { return; }
		this.isPlaying = true;
		React.findDOMNode(this.refs.video).play();
	},

	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return WebcamMotionStore.getAll();
	},

	// REGISTER/UNREGISTER ////////////////////////
	componentDidMount: function() {
		WebcamMotionStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		WebcamMotionStore.removeChangeListener(this._onChange);
	},
	componentDidUpdate: function() {
		// TODO: move some functionality in here maybe https://facebook.github.io/react/docs/working-with-the-browser.html#updating
		if(this.props.src) {
			this._onPlay();
		}
	},

	// METHODS /////////////////////////////////////
	capture: function() {
		var canvas    = document.createElement('canvas'),
			video     = React.findDOMNode(this.refs.video);
		canvas.width  = this.props.width/10;
		canvas.height = this.props.height/10;
		canvas.getContext('2d').drawImage(video, 0, 0, this.props.width/10, this.props.height/10);
		// timeout here to bypass circular actions blocker in reactjs
		// TODO: see if better workaround for this
		setTimeout(function() {
			if(Dispatcher.isDispatching()){ return; }
			WebcamMotionActionCreator.addFrame(canvas);
		}, 0);
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