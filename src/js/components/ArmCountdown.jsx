import React from 'react';
import Addons from 'react/addons';
import {navigate} from 'react-mini-router';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// USER INPUT EVENTS ////////////////
	_handleCancelClick: function() {
		event.preventDefault();
		setTimeout(function() { navigate('/'); }, 0);
	},
	// RENDERING ////////////////////////
	render: function() {
		return (
			<div className="table-cell-valign">
				<i id="arm-icon-ninja-star" className="icon icon-ninja-star"></i>
				<div id="arm-info-container">
					<h1>Arming in {this.props.countdownSeconds} seconds</h1>
					The system will NOT arm if motion is detected when the countdown ends.<br/>Please leave the area.
				</div>
				<button onClick={this._handleCancelClick} className="red">CANCEL</button>
			</div>
		);
	},
});