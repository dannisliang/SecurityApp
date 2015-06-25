/*
iconfont.js
========
This task takes svgs in src/svg and compiles them into a usable icon font & css
*/
var gulp = require('gulp');
var iconFontCss = require('gulp-iconfont-css');
var iconFont = require('gulp-iconfont');
var config = require('../config');
var errorHandler = config.errorHandler;
config = config.iconfont;

gulp.task('iconfont', function() {
	return gulp.src(config.src)
			.pipe(iconFontCss(config.cssOptions))
			.pipe(iconFont(config.fontOptions))
			.pipe(gulp.dest(config.dest))
			.on('error',errorHandler);
});
