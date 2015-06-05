var gulp = require('gulp');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.copyDeploy;

gulp.task('copyDeploy', function() {
	gulp.src(config.src).pipe(gulp.dest(config.dest)).on('error',errorHandler);
});