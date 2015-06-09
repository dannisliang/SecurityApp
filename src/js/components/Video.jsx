import React from 'react';
import Constants from '../Constants';
import VideoStore from '../stores/VideoStore';
import VideoActionCreator from '../actions/VideoActionCreator';
import Dispatcher from '../Dispatcher';

export default React.createClass({
	// EVENT HANDLERS ////////////////////////
	_onChange: function() {
		this.setState(VideoStore.getAll());
		if(this.state.src && !this.props.isPlaying) {
			// TODO: maybe there is a better way to handle this type of functionality in react/flux
			this._onPlay();
		} else if(this.state.capture = true) {
			this.capture();
		}
	},
	_onPlay: function() {
		this.props.isPlaying = true;
		React.findDOMNode(this.refs.video).play();
	},

	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return VideoStore.getAll();
	},

	// REGISTER/UNREGISTER ////////////////////////
	componentDidMount: function() {
		VideoStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		VideoStore.removeChangeListener(this._onChange);
	},
	componentWillReceiveProps: function(object) {
		// TODO: move some functionality in here maybe https://facebook.github.io/react/docs/working-with-the-browser.html#updating
	},

	// USER EVENTS /////////////////////////////////
	handleGetVideoSrc: function() {
		VideoActionCreator.addVideoSrc();
	},

	// METHODS /////////////////////////////////////
	capture: function() {
		//if(Dispatcher.isDispatching()){ return; }
		var canvas    = document.createElement('canvas'),
			video     = React.findDOMNode(this.refs.video);
		canvas.width  = this.props.width/10;
		canvas.height = this.props.height/10;
		canvas.getContext('2d').drawImage(video, 0, 0, this.props.width/10, this.props.height/10);
		// timeout here to bypass circular actions blocker in reactjs
		// TODO: see if better workaround for this
		setTimeout(function() {
			if(Dispatcher.isDispatching()){ return; }
			VideoActionCreator.addFrame(canvas);
		}, 0);
	},

	// RENDERING ////////////////////////
	render: function() {
		return (
			<div id="video-container">
				<video ref="video" width={this.props.width} height={this.props.height} muted src={this.state.src}></video>
			</div>
		);
	},
});