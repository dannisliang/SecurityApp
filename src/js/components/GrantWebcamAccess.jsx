import React from 'react';
import Addons from 'react/addons';
import MotionActions from '../actions/MotionActions';
import DropboxActions from '../actions/DropboxActions';
import DropboxStore from '../stores/DropboxStore';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return DropboxStore.getAll();
	},
	// LIFECYCLE ////////////////////////////
	componentDidMount: function() {
		DropboxStore.addChangeListener(this._onChange);
		DropboxActions.getAuthUrl();
	},
	componentWillUnmount: function() {
		DropboxStore.removeChangeListener(this._onChange);
	},
	// EVENTS ////////////////////////////////
	_onChange: function() {
		this.setState(DropboxStore.getAll());
	},
	_handleGrantWebcamAccessClick: function() {
		MotionActions.addVideoSrc();
	},
	_handleDropboxAuthorizeClick: function() {
		DropboxActions.authInProgress();
	},
	_handleDropboxAuthCodeSubmit: function(event) {
		event.preventDefault();
		let authCodeInputNode = React.findDOMNode(this.refs.dbAuthCode),
			authCode = authCodeInputNode && authCodeInputNode.value.trim();
		if(typeof authCode !== 'string' || !authCode.length) {
			console.warn('NO AUTH CODE PROVIDED');
			return;
		}
		DropboxActions.sendAuthCode(authCode);
	},
	//_handleAuthorizeDropbox: function() {
		/*var xmlhttp = new XMLHttpRequest();
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
		xmlhttp.send();*/
		//DropboxActions.getAuthorizeUrl();
	//},
	// RENDERING ////////////////////////
	render: function() {
		//let dropboxCodeFormComponent = null;
		//if(this.state.dropboxAuthInProgress) {
		let dropboxCodeFormComponent = (
			<form onSubmit={this._handleDropboxAuthCodeSubmit}>
				<input ref="dbAuthCode" placeholder="DB Code" />
				<input type="submit" value="Submit" />
			</form>
		);
		//}
		return (
			<div className="table fill absolute">
				<div className="table-cell-valign">
					<i className="icon icon-ninja-star"></i>
					<button onClick={this._handleGrantWebcamAccessClick} className="red">GRANT WEBCAM ACCESS</button>
					<a onClick={this._handleDropboxAuthorizeClick} href={this.state.dropboxAuthorizeUrl} target="_blank">Dropbox</a>
					{dropboxCodeFormComponent}
				</div>
			</div>
		);
	},
});