import React from 'react';
import Addons from 'react/addons';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// RENDERING ////////////////////////////
	render: function() {
		return (
			<div id="motion-box" style={this.props.motionZone}></div>
		);
	},
});