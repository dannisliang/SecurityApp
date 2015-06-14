import { OrderedMap } from 'immutable';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage - the values here are also the default settings
let _data = OrderedMap({
	debug        : true,
	fps          : 10,
	fpsInterval  : 100,    //  1000 / fps
	pixelDensity : 10
});

const SettingsStore = assign({}, BaseStore, {
	// public methods used by Controller-View to operate on data
	getAll: function() {
		return _data.toObject();
	},
	// register store with dispatcher, allowing actions to flow through
	dispatcherIndex: Dispatcher.register(function(payload) {
		let action = payload.action;
		switch(action.type) {
			case Constants.ActionTypes.SET_FPS:
				_data = _data.merge({
					fps         : action.fps,
					fpsInterval : 1000 / action.fps
				});
				SettingsStore.emitChange();
				break;
			case Constants.ActionTypes.TOGGLE_DEBUG:
				_data = _data.set('debug', !_data.get('debug'));
				SettingsStore.emitChange();
				break;
		}
	})
});
export default SettingsStore;