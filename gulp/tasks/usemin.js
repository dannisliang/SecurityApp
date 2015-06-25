/*
usemin.js
=========
This task handles minifying and concatenating all js, css, and html to the deploy folder
*/

var gulp         = require('gulp');
var config       = require('../config');
var usemin       = require('gulp-usemin');
var minifyCSS    = require('gulp-minify-css');
var minifyHTML   = require('gulp-minify-html');
var uglify       = require('gulp-uglify');
var errorHandler = config.errorHandler;
config = config.deploy.usemin;

gulp.task('usemin', function() {
	return gulp.src(config.src)
		.pipe(usemin({
			css  : [minifyCSS(), 'concat'],
			js   : [uglify()],
			html : [minifyHTML()]
		}))
		.pipe(gulp.dest(config.dest))
		.on('error',errorHandler);
});