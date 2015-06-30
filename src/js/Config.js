/*
	Config.js
	=========
	This file contains all DEFAULT store data params. These params should be
	considered immutable and you should not try to change them in the flow of the app.

	Example usage:
	let _data = MNConfig.storeName;
*/
// Export empty object so we can import this config file at the root of the app
export default {};
// Global variable so we can store all our default store data in 1 place
window.MNConfig = {
	/*
		Settings
		This object contains all default store data
	*/
	settings: {
		width              : window.innerWidth,
		height             : window.innerHeight,
		sensitivity        : 75,        // sensitivity used when comparing pixels (note: this is converted to 0-100% on FE to make the values more clear)
		fps                : 20,        // frames per second
		fpsInterval        : 55.555,    // 1000 / fps = fpsInterval (used to throttle RAF loop)
		motionZoneDensity  : 35,        // it is too CPU intensive to compare every pixel in frame, so instead we use this (ex: 640 / 10)
		activeZonesNeeded  : 10,
		imageCaptureSize   : {
			value  : 'normal',
			width  : 640,
			height : 480
		},
		imageCaptureSizes : [
			{
				value      : 'small',
				width      : 320,
				height     : 240
			},
			{
				value      : 'normal',
				width      : 640,
				height     : 480
			},
			{
				value      : 'large',
				width      : 800,
				height     : 600
			}
		]
	}
}