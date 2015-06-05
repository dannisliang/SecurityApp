var gulp = require('gulp');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.html;

gulp.task('html', function() {
  return gulp.src(config.src).pipe(gulp.dest(config.dest)).on('error',errorHandler);
});
