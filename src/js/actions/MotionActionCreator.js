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
	startVideo: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.START_VIDEO
		});
	},
	startMotion: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.START_MOTION
		});
	},
	capture: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.CAPTURE
		});
	}
};
