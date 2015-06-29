import React from 'react/addons';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

let _data = {
	debug: false,
	webcam: false
};

const AppStore = assign({}, BaseStore, {
	// public methods used by Controller-View to operate on data
	getAll: function() {
		return _data;
	},
	// register store with dispatcher, allowing actions to flow through
	dispatcherIndex: Dispatcher.register(function(payload) {
		let action = payload.action;
		switch(action.type) {
			case Constants.ActionTypes.APP_DEBUG:
				_data = React.addons.update(_data, {
					debug: {$set: action.boolean}
				});
				AppStore.emitChange();
				break;
			case Constants.ActionTypes.ADD_VIDEO_SRC:
				_data = React.addons.update(_data, {
					webcam: {$set: true} // used to determine if user has video setup yet (pages like arm, settings, etc require video to be working)
				});
				AppStore.emitChange();
				break;
		}
	})
});
export default AppStore;