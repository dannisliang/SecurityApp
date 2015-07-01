import React from 'react/addons';
import SettingsActions from '../actions/SettingsActions';
import SettingsStore from '../stores/SettingsStore';
import Dispatcher from '../Dispatcher';
import {navigate} from 'react-mini-router';
import Fieldset from './Fieldset.jsx';
import Tooltips from './Tooltips.jsx';
import assign from 'object-assign';

export default React.createClass({
	// MIXINS /////////////////////////////
	mixins: [React.addons.PureRenderMixin],
	// PROPS //////////////////////////////
	getDefaultProps: function() {
		let tooltipProps = {
			transitionName: 'tooltip',
			placement: {
				points: ['cl','cr']
			}
		};
		return {
			fieldsets: [
				{
					label    	 : 'Motion Sensitivity',
					defaultValue : 'sensitivity',  // refers to the property in settings store we should use as default
					minVal   	 : 25,
					maxVal   	 : 195,
					reverse  	 : true,
					onChange 	 : SettingsActions.setSensitivity,
					tooltip: assign({}, tooltipProps, {
						overlay: <Tooltips name="motionSensitivity" />
					})
				},
				{
					label    	 : 'Motion Grid Size',
					defaultValue : 'motionZoneDensity',
					minVal   	 : 15,
					reverse  	 : true,
					onChange 	 : SettingsActions.setMotionZoneDensity,
					tooltip: assign({}, tooltipProps, {
						overlay: <Tooltips name="motionGridSize" />
					})
				},
				{
					label    	 : 'Frame Capture Speed',
					defaultValue : 'fps',  // refers to the property in settings store we should use as default
					minVal   	 : 1,
					maxVal   	 : 30,
					onChange 	 : SettingsActions.setFPS,
					tooltip: assign({}, tooltipProps, {
						overlay: <Tooltips name="frameCaptureSpeed" />
					})
				},
				{
					label    	 : 'Active Zones Needed',
					defaultValue : 'activeZonesNeeded',  // refers to the property in settings store we should use as default
					minVal   	 : 1,
					maxVal   	 : 50,
					onChange 	 : SettingsActions.setActiveZonesNeeded,
					tooltip: assign({}, tooltipProps, {
						overlay: <Tooltips name="activeZonesNeeded" />
					})
				}
			],
			fieldsetsAdvanced: [
				{
					label : 'Image Capture Size',
					defaultValue : 'imageCaptureSizeValue',  // refers to the property in settings store we should use as default
					type  : 'select',
					options: [
						{
							value: 'small',
							label: 'Small (320x240)',
							width: 320,
							height: 240
						},
						{
							value: 'normal',
							label: 'Normal (640x480)',
							width: 640,
							height: 480
						},
						{
							value: 'large',
							label: 'Large (800x600)',
							width: 800,
							height: 600
						}
					],
					tooltip: assign({}, tooltipProps, {
						overlay: <Tooltips name="imageCaptureSize" />
					}),
					onChange: function(object) {
						SettingsActions.setImageCaptureSize(object);
					}
				}
			]
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
	_handleClose: function(event) {
		event.preventDefault();
		setTimeout(function() { navigate('/'); }, 0);
	},
	// RENDERING ////////////////////////
	/* produces a list of Fieldset components base on this component's default props above */
	_renderFieldsets: function(string) {
		let fieldsetComponents = [];
		this.props[string].map(function(fieldset){
			// look for default value in the component state or else just use what is provided in props
			let defaultValue = this.state[fieldset.defaultValue] ? this.state[fieldset.defaultValue] : fieldset.defaultValue;
			// add new fieldset to list
			fieldsetComponents.push(
				<Fieldset {...fieldset} defaultValue={defaultValue} key={fieldset.defaultValue} />
			);
		}, this);
		return fieldsetComponents;
	},
	/* main component render method */
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
						{this._renderFieldsets('fieldsets')}
						<h2>Advanced</h2>
						{this._renderFieldsets('fieldsetsAdvanced')}
					</form>
				</div>
			</div>
		);
	},
});