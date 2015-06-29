import React from 'react/addons';
import DropboxActions from '../actions/DropboxActions';
import {navigate} from 'react-mini-router';

export default React.createClass({
	mixins: [React.addons.PureRenderMixin],
	// USER INPUT EVENTS ////////////////
	_handleCancelClick: function() {
		event.preventDefault();
		setTimeout(function() { navigate('/'); }, 0);
	},
	_handleDropboxAuthenticateClick: function() {
		DropboxActions.authenticate();
	},
	// RENDERING ////////////////////////
	render: function() {
		let copy;
		if(this.props.dropboxClient) {
			copy = (
				<div>
					<h1>Arming in {this.props.countdownSeconds} seconds</h1>
					The system will NOT arm if motion is detected when the countdown ends.<br/>Please leave the area.
				</div>
			);
		} else {
			copy = (
				<div>
					<h1>Connect to your Dropbox Account</h1>
					In order to arm your system you must connect it to your personal Dropbox account so Mugshot Ninja can save images to it.
					<button onClick={this._handleDropboxAuthenticateClick} className="red">CONNECT TO DROPBOX</button>
				</div>
			);
		}
		return (
			<div className="table-cell-valign">
				<i id="arm-icon-ninja-star" className="icon icon-ninja-star"></i>
				<div id="arm-info-container">
					{copy}
				</div>
				<button onClick={this._handleCancelClick} className="red">CANCEL</button>
			</div>
		);
	},
});