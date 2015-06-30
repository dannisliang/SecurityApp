import React from 'react/addons';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';
// Set default data params from Config.js
let _data = MNConfig.settings;
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
				for(var i=0, l=_data.imageCaptureSizes.length; i<l; i++) {
					let imageCaptureSize = _data.imageCaptureSizes[i];
					if(imageCaptureSize.value === action.string) {
						SettingsStore._updateData({
							advanced: {
								$merge: {
									imageCaptureSize: imageCaptureSize
								}
							}
						});
						break;
					}
				}
				console.log(_data);
				SettingsStore.emitChange();
				break;
		}
	})
});
export default SettingsStore;