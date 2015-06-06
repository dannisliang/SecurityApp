/*
default.js
=============
This is the default gulp task, it handles building src and starting a local server
*/
var gulp = require('gulp');

gulp.task('default', ['build', 'watch', 'server']);