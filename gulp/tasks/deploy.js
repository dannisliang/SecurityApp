/*
deploy.js
=========
This task uses run-sequence because it needs to run a few tasks in a specific order to work
Note: with next gulp version this type of functionality will be built in
*/

var gulp         = require('gulp');
var runSequence  = require('run-sequence');
var config       = require('../config');
var errorHandler = config.errorHandler;

gulp.task('deploy', function() {
	return runSequence('build', 'copy', 'usemin', 'rev', 'rsync', function(){
		// TODO: this process handgs after rsync for some reason without completion, not major, just annoying
	});
})