import React from 'react/addons';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';
// set the default values for this store
let _data = {
	sensitivity        : 75,        // sensitivity used when comparing pixels (note: this is converted to 0-100% on FE to make the values more clear)
	fps                : 20,        // frames per second
	fpsInterval        : 55.555,    // 1000 / fps = fpsInterval (used to throttle RAF loop)
	motionZoneDensity  : 35,        // it is too CPU intensive to compare every pixel in frame, so instead we use this (ex: 640 / 10)
	activeZonesNeeded  : 10,
	imageCaptureSizeValue: 'normal',
	imageCaptureSize   : {value: 'normal', width: 640, height: 480}
};
// Register the store
const SettingsStore = assign({}, BaseStore, {
	// public methods used by Controller-View to operate on data
	getAll: function() {
		return _data;
	},
	_updateData: function(data) {
    	_data = React.addons.update(_data, data);
  	},
	// register store with dispatcher, allowing actions to flow through
	dispatcherIndex: Dispatcher.register(function(payload) {
		let action = payload.action;
		switch(action.type) {
			case Constants.ActionTypes.SET_FPS:
				SettingsStore._updateData({
					$merge: {
						fps         : action.fps,
						fpsInterval : 1000 / action.fps
					}
				});
				SettingsStore.emitChange();
				break;
			case Constants.ActionTypes.SET_SENSITIVITY:
				SettingsStore._updateData({
					sensitivity: {$set: action.number}
				});
				SettingsStore.emitChange();
				break;
			case Constants.ActionTypes.MOTION_ZONE_DENSITY:
				SettingsStore._updateData({
					motionZoneDensity: {$set: action.number}
				});
				SettingsStore.emitChange();
				break;
			case Constants.ActionTypes.ACTIVE_ZONES_NEEDED:
				SettingsStore._updateData({
					activeZonesNeeded: {$set: action.number}
				});
				SettingsStore.emitChange();
				break;
			case Constants.ActionTypes.TOGGLE_DEBUG:
				SettingsStore._updateData({
					debug: !_data.debug
				});
				SettingsStore.emitChange();
				break;
			case Constants.ActionTypes.RESIZE:
				SettingsStore._updateData({
					$merge: {
						width  : window.innerWidth,
						height : window.innerHeight
					}
				});
				SettingsStore.emitChange();
				break;
			case Constants.ActionTypes.SET_IMAGE_CAPTURE_SIZE:
				SettingsStore._updateData({
					imageCaptureSizeValue: {$set: action.object.value},
					imageCaptureSize: {$set: action.object}
				});
				SettingsStore.emitChange();
				break;
		}
	})
});
export default SettingsStore;