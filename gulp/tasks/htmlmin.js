var gulp = require('gulp');
var config = require('../config');
var htmlmin = require('gulp-minify-html');
var errorHandler = config.errorHandler;
config = config.deploy.htmlmin;

gulp.task('htmlmin', function() {
  return gulp.src(config.src).pipe(htmlmin(config)).pipe(gulp.dest(config.dest)).on('error',errorHandler);
});
