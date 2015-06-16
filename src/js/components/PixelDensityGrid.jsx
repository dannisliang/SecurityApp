import React from 'react';
import Addons from 'react/addons';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// RENDERING ////////////////////////////
	render: function() {
		let style = {
			backgroundSize: (this.props.width / (this.props.width / this.props.pixelDensity))+'px '+(this.props.height / (this.props.height / this.props.pixelDensity))+'px'
		};
		return (
			<div id="pixel-density-grid" className="fill absolute" style={style}></div>
		);
	},
});