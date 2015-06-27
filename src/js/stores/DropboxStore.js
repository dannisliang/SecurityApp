import { OrderedMap } from 'immutable';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import Core from '../Core';
import assign from 'object-assign';

// data storage - the values here are also the default settings
let _data = OrderedMap({
	dropboxAuthorizeUrl: null,
	dropboxAuthInProgress: false,
	dropboxAuthCode: null,
	dropboxAuthorized: false
});

const DropboxStore = assign({}, BaseStore, {
	// public methods used by Controller-View to operate on data
	getAll: function() {
		return _data.toObject();
	},
	// register store with dispatcher, allowing actions to flow through
	dispatcherIndex: Dispatcher.register(function(payload) {
		let action = payload.action;
		switch(action.type) {
			case Constants.ActionTypes.DB_GET_AUTH_URL:
				Core.ajax('php/getDBAuthUrl.php', {
					successCallback: function(request) {
						_data = _data.set('dropboxAuthorizeUrl', request.response);
						DropboxStore.emitChange();
					}
				});
				break;
			case Constants.ActionTypes.DB_SEND_AUTH_CODE:
				console.log('- send code: '+action.string);
				console.log(Dropbox);
				// set auth code in store so views can know that user is now submitting it
				_data = _data.set('dropboxAuthCode', action.string);
				DropboxStore.emitChange();
				// send auth code to dropbox
				Core.ajax('php/sendDBAuthCode.php', {
					method: 'POST',
					data: {
						dropboxAuthCode: action.string
					},
					successCallback: function(request) {
						console.log('\n\n\n---- sent');
				  		console.log(request);
					}
				});

				/*var xmlHttp = new XMLHttpRequest();
				var parameters = 'dropboxAuthCode='+action.string;
				xmlHttp.onreadystatechange = function() {
				  if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				  		console.log('\n\n\n---- sent');
				  		console.log(xmlHttp);
				   //document.getElementById('ajaxDump').innerHTML+=xmlHttp.responseText+"<br />";
				  }
				 }
				xmlHttp.open('POST', 'php/sendDBAuthCode.php', true);
				xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlHttp.send('dropboxAuthCode='+action.string);*/
				break;
			case Constants.ActionTypes.DB_AUTH_IN_PROGRESS:
				_data = _data.set('dropboxAuthInProgress', true);
				DropboxStore.emitChange();
				break;
		}
	})
});
export default DropboxStore;