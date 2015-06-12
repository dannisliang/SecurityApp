import React from 'react';
import Addons from 'react/addons';
import MotionSettingsActionCreator from '../actions/MotionSettingsActionCreator';
import Dispatcher from '../Dispatcher';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// LIFECYCLE ////////////////////////////
	componentDidMount: function() {
	},
	componentWillUnmount: function() {
	},

	handleToggleDebug: function() {
		MotionSettingsActionCreator.toggleDebug();
	},
	handleChangeFPS: function(event) {
		MotionSettingsActionCreator.setFPS(event.target.value);
	},
	// RENDERING ////////////////////////
	render: function() {
		return (
			<div id="settings-container">
				<button onClick={this.handleToggleDebug}>Toggle Debug</button>
				<label>FPS</label>
				<input type="range" min="1" max="30" defaultValue={this.props.fps} onChange={this.handleChangeFPS} />
				{this.props.fps}
			</div>
		);
	},
});