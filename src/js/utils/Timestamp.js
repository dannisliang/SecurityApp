/*
Core
====
This is a series of helper methods designed to be used by other components or actions
TODO: break these out into separate imports in a /utils folder
*/
export default function() {
	let now    = new Date(),
		date   = [now.getMonth() + 1, now.getDate(), now.getFullYear()],
		time   = [now.getHours(), now.getMinutes(), now.getSeconds()],
		suffix = ( time[0] < 12 ) ? "AM" : "PM";
	time[0] = (time[0] < 12) ? time[0] : time[0] - 12;
	time[0] = time[0] || 12;
	for(var i = 1; i<3; i++) {
		if (time[i] < 10 ) {
			time[i] = "0" + time[i];
		}
	}
	return date.join('_') + '-' + time.join(':') + '-' + suffix + '-' + now.getMilliseconds();
};