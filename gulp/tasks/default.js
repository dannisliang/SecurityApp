/*
default.js
=============
This is the default gulp task, it handles building src and starting a local server
*/
var gulp  = require('gulp');
var gutil = require('gulp-util');

gulp.task('default', ['build', 'watch', 'server'], function() {
	gutil.log(gutil.colors.bgGreen('\n=============\nMUGSHOT NINJA\n============='));
});