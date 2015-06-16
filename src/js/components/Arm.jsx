import React from 'react';
import Video from './Video.jsx';
import Motion from './Motion.jsx';
import PixelDensityGrid from './PixelDensityGrid.jsx';
import MotionSettings from './MotionSettings.jsx';
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
		MotionStore.addChangeListener(this._onChange);
		SettingsStore.addChangeListener(this._onChange);
		window.addEventListener('resize', this._onResize);
	},
	componentWillUnmount: function() {
		MotionStore.removeChangeListener(this._onChange);
		SettingsStore.removeChangeListener(this._onChange);
		window.removeEventListener('resize', this._onResize);
	},
	componentDidUpdate: function(prevProps, prevState) {
		if(this.state.src && !prevState.src) {
			this._handleStartRAF();  // now that video src is set and playing we should start the RAF loop so motion detection can use it
		}
	},
	// EVENT HANDLERS ////////////////////////
	_onChange: function() {
		// if setState is called in the same tick, react is smart enough to merge them
		this.setState(MotionStore.getAll());
		this.setState(SettingsStore.getAll());
	},
	_onResize: function() {
		WindowActions.resize();
	},
	// USER INPUT EVENTS ////////////////////
	_handleGetVideoSrc: function() {
		MotionActions.addVideoSrc();
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
					MotionActions.onRAF(true);  // dispatch raf event for stores to listen for
				} else {
					MotionActions.onRAF(false);
				}
			};
		renderRAF();
	},
	// RENDERING ////////////////////////////
	render: function() {
		let motionProps = {
			videoWidth    : this.state.videoWidth,
			videoHeight   : this.state.videoHeight,
			raf           : this.state.raf,
			debug         : this.state.debug,
			sensitivity   : this.state.sensitivity,
			currentFrame  : this.state.currentFrame,
			previousFrame : this.state.previousFrame,
			pixelDensity  : this.state.pixelDensity
		};
		let videoProps = {
			videoWidth   : this.state.videoWidth,
			videoHeight  : this.state.videoHeight,
			src          : this.state.src,
			raf          : this.state.raf,
			pixelDensity : this.state.pixelDensity
		};
		let pixelDensityProps = {
			width        : this.state.width,
			height       : this.state.height,
			pixelDensity : this.state.pixelDensity
		};
		let motionComponent   = this.state.src ? <Motion {...motionProps} /> : null;
		let settingsComponent = this.state.src ? <MotionSettings motionDetected={this.state.motionDetected} /> : null;
		return (
			<div id="arm-container" className="fill">
				<div id="buttons-container" className="absolute"><button onClick={this._handleGetVideoSrc}>Get Webcam Feed</button></div>
				<div id="video-and-motion-container" className="fill absolute">
					<Video {...videoProps} />
					<PixelDensityGrid {...pixelDensityProps} />
					{motionComponent}
				</div>
				{settingsComponent}
			</div>
		);
	}
});
