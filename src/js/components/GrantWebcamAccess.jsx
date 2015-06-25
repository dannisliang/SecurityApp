import React from 'react';
import Addons from 'react/addons';
import MotionActions from '../actions/MotionActions';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// USER INPUT EVENTS ////////////////////
	_handleGetVideoSrc: function() {
		MotionActions.addVideoSrc();
	},
	// RENDERING ////////////////////////
	render: function() {
		return (
			<div className="table fill absolute">
				<div className="table-cell-valign">
					<i className="icon icon-ninja-star"></i>
					<button onClick={this._handleGetVideoSrc} className="red">GRANT WEBCAM ACCESS</button>
				</div>
			</div>
		);
	},
});