import { OrderedMap } from 'immutable';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage - the values here are also the default settings
let _data = OrderedMap({
	debug           : true,
	sensitivity     : 67.5,   // sensitivity used when comparing pixels (note: this is converted to 0-100% on FE to make the values more clear)
	fps             : 10,     // frames per second
	fpsInterval     : 100,    // 1000 / fps = fpsInterval (used to throttle RAF loop)
	pixelDensity    : 10,     // it is too CPU intensive to compare every pixel in frame, so instead we use this (ex: 640 / 10)
	sustainedMotion : 3       // how many frames motion has to exist over to trigger a detection (helps avoid false alarms)
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
			case Constants.ActionTypes.SET_SENSITIVITY:
				_data = _data.set('sensitivity', action.number);
				SettingsStore.emitChange();
				break;
			case Constants.ActionTypes.SET_SUSTAINED:
				_data = _data.set('sustainedMotion', action.number);
				SettingsStore.emitChange();
				break;
			case Constants.ActionTypes.SET_PIXEL_DENSITY:
				_data = _data.set('pixelDensity', action.pixelDensity);
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