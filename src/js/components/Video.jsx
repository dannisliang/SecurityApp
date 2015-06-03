import React from 'react';
import Constants from '../Constants';
import VideoStore from '../stores/VideoStore';
import VideoActionCreator from '../actions/VideoActionCreators';

export default React.createClass({
	// CHANGE EVENT ////////////////////////
	_onChange: function() {
		this.setState(VideoStore.getAll());
	},
	_onPlay: function() {
		React.findDOMNode(this.refs.video).play();
	},

	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return VideoStore.getAll();
	},

	// REGISTER/UNREGISTER ////////////////////////
	componentDidMount: function() {
		VideoStore.addChangeListener(this._onChange);
		VideoStore.on(Constants.VIDEO_PLAY_EVENT, this._onPlay);
	},
	componentWillUnmount: function() {
		VideoStore.removeChangeListener(this._onChange);
		VideoStore.removeListener(Constants.VIDEO_PLAY_EVENT, this._onPlay);
	},

	// USER INPUT EVENTS ////////////////////////
	handleGetVideoSrc: function() {
		VideoActionCreator.addVideoSrc();
	},

	// RENDERING ////////////////////////
	render: function() {
		return (
			<div id="video-container">
				<div id="buttons-container"><button onClick={this.handleGetVideoSrc}>Get Webcam Feed</button></div>
				<video ref="video" width={this.props.width} height={this.props.height} muted src={this.state.src}></video>
			</div>
		);
	},
});