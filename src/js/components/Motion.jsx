import React from 'react';
import Constants from '../Constants';
import MotionStore from '../stores/MotionStore';
import MotionActionCreator from '../actions/MotionActionCreator';

export default React.createClass({
	getDefaultProps: function() {
		return {
			isPlaying: false
		};
	},
	// EVENT HANDLERS ////////////////////////
	_onChange: function() {
		this.setState(MotionStore.getAll());
		if(this.state.src && !this.props.isPlaying) {
			// TODO: maybe there is a better way to handle this type of functionality in react/flux
			this._onPlay();
		}
	},
	_onPlay: function() {
		this.props.isPlaying = true;
		React.findDOMNode(this.refs.video).play();
	},

	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return MotionStore.getAll();
	},

	// REGISTER/UNREGISTER ////////////////////////
	componentDidMount: function() {
		MotionStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		MotionStore.removeChangeListener(this._onChange);
	},
	componentWillReceiveProps: function(object) {
		// TODO: move some functionality in here https://facebook.github.io/react/docs/working-with-the-browser.html#updating
	},

	// METHODS //////////////////////////////
	onRAF: function() {
		var that = this,
			raf = (function(){
				return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60); };
			})(),
			renderRAF = function() {
				if(!that.isMounted()) { return; }
				MotionActionCreator.capture();
				/*if(that.currentFrame) { that.previousFrame = that.currentFrame; }
				that.currentFrame = that.refs.VideoComponent.capture();
				if(that.previousFrame && that.currentFrame) {
					that.compareFrames(that.previousFrame, that.currentFrame);
				}*/
				raf(renderRAF);
			};
		renderRAF();
	},

	// RENDERING ////////////////////////
	render: function() {
		return (
			<div id="motion-container">
				<div id="buttons-container"><button onClick={this.props.handleGetVideoSrc}>Get Webcam Feed</button></div>
				<video ref="video" width={this.props.width} height={this.props.height} muted src={this.state.src}></video>
				<div id="motion-debug"></div>
			</div>
		);
	},
});