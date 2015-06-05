var gulp = require('gulp');
var clean = require('gulp-clean');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.clean;

gulp.task('clean', function() {
	for(var i=0, l=config.length; i<l; i++) {
		gulp.src(config[i], {read: false}).pipe(clean()).on('error',errorHandler);
	}
});
