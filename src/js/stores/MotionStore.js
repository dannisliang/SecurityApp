import { OrderedMap } from 'immutable';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import SettingsStore from './SettingsStore';
import assign from 'object-assign';

// data storage - the values here are also the default settings
let _data = OrderedMap({
	motionDetected: false,
	width: 640,
	height: 480,
	motionZone: {top: 0, left: 0, width: 0, height: 0}   // used in debug mode to show what part of the frame we're detecting motion in
});

const MotionStore = assign({}, BaseStore, {
	// public methods used by Controller-View to operate on data
	getAll: function() {
		return _data.toObject();
	},
	// register store with dispatcher, allowing actions to flow through
	dispatcherIndex: Dispatcher.register(function(payload) {
		let action = payload.action;
		switch(action.type) {
			case Constants.ActionTypes.RAF:
				if(action.raf !== _data.get('raf')) {
					_data = _data.set('raf', action.raf);
					MotionStore.emitChange();
				}
				break;
			case Constants.ActionTypes.MOTION_DETECTED:
				if(action.boolean !== _data.get('motionDetected')) {
					_data = _data.set('motionDetected', action.boolean);
					MotionStore.emitChange();
				}
				break;
			case Constants.ActionTypes.MOTION_ZONE:
				_data = _data.set('motionZone', action.motionZone);
				MotionStore.emitChange();
				break;
			case Constants.ActionTypes.ADD_VIDEO_SRC:
				_data = _data.set('src', action.src);
				MotionStore.emitChange();
				break;
			case Constants.ActionTypes.CAPTURE_FRAME:
				_data = _data.merge({
					previousFrame: _data.get('currentFrame'),
					currentFrame: action.canvas
				});
				MotionStore.emitChange();
				break;
		}
	})
});
export default MotionStore;