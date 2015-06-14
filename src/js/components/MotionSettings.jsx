import React from 'react';
import Addons from 'react/addons';
import SettingsActions from '../actions/SettingsActions';
import SettingsStore from '../stores/SettingsStore';
import Dispatcher from '../Dispatcher';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	// MIXINS /////////////////////////////
	mixins: [PureRenderMixin],
	getDefaultProps: function() {
		return {
			minSensitivity: 25,
			maxSensitivity: 110
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
	handleToggleDebug: function() {
		SettingsActions.toggleDebug();
	},
	handleChangeSensitivity: function(event) {
		// this converts 0-100% to the actual sensitivity value
		let sensitivity = (((100 - event.target.value) * (this.props.maxSensitivity - this.props.minSensitivity)) / 100) + this.props.minSensitivity;
		SettingsActions.setSensitivity(sensitivity);
	},
	handleChangeSustained: function(event) {
		SettingsActions.setSustained(event.target.value);
	},
	handleChangeFPS: function(event) {
		SettingsActions.setFPS(event.target.value);
	},
	handleChangePixelDensity: function(event) {
		SettingsActions.setPixelDensity(event.target.value);
	},
	// RENDERING ////////////////////////
	render: function() {
		// this takes the actual sensitivity val and converts it to 0-100% to be more clear to user
		let sensitivityPercent = Math.round(100 - (((this.state.sensitivity - this.props.minSensitivity) * 100) / (this.props.maxSensitivity - this.props.minSensitivity)));
		let motionDetected = this.props.motionDetected ? 'Motion detected' : 'All clear';
		return (
			<div id="settings-container">
				<div>
					<button onClick={this.handleToggleDebug}>Toggle Debug</button>
				</div><div>
					<label>Sensitivity</label>
					<input type="range" min="0" max="100" defaultValue={sensitivityPercent} onChange={this.handleChangeSensitivity} />
					{sensitivityPercent} | {this.state.sensitivity}
				</div><div>
					<label>Sustained</label>
					<input type="range" min="1" max="10" defaultValue="2" onChange={this.handleChangeSustained} />
				</div><div>
					<label>FPS</label>
					<input type="range" min="1" max="30" defaultValue={this.state.fps} onChange={this.handleChangeFPS} />
					{this.state.fps}
				</div><div>
					<label>Pixel Density</label>
					<input type="range" min="2" max="15" defaultValue={this.state.pixelDensity} onChange={this.handleChangePixelDensity} />
					{this.state.pixelDensity}
				</div>
				{motionDetected}
			</div>
		);
	},
});