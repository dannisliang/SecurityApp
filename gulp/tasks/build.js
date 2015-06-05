var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.watch;

gulp.task('build', ['browserify', 'styles', 'copyLocal'], function() {
  gulp.src(config.src).pipe(connect.reload()).on('error',errorHandler);
});
