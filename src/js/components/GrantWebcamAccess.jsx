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
	_handleAuthorizeDropbox: function() {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
				if(xmlhttp.status === 200){
					console.log(xmlhttp.response);
				}
				else if(xmlhttp.status === 400) {
					alert('There was an error 400')
				}
				else {
					alert('something else other than 200 was returned')
				}
			}
		}
		xmlhttp.open("GET", "php/getDBAuthUrl.php", true);
		xmlhttp.send();
		///DropboxActions.getAuthorizeUrl();
	},
	// RENDERING ////////////////////////
	render: function() {
		return (
			<div className="table fill absolute">
				<div className="table-cell-valign">
					<i className="icon icon-ninja-star"></i>
					<button onClick={this._handleGetVideoSrc} className="red">GRANT WEBCAM ACCESS</button>
					<button onClick={this._handleAuthorizeDropbox}>Dropbox</button>
				</div>
			</div>
		);
	},
});