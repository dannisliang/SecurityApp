import React from 'react';

export default React.createClass({
	// RENDERING ////////////////////////////
	render: function() {
		var motionBoxStyle = {
			left   : this.props.motionzone[0].x,
			top    : this.props.motionzone[0].y,
			width  : this.props.motionzone[1].x - this.props.motionzone[0].x,
			height : this.props.motionzone[1].y - this.props.motionzone[0].y
		};
		return (
			<div id="motion-box" style={motionBoxStyle}></div>
		);
	},
});