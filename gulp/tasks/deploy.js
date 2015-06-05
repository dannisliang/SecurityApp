var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('deploy', function() {
	return runSequence('build', 'copyDeploy', 'uglify', 'rsync', function(){
		// TODO: this process handgs after rsync for some reason
	});
});