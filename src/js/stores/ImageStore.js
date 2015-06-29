import React from 'react/addons';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage - the values here are also the default settings
let _data = {
	breachCanvas: null
};

const ImageStore = assign({}, BaseStore, {
	// public methods used by Controller-View to operate on data
	getAll: function() {
		return _data;
	},
	// register store with dispatcher, allowing actions to flow through
	dispatcherIndex: Dispatcher.register(function(payload) {
		let action = payload.action;
		switch(action.type) {
			case Constants.ActionTypes.CAPTURE_BREACH:
				_data = React.addons.update(_data, {
					breachCanvas: {$set: action.canvas}
				});
				ImageStore.emitChange();
				break;
		}
	})
});
export default ImageStore;