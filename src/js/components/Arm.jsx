import React from 'react';
import Video from './Video.jsx';
import Motion from './Motion.jsx';
import WebcamMotionStore from '../stores/WebcamMotionStore';
import WebcamMotionActionCreator from '../actions/WebcamMotionActionCreator';

export default React.createClass({
	// EVENT HANDLERS ////////////////////////
	_onChange: function() {
		this.setState(WebcamMotionStore.getAll());
	},
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return {};
	},
	// LIFECYCLE ////////////////////////////
	componentDidMount: function() {
		WebcamMotionStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		WebcamMotionStore.removeChangeListener(this._onChange);
	},
	componentDidUpdate: function(prevProps, prevState) {
		if(this.state.src && !prevState.src) {
			WebcamMotionActionCreator.onRAF(); // video has just started playing, we should get motion detection going as well. For this we use request animation frame in action creator.
		}
	},
	// USER INPUT EVENTS ////////////////////
	handleGetVideoSrc: function() {
		WebcamMotionActionCreator.addVideoSrc();
	},
	// RENDERING ////////////////////////////
	render: function() {
		var motionComponent = this.state.src ? <Motion /> : null; // video component needs to init before motion component
		return (
			<div id="arm-container">
				<div id="buttons-container"><button onClick={this.handleGetVideoSrc}>Get Webcam Feed</button></div>
				<div id="video-and-motion-container">
					<Video width={640} height={480} src={this.state.src} />
					{motionComponent}
				</div>
			</div>
		);
	}
});
