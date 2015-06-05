var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.deploy.uglify;

gulp.task('uglify', function() {
	return gulp.src(config.src).pipe(uglify()).pipe(gulp.dest(config.dest)).on('error',errorHandler);
});
