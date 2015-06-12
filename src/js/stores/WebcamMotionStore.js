import { OrderedMap } from 'immutable';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

let fps = 5;
let fpsInterval = 1000/fps;

// data storage
let _data = OrderedMap({
	debug: false,
	fps: fps,
	fpsInterval: fpsInterval
});

const WebcamMotionStore = assign({}, BaseStore, {
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
					WebcamMotionStore.emitChange();
				}
				break;
			case Constants.ActionTypes.ADD_VIDEO_SRC:
				_data = _data.set('src', action.src);
				WebcamMotionStore.emitChange();
				break;
			case Constants.ActionTypes.CAPTURE_FRAME:
				_data = _data.merge({
					previousFrame: _data.get('currentFrame'),
					currentFrame: action.canvas
				});
				WebcamMotionStore.emitChange();
				break;
		}
	})
});
export default WebcamMotionStore;