import React from 'react/addons';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage - the values here are also the default settings
let _data = {
	width             : window.innerWidth,
	height            : window.innerHeight,
	debug             : false,
	sensitivity       : 75,   // sensitivity used when comparing pixels (note: this is converted to 0-100% on FE to make the values more clear)
	fps               : 18,     // frames per second
	fpsInterval       : 55.555,    // 1000 / fps = fpsInterval (used to throttle RAF loop)
	motionZoneDensity : 35,    // it is too CPU intensive to compare every pixel in frame, so instead we use this (ex: 640 / 10)
	activeZonesNeeded : 20
};

const SettingsStore = assign({}, BaseStore, {
	// public methods used by Controller-View to operate on data
	getAll: function() {
		return _data;
	},
	// register store with dispatcher, allowing actions to flow through
	dispatcherIndex: Dispatcher.register(function(payload) {
		let action = payload.action;
		switch(action.type) {
			case Constants.ActionTypes.SET_FPS:
				_data = React.addons.update(_data, {
					$merge: {
						fps         : action.fps,
						fpsInterval : 1000 / action.fps
					}
				});
				SettingsStore.emitChange();
				break;
			case Constants.ActionTypes.SET_SENSITIVITY:
				_data = React.addons.update(_data, {
					sensitivity: {$set: action.number}
				});
				SettingsStore.emitChange();
				break;
			case Constants.ActionTypes.MOTION_ZONE_DENSITY:
				_data = React.addons.update(_data, {
					motionZoneDensity: {$set: action.number}
				});
				SettingsStore.emitChange();
				break;
			case Constants.ActionTypes.ACTIVE_ZONES_NEEDED:
				_data = React.addons.update(_data, {
					activeZonesNeeded: action.number
				});
				SettingsStore.emitChange();
				break;
			case Constants.ActionTypes.TOGGLE_DEBUG:
				_data = React.addons.update(_data, {
					debug: !_data.debug
				});
				SettingsStore.emitChange();
				break;
			case Constants.ActionTypes.RESIZE:
				_data = React.addons.update(_data, {
					$merge: {
						width  : window.innerWidth,
						height : window.innerHeight
					}
				});
				SettingsStore.emitChange();
				break;
		}
	})
});
export default SettingsStore;