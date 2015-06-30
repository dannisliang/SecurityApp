import React from 'react/addons';
import SettingsActions from '../actions/SettingsActions';
import SettingsStore from '../stores/SettingsStore';
import Dispatcher from '../Dispatcher';
import Core from '../Core';
import {navigate} from 'react-mini-router';
import FieldsetMotionSensitivity from './forms/FieldsetMotionSensitivity.jsx';
import FieldsetMotionDensity from './forms/FieldsetMotionDensity.jsx';
import FieldsetFrameCaptureSpeed from './forms/FieldsetFrameCaptureSpeed.jsx';
import FieldsetActiveZonesNeeded from './forms/FieldsetActiveZonesNeeded.jsx';
import FieldsetImageCaptureSize from './forms/FieldsetImageCaptureSize.jsx';

export default React.createClass({
	// MIXINS /////////////////////////////
	mixins: [React.addons.PureRenderMixin],
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
	_handleClose: function(event) {
		event.preventDefault();
		setTimeout(function() { navigate('/'); }, 0);
	},
	// RENDERING ////////////////////////
	render: function() {
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
						<FieldsetMotionSensitivity defaultValue={this.state.sensitivity} />
						<FieldsetMotionDensity defaultValue={this.state.motionZoneDensity} />
						<FieldsetFrameCaptureSpeed defaultValue={this.state.fps} />
						<FieldsetActiveZonesNeeded defaultValue={this.state.activeZonesNeeded} />
						<h2>Advanced</h2>
						<FieldsetImageCaptureSize defaultValue={this.state.imageCaptureSize.value} />
					</form>
				</div>
			</div>
		);
	},
});