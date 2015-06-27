import React from 'react';
import Video from './Video.jsx';
import Motion from './Motion.jsx';
import Settings from './Settings.jsx';
import MotionStore from '../stores/MotionStore';
import SettingsStore from '../stores/SettingsStore';
import MotionActions from '../actions/MotionActions';
import WindowActions from '../actions/WindowActions';
import assign from 'object-assign';

export default React.createClass({
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return assign({}, MotionStore.getAll(), SettingsStore.getAll());
	},
	// LIFECYCLE ////////////////////////////
	componentDidMount: function() {
		MotionStore.addChangeListener(this._onMotionChange);
		SettingsStore.addChangeListener(this._onSettingsChange);
		window.addEventListener('resize', this._onResize);
	},
	componentWillUnmount: function() {
		MotionStore.removeChangeListener(this._onMotionChange);
		SettingsStore.removeChangeListener(this._onSettingsChange);
		window.removeEventListener('resize', this._onResize);
	},
	componentDidUpdate: function(prevProps, prevState) {
		if(this.state.playing && !prevState.playing) {
			this._handleStartRAF();  // now that video src is set and playing we should start the RAF loop so motion detection can use it
		}
	},
	// EVENT HANDLERS ////////////////////////
	_onMotionChange: function() {
		this.setState(MotionStore.getAll());
	},
	_onSettingsChange: function() {
		this.setState(SettingsStore.getAll());
	},
	_onResize: function() {
		WindowActions.resize();
	},
	// METHODS //////////////////////////////
	_handleStartRAF: function() {
		var that = this,
			raf = (function(){
				// TODO: move this to mixin or core
				return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60); };
			})(),
			renderRAF = function() {
				if(!that.isMounted()) { return; }   // stop this loop when user leaves this component
				raf(renderRAF);                     // loop this function on raf
				// check time elapsed since last RAF
				let now     = Date.now();
				let elapsed = now - (that.then || 0);
				// throttle RAF to FPS
				if(elapsed > that.state.fpsInterval) {
					that.then = now - (elapsed % that.state.fpsInterval);
					MotionActions.onRAF();
				}
			};
		renderRAF();
	},
	// RENDERING ////////////////////////////
	render: function() {
		let motionProps = {
			videoWidth        : this.state.videoWidth,
			videoHeight       : this.state.videoHeight,
			debug             : this.state.debug,
			sensitivity       : this.state.sensitivity,
			currentFrame      : this.state.currentFrame,
			previousFrame     : this.state.previousFrame,
			motionZoneDensity : this.state.motionZoneDensity,
			activeZonesNeeded : this.state.activeZonesNeeded
		};
		let motionComponent = this.state.src ? <Motion {...motionProps} /> : null;
		return (
			<div id="video-and-motion-container" className="fill absolute">
				<Video />
				{motionComponent}
			</div>
		);
	}
});
