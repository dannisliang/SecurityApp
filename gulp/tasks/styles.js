var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.sass;

gulp.task('styles', function() {
  gulp.src(config.src)
    .pipe(sass(config.settings)).on('error',errorHandler)
    .pipe(gulp.dest(config.dest)).on('error',errorHandler)
    .pipe(connect.reload()).on('error',errorHandler);
});
