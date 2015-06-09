import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage
let _data = {

};

const VideoStore = assign({}, BaseStore, {
	// public methods used by Controller-View to operate on data
	getAll: function() {
		return _data;
	},
	// register store with dispatcher, allowing actions to flow through
	dispatcherIndex: Dispatcher.register(function(payload) {
		let action = payload.action;
		switch(action.type) {
			case Constants.ActionTypes.ADD_VIDEO_SRC:
				_data.src = action.src;  // set webcam src
				VideoStore.emitChange();
				break;
			case Constants.ActionTypes.ADD_VIDEO_SRC_ERROR:
				// TODO
				break;
			case Constants.ActionTypes.START_VIDEO:
				_data.startVideo = true;
				VideoStore.emitChange();
				break;
			case Constants.ActionTypes.CAPTURE:
				_data.capture = true;
				VideoStore.emitChange();
				break;
		}
	})
});
export default VideoStore;