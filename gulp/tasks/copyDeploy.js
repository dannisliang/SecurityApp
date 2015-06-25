/*
copyDeploy.js
=============
This handles copying of files from /local to /deploy (ex: .htaccess, index.html)
TODO: should figure out a way of getting rid of this task or combining with copyLocal
*/
var gulp = require('gulp');
var rev = require('gulp-rev');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.copyDeploy;

gulp.task('copyDeploy', function() {
	for(var i=0, l=config.length; i<l; i++) {
		gulp.src(config[i].src)
			.pipe(gulp.dest(config[i].dest))
			.on('error',errorHandler);
	}
});