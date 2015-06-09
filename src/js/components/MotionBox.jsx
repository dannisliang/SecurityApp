import React from 'react';

export default React.createClass({
	// RENDERING ////////////////////////////
	render: function() {
		var motionBoxStyle = {
			left   : this.props.motionZoneTopLeftX,
			top    : this.props.motionZoneTopLeftY,
			width  : this.props.motionZoneBottomRightX - this.props.motionZoneTopLeftX,
			height : this.props.motionZoneBottomRightY - this.props.motionZoneTopLeftY
		};
		return (
			<div id="motion-box" style={motionBoxStyle}></div>
		);
	},
});