import React from 'react';
import Video from './Video.jsx';
import Motion from './Motion.jsx';
import WebcamMotionStore from '../stores/WebcamMotionStore';
import WebcamMotionActionCreator from '../actions/WebcamMotionActionCreator';

export default React.createClass({
	//mixins: [PureRenderMixin], NOTE: we can't use pure render mixin here because child components need to do things on raf
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return WebcamMotionStore.getAll();
	},
	// EVENT HANDLERS ////////////////////////
	_onChange: function() {
		this.setState(WebcamMotionStore.getAll());
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
			this.startRAF();  // now that video src is set and playing we should start the RAF loop so motion detection can use it
		}
	},
	// USER INPUT EVENTS ////////////////////
	handleGetVideoSrc: function() {
		WebcamMotionActionCreator.addVideoSrc();
	},
	// METHODS //////////////////////////////
	startRAF: function() {
		var that = this,
			raf = (function(){
				// TODO: move this to mixin or core
				return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60); };
			})(),
			renderRAF = function() {
				if(!that.isMounted()) { return; }   // stop this loop when user leaves this component
				WebcamMotionActionCreator.onRAF();  // dispatch raf event for stores to listen for
				raf(renderRAF);                     // loop this function on raf
			};
		renderRAF();
	},
	// RENDERING ////////////////////////////
	render: function() {
		var motionComponent = this.state.src ? <Motion /> : null; // video component needs to init before motion component
		return (
			<div id="arm-container">
				<div id="buttons-container"><button onClick={this.handleGetVideoSrc}>Get Webcam Feed</button></div>
				<div id="video-and-motion-container">
					<Video width={640} height={480} src={this.state.src} raf={this.state.raf} />
					{motionComponent}
				</div>
			</div>
		);
	}
});
