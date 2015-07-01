import React from 'react/addons';
import Tooltip from 'rc-tooltip';
import Fieldset from '../components/forms/Fieldset.jsx';

export default {
	// RENDERING //////////////////////////
	render: function() {
		return (
			<Tooltip {...this.props.tooltip}>
				<Fieldset {...this.props} />
			</Tooltip>
		);
	},
};