var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('deploy', function() {
	runSequence('build', 'rsync');
});