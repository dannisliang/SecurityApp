import { OrderedMap } from 'immutable';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import SettingsStore from './SettingsStore';
import assign from 'object-assign';

// data storage - the values here are also the default settings
let _data = OrderedMap({
	effects: true,
	armed: false,
	motionDetected: false,
	motionZones: [],
	motionZone: {top: 0, left: 0, width: 0, height: 0}   // used in debug mode to show what part of the frame we're detecting motion in
});
// delay for motion detected so if motion is sensed it will stay on for the duration of the delay
let _motionDetectionDelay = 800;
let _motionDetectionDelayTimeout = null;

const MotionStore = assign({}, BaseStore, {
	// public methods used by Controller-View to operate on data
	getAll: function() {
		return _data.toObject();
	},
	// event dispatchers
	emitRAF: function() {
		this.emit(Constants.RAF_EVENT);
	},
	// event listeners
	addRAFListener: function(callback) {
		this.on(Constants.RAF_EVENT, callback);
	},
	removeRAFListener: function(callback) {
		this.removeListener(Constants.RAF_EVENT, callback);
	},
	// register store with dispatcher, allowing actions to flow through
	dispatcherIndex: Dispatcher.register(function(payload) {
		let action = payload.action;
		switch(action.type) {
			case Constants.ActionTypes.RAF:
				MotionStore.emitRAF();
				break;
			case Constants.ActionTypes.MOTION_ZONES:
				_data = _data.set('motionZones', action.array);
				MotionStore.emitChange();
				break;
			case Constants.ActionTypes.MOTION_DETECTED:
				if(!_motionDetectionDelayTimeout) {
					_data = _data.set('motionDetected', action.boolean);
					if(action.boolean) {
						// if motion is detected apply a delay before this store can send out the 'all clear'
						_motionDetectionDelayTimeout = setTimeout(function() {
							_motionDetectionDelayTimeout = null;
						}, _motionDetectionDelay);
					}
					MotionStore.emitChange();
				}
				break;
			case Constants.ActionTypes.VIDEO_RESIZE:
				_data = _data.merge({
					videoWidth  : action.array[0],
					videoHeight : action.array[1]
				});
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
			case Constants.ActionTypes.PLAY:
				_data = _data.set('playing', true);
				MotionStore.emitChange();
				break;
			case Constants.ActionTypes.ARMED:
				_data = _data.merge({
					armed: true,
					effects: false
				});
				MotionStore.emitChange();
				break;
			case Constants.ActionTypes.DISARMED:
				_data = _data.merge({
					armed: false,
					effects: true
				});
				MotionStore.emitChange();
				break;
			case Constants.ActionTypes.DEBUG_TOGGLE_EFFECTS:
				_data = _data.set('effects', !_data.get('effects'));
				MotionStore.emitChange();
				break;
		}
	})
});
export default MotionStore;