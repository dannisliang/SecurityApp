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
	handleChangeFPS: function(event) {
		SettingsActions.setFPS(event.target.value);
	},
	handleChangePixelDensity: function(event) {

	},
	// RENDERING ////////////////////////
	render: function() {
		return (
			<div id="settings-container">
				<button onClick={this.handleToggleDebug}>Toggle Debug</button>
				<label>FPS</label>
				<input type="range" min="1" max="30" defaultValue={this.state.fps} onChange={this.handleChangeFPS} />
				{this.state.fps}
				<label>Pixel Density</label>
				<input type="range" min="5" max="15" defaultValue={this.state.pixelDensity} onChange={this.handleChangePixelDensity} />
			</div>
		);
	},
});