/*
styles.js
=========
This task handles compiling of scss files to css via compass (http://compass-style.org)
*/
var gulp    = require('gulp');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var config  = require('../config');
var errorHandler = config.errorHandler;
config = config.sass;

gulp.task('styles', function() {
	gulp.src(config.src)
		.pipe(compass({
			sass: config.sass,
			css: config.dest
		}))
		.on('error',errorHandler)
		.pipe(gulp.dest(config.dest))
		.on('error',errorHandler)
		.pipe(connect.reload())
		.on('error',errorHandler)
});
