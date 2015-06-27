import React from 'react';
import Addons from 'react/addons';
import MotionStore from '../stores/MotionStore';
import ArmStore from '../stores/ArmStore';
import ImageStore from '../stores/ImageStore';
import MotionActions from '../actions/MotionActions';
import ArmActions from '../actions/ArmActions';
import assign from 'object-assign';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return assign({}, MotionStore.getAll(), ArmStore.getAll(), ImageStore.getAll());
	},
	// LIFECYCLE ////////////////////////////
	componentDidMount: function() {
		MotionStore.addChangeListener(this._onMotionChange);
		ArmStore.addChangeListener(this._onArmChange);
		ImageStore.addChangeListener(this._onImageChange);
	},
	componentWillUnmount: function() {
		MotionStore.removeChangeListener(this._onMotionChange);
		ArmStore.removeChangeListener(this._onArmChange);
		ImageStore.removeChangeListener(this._onImageChange);
	},
	// EVENT HANDLERS ////////////////////////
	_onMotionChange: function() {
		this.setState(MotionStore.getAll());
	},
	_onArmChange: function() {
		this.setState(ArmStore.getAll());
	},
	_onImageChange: function() {
		this.setState(ImageStore.getAll());
	},
	_handleToggleEffectsClick: function() {
		MotionActions.debugToggleEffects();
	},
	_handleSkipCountdownClick: function() {
		ArmActions.endCountdown();
	},
	// RENDERING ////////////////////////
	_getSkipCountdownComponent: function() {
		if(this.state.countdown) {
			return <li><button onClick={this._handleSkipCountdownClick}>SKIP COUNTDOWN</button></li>
		} else {
			return null;
		}
	},
	_renderBreachImage: function() {
		var canvas = React.findDOMNode(this.refs.breachImage),
			context = canvas.getContext('2d');
		canvas.width = 320;
		canvas.height = 240;
		context.drawImage(this.state.breachCanvas, 0, 0, canvas.width, canvas.height);
	},
	render: function() {
		if(this.state.breachCanvas) {
			this._renderBreachImage();
		}
		return (
			<div id="debug">
				<h1>Debug Console</h1>
				<ul>
					<li>Webcam Feed: <strong>{this.state.src ? 'YES' : 'NO'}</strong></li>
					<li>Armed: <strong>{this.state.armed ? 'YES' : 'NO'}</strong></li>
					<li>Motion Detected: <strong>{this.state.motionDetected ? 'YES' : 'NO'}</strong></li>
					<li>Motion Zones Active: <strong>{this.state.motionZones.length}</strong></li>
					<li>Toggle Effects: <button onClick={this._handleToggleEffectsClick}>{this.state.effects ? 'ON' : 'OFF'}</button></li>
					{this._getSkipCountdownComponent()}
				</ul>
				<h2>Current Breach Image:</h2>
				<canvas ref="breachImage"></canvas>
			</div>
		);
	},
});