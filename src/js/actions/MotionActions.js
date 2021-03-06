import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import GetWebcamSrc from '../utils/GetWebcamSrc';

export default {
	addVideoSrc: function() {
		// TODO: this should be handled in store not action
		var that = this,
			onSuccess = function(videoSrc) {
				Dispatcher.handleViewAction({
					type: Constants.ActionTypes.ADD_VIDEO_SRC,
					src: videoSrc
				});
			},
			onError = function() {
				Dispatcher.handleViewAction({
					type: Constants.ActionTypes.ADD_VIDEO_SRC_ERROR
				});
			};
		GetWebcamSrc(onSuccess, onError);
	},
	play: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.PLAY
		});
	},
	onRAF: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.RAF
		});
	},
	captureFrame: function(canvas) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.CAPTURE_FRAME,
			canvas: canvas
		});
	},
	motionZone: function(object) {  // expects {top, left, width, height}
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.MOTION_ZONE,
			motionZone: object
		});
	},
	setMotionDetected: function(boolean) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.MOTION_DETECTED,
			boolean: boolean
		});
	},
	videoResize: function(array) {   // expects [width, height]
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.VIDEO_RESIZE,
			array: array
		});
	},
	setMotionZones: function(array) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.MOTION_ZONES,
			array: array
		});
	},
	debugToggleEffects: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.DEBUG_TOGGLE_EFFECTS
		});
	}
};
