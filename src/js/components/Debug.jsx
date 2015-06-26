import React from 'react';
import Addons from 'react/addons';
import MotionStore from '../stores/MotionStore';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return MotionStore.getAll();
	},
	// LIFECYCLE ////////////////////////////
	componentDidMount: function() {
		MotionStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		MotionStore.removeChangeListener(this._onChange);
	},
	// EVENT HANDLERS ////////////////////////
	_onChange: function() {
		this.setState(MotionStore.getAll());
	},
	// RENDERING ////////////////////////
	render: function() {
		return (
			<div id="debug">
				<h1>Debug Console</h1>
				<ul>
					<li>Webcam Feed: <strong>{this.state.src ? 'YES' : 'NO'}</strong></li>
					<li>Motion Detected: <strong>{this.state.motionDetected ? 'YES' : 'NO'}</strong></li>
					<li>Motion Zones Active: <strong>{this.state.motionZones.length}</strong></li>
				</ul>
			</div>
		);
	},
});