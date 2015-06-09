import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import VideoStore from './VideoStore';
import assign from 'object-assign';

// data storage
let _data = {
	debugMode: true
};

const MotionStore = assign({}, BaseStore, {
	// public methods used by Controller-View to operate on data
	getAll: function() {
		return _data;
	},
	// register store with dispatcher, allowing actions to flow through
	dispatcherIndex: Dispatcher.register(function(payload) {
		let action = payload.action;
		switch(action.type) {
			case Constants.ActionTypes.ADD_VIDEO_SRC:
				Dispatcher.waitFor([VideoStore.dispatcherIndex]);
				_data.startMotionDetection = true;  // start motion detection if video src is set
				MotionStore.emitChange();
				break;
			case Constants.ActionTypes.ADD_FRAME:
				_data.previousFrame = _data.currentFrame;
				_data.currentFrame = action.canvas;
				MotionStore.emitChange();
				break;
		}
	})
});
export default MotionStore;