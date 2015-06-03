/*
Core
====
This is a series of helper methods designed to be used by other components or actions
*/
export default {
	getWebcamSrc: function(successCallback, errorCallback) {
		var that = this, videoSrc;
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		if (navigator.getUserMedia) {
			navigator.getUserMedia({audio: true, video: true}, function(stream) {
				videoSrc = window.URL.createObjectURL(stream);
				if(successCallback) { successCallback(videoSrc); }
			}, function() {
				if(errorCallback) { errorCallback(); }
			});
		} else if(errorCallback) { errorCallback(); }
	}
}