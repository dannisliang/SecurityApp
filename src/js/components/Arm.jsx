import React from 'react';
import Addons from 'react/addons';
import ArmStore from '../stores/ArmStore';
import ArmActions from '../actions/ArmActions';
import {navigate} from 'react-mini-router';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return ArmStore.getAll();
	},
	// LIFECYCLE //////////////////////////
	componentDidMount: function() {
		ArmStore.addChangeListener(this._onChange);
		ArmActions.startCountdown();
	},
	componentWillUnmount: function() {
		this._handleResetCountdown();
		ArmStore.removeChangeListener(this._onChange);
	},
	componentDidUpdate: function(prevProps, prevState) {
		if(this.state.countdown && !prevState.countdown) {
			this._handleStartCountdown();
		} else if(this.state.countdownComplete && !prevState.countdownComplete) {
			this._handleEndCountdown();
		}
	},
	componentWillReceiveProps: function(nextProps) {
		console.log('----');
		console.log(nextProps)
		if(nextProps.path === 'arm') {
			//this.
		}
	},
	componentWillUpdate: function(nextProps) {
		console.log('---->>');
		console.log(nextProps);
	},
	// EVENT HANDLERS ////////////////////////
	_onChange: function() {
		this.setState(ArmStore.getAll());
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
	// USER INPUT EVENTS ////////////////
	_handleCancelClick: function() {
		event.preventDefault();
		setTimeout(function() { navigate('/'); }, 0);
	},
	// RENDERING ////////////////////////
	render: function() {
		return (
			<div id="arm-container" className="fill table">
				<div className="table-cell-valign">
					<i id="arm-icon-ninja-star" className="icon icon-ninja-star"></i>
					<div id="arm-info-container">
						<h1>Arming in {this.state.countdownSeconds} seconds</h1>
						The system will NOT arm if motion is detected when the countdown ends.<br/>Please leave the area.
					</div>
					<button onClick={this._handleCancelClick} className="red">CANCEL</button>
				</div>
			</div>
		);
	},
});