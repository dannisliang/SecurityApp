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
	},
	addFrame: function(canvas) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.ADD_FRAME,
			canvas: canvas
		});
	},
	onRAF: function() {
		var that = this,
			raf = (function(){
				return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60); };
			})(),
			renderRAF = function() {
				if(!Dispatcher.isDispatching()) {  // react blocks circular dispatching. Since RAF fires so fast all the time we need to check that the dispatcher isn't busy before sending out another frame.
					Dispatcher.handleViewAction({
						type: Constants.ActionTypes.RAF
					});
				}
				raf(renderRAF);
			};
		renderRAF();
	},
};
