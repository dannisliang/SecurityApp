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
			label    	 : 'Motion Grid Density',
			minVal   	 : 15,
			reverse  	 : true,
			onChange 	 : SettingsActions.setMotionZoneDensity,
			tooltip: {
				placement: 'right',
				trigger: 'hover',
				overlay: <span>Tooltip</span>,
				renderPopupToBody: true
			}
		};
	}
});