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
		//DropboxActions.getAuthUrl();
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
	_handleDropboxAuthorizeClick: function(e) {
		e.preventDefault();
		var client = new Dropbox.Client({key: "xqb4jksizxtzf1k"});
		client.authDriver(new Dropbox.AuthDriver.Popup({
			rememberUser: false,
			receiverUrl: 'http://localhost/dropbox-oauth.html'
		}));
		client.authenticate(function(error, client) {
		  if (error) {
		    console.log(error);
		    return;
		  }
		  console.log(client);
		  client.writeFile("hello_world.txt", "Hello, world!\n", function(error, stat) {
  if (error) {
    return showError(error);  // Something went wrong.
  }

  alert("File saved as revision " + stat.versionTag);
});
		});
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
	// RENDERING ////////////////////////
	render: function() {
		return (
			<div className="table fill absolute">
				<div className="table-cell-valign">
					<i className="icon icon-ninja-star"></i>
					<button onClick={this._handleGrantWebcamAccessClick} className="red">GRANT WEBCAM ACCESS</button>
					<a onClick={this._handleDropboxAuthorizeClick} href={this.state.dropboxAuthorizeUrl} target="_blank">Dropbox</a>
				</div>
			</div>
		);
	},
});