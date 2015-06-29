import React from 'react';
import Addons from 'react/addons';
import SettingsActions from '../actions/SettingsActions';
import SettingsStore from '../stores/SettingsStore';
import Dispatcher from '../Dispatcher';
import {navigate} from 'react-mini-router';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	// MIXINS /////////////////////////////
	mixins: [PureRenderMixin],
	getDefaultProps: function() {
		return {
			minSensitivity: 25,
			maxSensitivity: 195
		};
	},
	// INITIAL STATE //////////////////////
	getInitialState: function() {
		return SettingsStore.getAll();
	},
	// EVENTS /////////////////////////////
	_onChange: function() {
		this.setState(SettingsStore.getAll());
	},
	// LIFECYCLE //////////////////////////
	componentDidMount: function() {
		SettingsStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		SettingsStore.removeChangeListener(this._onChange);
	},
	// USER INPUT EVENTS //////////////////
	_handleChangeSensitivity: function(event) {
		// this converts 0-100% to the actual sensitivity value
		let sensitivity = (((100 - event.target.value) * (this.props.maxSensitivity - this.props.minSensitivity)) / 100) + this.props.minSensitivity;
		SettingsActions.setSensitivity(sensitivity);
	},
	_handleChangeSustained: function(event) {
		SettingsActions.setSustained(event.target.value);
	},
	_handleChangeFPS: function(event) {
		SettingsActions.setFPS(event.target.value);
	},
	_handleChangePixelDensity: function(event) {
		SettingsActions.setMotionZoneDensity(event.target.value);
	},
	_handleChangeActiveZonesNeeded: function(event) {
		SettingsActions.setActiveZonesNeeded(event.target.value);
	},
	_handleClose: function(event) {
		event.preventDefault();
		setTimeout(function() { navigate('/'); }, 0);
	},
	// RENDERING ////////////////////////
	render: function() {
		// this takes the actual sensitivity val and converts it to 0-100% to be more clear to user
		// TODO: all sliders should follow this principal
		let sensitivityPercent = Math.round(100 - (((this.state.sensitivity - this.props.minSensitivity) * 100) / (this.props.maxSensitivity - this.props.minSensitivity)));
		let motionDetected = this.props.motionDetected ? 'Motion detected' : 'All clear';
		return (
			<div id="settings-container" className="absolute">
				<div id="settings-header">
					<h1>Settings</h1>
					<a onClick={this._handleClose} href="#" title="Close this settings panel" className="close-button">
						<span className="close-button-inner"></span>
					</a>
					<span>
						Mugshot Ninja is fully adjustable to suit your needs. Make sure the room is well lit for the best results. If you’re confused about what a setting is, just move your cursor over it.
					</span>
				</div>
				<div id="settings-container">
					<form>
						<fieldset>
							<label>Motion Sensitivity</label>
							<input type="range" min="0" max="100" defaultValue={sensitivityPercent} onChange={this._handleChangeSensitivity} />
						</fieldset>
						<fieldset>
							<label>Motion Grid Size</label>
							<input type="range" min="10" max="100" defaultValue={this.state.motionZoneDensity} onChange={this._handleChangePixelDensity} />
						</fieldset>
						<fieldset>
							<label>Frame Capture Speed</label>
							<input type="range" min="1" max="60" defaultValue={this.state.fps} onChange={this._handleChangeFPS} />
						</fieldset>
						<fieldset>
							<label>Active Zones Needed</label>
							<input type="range" min="1" max="100" defaultValue={this.state.activeZonesNeeded} onChange={this._handleChangeActiveZonesNeeded} />
						</fieldset>
					</form>
				</div>
			</div>
		);
	},
});