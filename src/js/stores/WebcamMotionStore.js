import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage
let _data = {};

const WebcamMotionStore = assign({}, BaseStore, {
	// public methods used by Controller-View to operate on data
	getAll: function() {
		return _data;
	},
	// register store with dispatcher, allowing actions to flow through
	dispatcherIndex: Dispatcher.register(function(payload) {
		//let action = payload.action;
		switch(payload.action.type) {
			case Constants.ActionTypes.RAF:
				_data.raf = true;
				WebcamMotionStore.emitChange();
				break;
			case Constants.ActionTypes.ADD_VIDEO_SRC:
				_data.src = payload.action.src;
				WebcamMotionStore.emitChange();
				break;
			case Constants.ActionTypes.ADD_FRAME:
				_data.previousFrame = _data.currentFrame;
				_data.currentFrame = payload.action.canvas;
				WebcamMotionStore.emitChange();
				break;
			case Constants.ActionTypes.CAPTURE:
				_data.capture = true;
				WebcamMotionStore.emitChange();
				break;
		}
	})
});
export default WebcamMotionStore;