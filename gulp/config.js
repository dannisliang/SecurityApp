/*
config.js
=============
Overall settings for all grunt tasks. You shouldn't have to edit anything in /tasks
unless it's to add functionality etc.
*/
var src    = './src',       // raw files to edit
	local  = './local',     // local dev folder (compiled but not concat or minified)
	deploy = './deploy',    // minified and concat files for deploy
	gutil  = require('gulp-util');

module.exports = {
	server: {
		settings: {
			root     : local,
			host     : 'local.securityapp.com',
			port     : 8080,
			fallback : 'src/index.html',      // needed for html5 pushstate
			livereload: {
				port: 35929
			}
		}
	},
	sass: {
		src  : src + '/styles/**/*.{sass,scss,css}',
		sass : src + '/styles',
		dest : local + '/styles',
		compassConfig: '../.config.rb',		  // compass configuration file
		settings: {
			indentedSyntax : false,
			imagePath      : '/images'
		}
	},
	browserify: {
		settings: {
			transform: ['babelify', 'reactify']
		},
		src        : src + '/js/index.jsx',
		dest       : local + '/js',
		outputName : 'index.js',
		debug      : gutil.env.type === 'dev'
	},
	watch: {
		src   : 'src/**/*.*',
		tasks : ['build']
	},
	copyLocal: {
		src: [
			src + '/.htaccess',
			src + '/index.html'
		],
		dest: local
	},
	copyDeploy: {
		src: [
			src + '/.htaccess'
		],
		dest: deploy
	},
	deploy: {
		src  : src + '/**',
		dest : deploy,
		usemin: {
			src: local + '/index.html',
			dest: deploy
		},
		rsync: {
			destination : '/home/180199/domains/securityapp.justin-schrader.com/html',
			src         : [deploy + '/**', deploy + '/.htaccess'],
			root        : deploy,
			hostname    : 's180199.gridserver.com',
			username    : 'justin-schrader.com',
			progress    : false  // handy for debugging what is being deployed
		}
	},
	clean: deploy,
	errorHandler: function(error) {
		console.log(error.toString());
		this.emit('end');
	}
};