import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import Core from '../Core';

export default {
	toggleDebug: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.TOGGLE_DEBUG
		});
	},
	setSensitivity: function(number) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.SET_SENSITIVITY,
			number: number
		});
	},
	setFPS: function(number) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.SET_FPS,
			fps: number
		});
	},
	setPixelDensity: function(number) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.SET_PIXEL_DENSITY,
			pixelDensity: number
		});
	}
};
