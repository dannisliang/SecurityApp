import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import Core from '../Core';

export default {
	addVideoSrc: function() {
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
		Core.getWebcamSrc(onSuccess, onError);
	},
	onRAF: function(bool) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.RAF,
			raf: bool
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
	}
};
