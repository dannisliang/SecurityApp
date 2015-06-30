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
	setSustained: function(number) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.SET_SUSTAINED,
			number: number
		});
	},
	setFPS: function(number) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.SET_FPS,
			fps: number
		});
	},
	setMotionZoneDensity: function(number) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.MOTION_ZONE_DENSITY,
			number: number
		});
	},
	setActiveZonesNeeded: function(number) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.ACTIVE_ZONES_NEEDED,
			number: number
		});
	},
	setImageCaptureSize: function(object) {
		Dispatcher.handleViewAction({
			type   : Constants.ActionTypes.SET_IMAGE_CAPTURE_SIZE,
			object : object
		});
	}
};
