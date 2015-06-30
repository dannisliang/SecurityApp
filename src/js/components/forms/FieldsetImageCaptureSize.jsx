import React from 'react/addons';
import Tooltip from 'rc-tooltip';
import Fieldset from './Fieldset.jsx';
import SettingsActions from '../../actions/SettingsActions';

export default React.createClass({
	// MIXINS /////////////////////////////
	mixins: [React.addons.PureRenderMixin],
	// DEFAULTS ///////////////////////////
	/*
		this.props vals will be set to these unless explicitly passed from parent
	*/
	getDefaultProps: function() {
		return {
			label : 'Image Capture Size',
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
			tooltip: {
				placement: 'right',
				trigger: 'hover',
				overlay: <span>Tooltip</span>,
				renderPopupToBody: true
			}
		};
	},
	// EVENTS /////////////////////////////
	_handleChange: function(value) {
		var option;
		for(var i=0, l=this.props.options.length; i<l; i++) {
			if(this.props.options[i].value === value) {
				option = this.props.options[i];
				break;
			}
		}
		SettingsActions.setImageCaptureSize(option);
	},
	// RENDERING //////////////////////////
	render: function() {
		return (
			<Tooltip {...this.props.tooltip}>
				<Fieldset {...this.props} onChange={this._handleChange} />
			</Tooltip>
		);
	},
});