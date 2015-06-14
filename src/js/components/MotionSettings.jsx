import React from 'react';
import Addons from 'react/addons';
import SettingsActions from '../actions/SettingsActions';
import SettingsStore from '../stores/SettingsStore';
import Dispatcher from '../Dispatcher';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	// MIXINS /////////////////////////////
	mixins: [PureRenderMixin],
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
		let sensitivity = (((100 - event.target.value) * (this.state.maxSensitivity - this.state.minSensitivity)) / 100) + this.state.minSensitivity;
		SettingsActions.setSensitivity(sensitivity);
	},
	handleChangeFPS: function(event) {
		SettingsActions.setFPS(event.target.value);
	},
	handleChangePixelDensity: function(event) {
		SettingsActions.setPixelDensity(event.target.value);
	},
	// RENDERING ////////////////////////
	render: function() {
		return (
			<div id="settings-container">
				<div>
					<button onClick={this.handleToggleDebug}>Toggle Debug</button>
				</div><div>
					<label>Sensitivity</label>
					<input type="range" min="0" max="100" defaultValue={this.state.sensitivity} onChange={this.handleChangeSensitivity} />
					{this.state.sensitivity}
				</div><div>
					<label>FPS</label>
					<input type="range" min="1" max="30" defaultValue={this.state.fps} onChange={this.handleChangeFPS} />
					{this.state.fps}
				</div><div>
					<label>Pixel Density</label>
					<input type="range" min="2" max="15" defaultValue={this.state.pixelDensity} onChange={this.handleChangePixelDensity} />
					{this.state.pixelDensity}
				</div>
			</div>
		);
	},
});