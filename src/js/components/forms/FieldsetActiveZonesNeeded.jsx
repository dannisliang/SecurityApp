import React from 'react/addons';
import FieldsetMixin from '../../mixins/FieldsetMixin';
import SettingsActions from '../../actions/SettingsActions';

export default React.createClass({
	// MIXINS /////////////////////////////
	mixins: [FieldsetMixin, React.addons.PureRenderMixin],
	// DEFAULTS ///////////////////////////
	/*
		this.props vals will be set to these unless explicitly passed from parent
	*/
	getDefaultProps: function() {
		return {
			label    	 : 'Active Zones Needed',
			minVal   	 : 1,
			maxVal   	 : 50,
			onChange 	 : SettingsActions.setActiveZonesNeeded,
			tooltip: {
				placement: 'right',
				trigger: 'hover',
				overlay: <span>Tooltip</span>,
				renderPopupToBody: true
			}
		};
	}
});