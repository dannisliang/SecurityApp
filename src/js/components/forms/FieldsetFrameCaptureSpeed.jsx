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
			label    	 : 'Frame Capture Speed',
			minVal   	 : 1,
			maxVal   	 : 30,
			onChange 	 : SettingsActions.setFPS,
			tooltip: {
				placement: 'right',
				trigger: 'hover',
				overlay: <span>Tooltip</span>,
				renderPopupToBody: true
			}
		};
	},
	// RENDERING //////////////////////////
	render: function() {
		return (
			<Tooltip {...this.props.tooltip}>
				<Fieldset {...this.props} />
			</Tooltip>
		);
	},
});