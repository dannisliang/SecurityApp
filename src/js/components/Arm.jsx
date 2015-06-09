import React from 'react';
import Video from './Video.jsx';
import Motion from './Motion.jsx';
import MotionStore from '../stores/MotionStore';
import VideoActionCreator from '../actions/VideoActionCreator';

export default React.createClass({
	// EVENT HANDLERS ////////////////////////
	_onChange: function() {
		this.setState(MotionStore.getAll());
	},
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return MotionStore.getAll();
	},
	// LIFECYCLE ////////////////////////////
	componentDidMount: function() {
		MotionStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		MotionStore.removeChangeListener(this._onChange);
	},
	// USER INPUT EVENTS ////////////////////
	handleGetVideoSrc: function() {
		VideoActionCreator.addVideoSrc();
	},
	// RENDERING ////////////////////////////
	render: function() {
		var motionComponent = this.state.startMotionDetection ? <Motion /> : null; // video component needs to init before motion component
		return (
			<div id="arm-container">
				<div id="buttons-container"><button onClick={this.handleGetVideoSrc}>Get Webcam Feed</button></div>
				<div id="video-and-motion-container">
					<Video width={640} height={480} isPlaying={false} />
					{motionComponent}
				</div>
			</div>
		);
	}
});
