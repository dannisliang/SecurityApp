/*
copyDeploy.js
=============
This handles copying of files from /local to /deploy (ex: .htaccess, index.html)
TODO: should figure out a way of getting rid of this task or combining with copyLocal
*/
var gulp = require('gulp');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.copyDeploy;

gulp.task('copyDeploy', function() {
	gulp.src(config.src)
		.pipe(gulp.dest(config.dest))
		.on('error',errorHandler);
});