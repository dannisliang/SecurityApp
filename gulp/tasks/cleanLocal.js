/*
clean.js
========
This task handles removal of /local and /deploy folders
TODO: automate this task into other workflows (ex: after deploy)
*/
var gulp = require('gulp');
var clean = require('gulp-clean');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.cleanLocal;

gulp.task('cleanLocal', function() {
	return gulp.src(config, {read: false}).pipe(clean()).on('error',errorHandler);
});
