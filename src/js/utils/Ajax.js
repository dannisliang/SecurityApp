/*
Core
====
This is a series of helper methods designed to be used by other components or actions
TODO: break these out into separate imports in a /utils folder
*/
export default function(url, opts) {
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
};