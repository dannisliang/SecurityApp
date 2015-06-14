import React from 'react';

export default React.createClass({
	// RENDERING ////////////////////////////
	render: function() {
		return (
			<div id="motion-box" style={this.props.motionZone}></div>
		);
	},
});