import Immutable from 'immutable';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage
var _data = Immutable.Map();
_data = _data.set('test',true);

const WebcamMotionStore = assign({}, BaseStore, {
	// public methods used by Controller-View to operate on data
	getAll: function() {
		return _data.toObject();
	},
	// register store with dispatcher, allowing actions to flow through
	dispatcherIndex: Dispatcher.register(function(payload) {
		//let action = payload.action;
		var action = payload.action;
		switch(action.type) {
			case Constants.ActionTypes.RAF:
				_data = _data.set('raf', action.raf);
				WebcamMotionStore.emitChange();
				break;
			case Constants.ActionTypes.ADD_VIDEO_SRC:
				_data = _data.set('src', action.src);
				WebcamMotionStore.emitChange();
				break;
			case Constants.ActionTypes.CAPTURE:
				//_data.capture = true;
				WebcamMotionStore.emitChange();
				break;
		}
	})
});
export default WebcamMotionStore;