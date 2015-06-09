import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import Core from '../Core';
import VideoStore from '../stores/VideoStore';
import MotionStore from '../stores/MotionStore';

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
		//if(Dispatcher.isDispatching()) { console.log('dispatching1'); return; }
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.CAPTURE
		});
	},
	addFrame: function(canvas) {
		//if(Dispatcher.isDispatching()) { console.log('dispatching'); return; }
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.ADD_FRAME,
			canvas: canvas
		});
	}
};
