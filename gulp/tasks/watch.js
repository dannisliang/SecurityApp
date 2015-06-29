/*
watch.js
=============
This task handles watching for file changes to compile on the fly when developing locally
*/
var gulp = require('gulp');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.watch;

gulp.task('watch', ['build'], function() {
	for(var i=0, l=config.length; i<l; i++) {
		gulp.watch(config[i].src, config[i].tasks)
			.on('error', errorHandler);
	}
});
