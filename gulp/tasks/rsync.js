/*
rsync.js
=============
This task handles deployment of files in /deploy to the server
*/
var gulp = require('gulp');
var rsync = require('gulp-rsync');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.deploy.rsync;

gulp.task('rsync', function() {
	gulp.src(config.src)
		.pipe(rsync(config))
		.on('error',errorHandler);
});