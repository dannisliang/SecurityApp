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
			base     : local,
			hostname : 'local.securityapp.com',
			port     : 80,
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
	iconfont: {
		src: src + '/svgs/*.svg',
		dest: local + '/webfonts',
		cssOptions: {
			fontName: 'mn-icon-font',
			targetPath: '../styles/icons.css',
			fontPath: '../webfonts/'
		},
		fontOptions: {
			fontName: 'mn-icon-font',
			appendUnicode: true,
			normalize: true
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
	copyLocal: [
		{src: [src + '/.htaccess', src + '/*.html'], dest: local}
	],
	copyDeploy: [
		{src: src + '/.htaccess', dest: deploy},
		{src: local + '/webfonts/**', dest: deploy + '/webfonts'}
	],
	rev: {
		src: deploy + '/**/*.{html,css,js,woff,woff2,eot,ttf}',
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
	clean: [deploy],
	cleanLocal: [local],
	errorHandler: function(error) {
		console.log(error.toString());
		this.emit('end');
	}
};