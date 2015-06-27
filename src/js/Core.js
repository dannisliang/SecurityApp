/*
Core
====
This is a series of helper methods designed to be used by other components or actions
*/
import assign from 'object-assign';
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
	},
	ajax: function(url, opts) {
		let defaults = {
			method: 'GET',
			successCallback: null,
			errorCallback: function(request) { console.warn('Core.ajax: api error '); console.log(request); },
			data: null
		};
		let options = assign({}, defaults, opts),
			xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.readyState === 4) {
				if(xmlHttp.status === 200) {
					if(options.successCallback) { options.successCallback(xmlHttp); }
				} else {
					if(options.errorCallback) { options.errorCallback(xmlHttp); }
				}
			}
		};
		xmlHttp.open(options.method, url, true);
		if(options.data) {
			xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			console.log(this.objectToQueryString(options.data));
			xmlHttp.send(this.objectToQueryString(options.data));
		} else {
			xmlHttp.send();
		}
	},
	// This method is from: http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
	objectToQueryString: function(object, prefix) {
		var str = [];
		for(var p in object) {
			if (object.hasOwnProperty(p)) {
				var k = prefix ? prefix + "[" + p + "]" : p, v = object[p];
				str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
			}
		}
		return str.join("&");
	}
}