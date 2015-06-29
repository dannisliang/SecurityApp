/*
copy.js
=============
This handles copying of files from /src to /dist (ex: .htaccess, index.html)
*/
var gulp = require('gulp');
var rev = require('gulp-rev');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.copy;

gulp.task('copy', function() {
	for(var i=0, l=config.length; i<l; i++) {
		gulp.src(config[i].src)
			.pipe(gulp.dest(config[i].dest))
			.on('error',errorHandler);
	}
});