import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import Core from '../Core';

export default {
	toggleDebug: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.TOGGLE_DEBUG
		});
	},
	setFPS: function(fps) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.SET_FPS,
			fps: fps
		});
	}
};
