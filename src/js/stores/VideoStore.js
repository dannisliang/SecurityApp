import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage
let _data = {
	isPlaying: false
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
				if(!_data.isPlaying) {
					VideoStore.emit(Constants.VIDEO_PLAY_EVENT);  // send separate event so components know they should start auto-playing the video
				}
				break;
			case Constants.ActionTypes.ADD_VIDEO_SRC_ERROR:
				// TODO
				break;
		}
	})
});
export default VideoStore;