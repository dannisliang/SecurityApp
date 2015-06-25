/*
rev.js
=============
This handles copying of files from /local to /deploy (ex: .htaccess, index.html)
TODO: should figure out a way of getting rid of this task or combining with copyLocal
*/
var gulp = require('gulp');
var Rev = require('gulp-rev-all');
var config = require('../config');
var clean = require('gulp-clean');
var errorHandler = config.errorHandler;
config = config.rev;

gulp.task('rev', function() {
	console.log(config);
	var rev = new Rev({dontRenameFile: [/^\/index.html/g]});
	return gulp.src(config.src)
			.pipe(clean())
			.pipe(rev.revision())
			.pipe(gulp.dest(config.dest))
			.on('error',errorHandler);
});