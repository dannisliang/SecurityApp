var gulp = require('gulp');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.copy;

gulp.task('copy', function() {
	for(var i=0, l=config.dest.length; i<l; i++) {
		gulp.src(config.src).pipe(gulp.dest(config.dest[i])).on('error',errorHandler);
	}
});
