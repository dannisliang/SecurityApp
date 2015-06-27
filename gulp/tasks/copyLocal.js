/*
copyDeploy.js
=============
This handles copying of files from /src to /local (ex: .htaccess, index.html)
TODO: should figure out a way of getting rid of this task or combining with copyDeploy
*/
var gulp = require('gulp');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.copyLocal;

gulp.task('copyLocal', function() {
	for(var i=0, l=config.length; i<l; i++) {
		gulp.src(config[i].src)
			.pipe(gulp.dest(config[i].dest))
			.on('error',errorHandler);
	}
});
