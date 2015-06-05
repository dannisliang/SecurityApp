var gulp = require('gulp');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.watch;

gulp.task('watch', ['build'], function() {
  gulp.watch(config.src, config.tasks).on('error',errorHandler);
});
