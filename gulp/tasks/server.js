var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.server;

gulp.task('server', function() {
  connect.server(config.settings);
});
