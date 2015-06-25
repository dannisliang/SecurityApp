/*
build.js
========
This task handles compiling assets in /src to /local for local dev testing & debugging
*/
var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.watch;

gulp.task('build', ['browserify', 'iconfont', 'styles', 'copyLocal'], function() {
	gulp.src(config.src)
		.pipe(connect.reload())
		.on('error',errorHandler);
});
