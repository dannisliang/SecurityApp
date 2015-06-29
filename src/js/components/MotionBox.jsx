import React from 'react/addons';

export default React.createClass({
	mixins: [React.addons.PureRenderMixin],
	// RENDERING ////////////////////////////
	render: function() {
		return (
			<div id="motion-box" style={this.props.motionZone}></div>
		);
	},
});