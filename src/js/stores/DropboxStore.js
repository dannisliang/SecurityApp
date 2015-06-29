import React from 'react/addons';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import Core from '../Core';
import assign from 'object-assign';

// data storage - the values here are also the default settings
let _data = {
	dropboxClient : null,
	dropboxError  : false
};

const DropboxStore = assign({}, BaseStore, {
	// public methods used by Controller-View to operate on data
	getAll: function() {
		return _data;
	},
	// register store with dispatcher, allowing actions to flow through
	dispatcherIndex: Dispatcher.register(function(payload) {
		let action = payload.action;
		switch(action.type) {
			case Constants.ActionTypes.DROPBOX_AUTHORIZE:
				let client = new Dropbox.Client({key: "xqb4jksizxtzf1k"});
				client.authDriver(new Dropbox.AuthDriver.Popup({
					rememberUser : true,
					receiverUrl  : 'http://localhost/dropbox-oauth.html'
				}));
				client.authenticate(function(error, client) {
					if(error) {
						// TODO: handle case in component
						_data = React.addons.update(_data, {
							dropboxError: {$set: error}
						});
						return;
					}
					_data = React.addons.update(_data, {
						dropboxClient: {$set: client}
					});
					DropboxStore.emitChange();
				});
				break;
			case Constants.ActionTypes.DROPBOX_SAVE_CANVAS_AS_IMAGE:
				let data = Core.base64ToArrayBuffer(action.canvas.toDataURL('image/png'));
				let fileName = 'security-breach-'+Core.timestamp()+'.png';
				_data.dropboxClient.writeFile(fileName, data, function(error, stat){
					if(error) {
						console.log(error);
						return;
					}
				});
				break;
		}
	})
});
export default DropboxStore;