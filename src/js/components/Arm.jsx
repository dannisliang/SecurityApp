import React from 'react';
import Addons from 'react/addons';
import ArmStore from '../stores/ArmStore';
import DropboxStore from '../stores/DropboxStore';
import MotionStore from '../stores/MotionStore';
import ArmActions from '../actions/ArmActions';
import ArmCountdown from './ArmCountdown.jsx';
import Armed from './Armed.jsx';
import {navigate} from 'react-mini-router';
import assign from 'object-assign';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return assign({}, MotionStore.getAll(), ArmStore.getAll(), DropboxStore.getAll());
	},
	// LIFECYCLE //////////////////////////
	componentDidMount: function() {
		MotionStore.addChangeListener(this._onMotionChange);
		ArmStore.addChangeListener(this._onArmChange);
		DropboxStore.addChangeListener(this._onDropboxChange);
		// start countdown if user is already authenticated with dropbox
		if(this.state.dropboxClient) {
			ArmActions.startCountdown();
		}
	},
	componentWillUnmount: function() {
		this._handleResetCountdown();
		MotionStore.removeChangeListener(this._onMotionChange);
		ArmStore.removeChangeListener(this._onArmChange);
		DropboxStore.removeChangeListener(this._onDropboxChange);
	},
	componentDidUpdate: function(prevProps, prevState) {
		if(this.state.dropboxClient && !prevState.dropboxClient) {
			ArmActions.startCountdown();
		}
		if(this.state.countdown && !prevState.countdown) {
			this._handleStartCountdown();
		} else if(this.state.countdownComplete && !prevState.countdownComplete) {
			this._handleEndCountdown();
		}
	},
	// EVENT HANDLERS ////////////////////////
	_onArmChange: function() {
		this.setState(ArmStore.getAll());
	},
	_onMotionChange: function() {
		this.setState(MotionStore.getAll());
	},
	_onDropboxChange: function() {
		this.setState(DropboxStore.getAll());
	},
	_handleStartCountdown: function() {
		var that = this;
		if(this.countdownInterval) { this._handleClearCountdownInterval(); }  // just in case
		this.countdownInterval = setInterval(function(){
			if(that.state.countdownSeconds === 0) {
				ArmActions.endCountdown();
				return;
			}
			ArmActions.countdownTick();
		}, 1000);
	},
	_handleEndCountdown: function() {
		this._handleClearCountdownInterval();
		ArmActions.armed();
	},
	_handleClearCountdownInterval: function() {
		if(this.countdownInterval) {
			clearInterval(this.countdownInterval);
			delete this.countdownInterval;
		}
	},
	_handleResetCountdown: function() {
		this._handleClearCountdownInterval();
		ArmActions.resetCountdown();
	},
	// RENDERING ////////////////////////
	// TODO: fullscreen option
	render: function() {
		let armContentComponent,
			armCountdownParams = {
				countdownSeconds: this.state.countdownSeconds,
				dropboxClient: this.state.dropboxClient
			};
		if(this.state.countdownComplete) {
			armContentComponent = <Armed />;
		} else {
			armContentComponent = <ArmCountdown {...armCountdownParams} />;
		}
		return (
			<div id="arm-container" className="fill table absolute">
				{armContentComponent}
			</div>
		);
	},
});