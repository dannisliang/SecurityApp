/*
config.js
=============
Overall settings for all grunt tasks. You shouldn't have to edit anything in /tasks
unless it's to add functionality etc.
*/
var src    = './src',       // raw files to edit
	tmp    = './src/.tmp',  // temporary folder to hold things like compiled scss
	dist   = './dist',      // minified and concat files for deployment
	gutil  = require('gulp-util');

module.exports = {
	build: {
		src: src + '/**/*.*'
	},
	server: {
		settings: {
			root       : src,
			hostname   : 'local.securityapp.com',
			port       : 80,
			livereload : true,
			fallback   : src + '/index.html'
		}
	},
	sass: {
		src  : src + '/scss/**/*.scss',
		sass : src + '/scss',
		dest : tmp + '/css',
		compassConfig: '../.config.rb',		  // compass configuration file
		settings: {
			indentedSyntax : false,
			imagePath      : '/images'
		}
	},
	iconfont: {
		src: src + '/svg/*.svg',
		dest: src + '/webfonts',
		cssOptions: {
			fontName: 'mn-icon-font',
			targetPath: '../css/icons.css',
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
		dest       : tmp + '/js',
		outputName : 'index.js',
		debug      : gutil.env.type === 'dev'
	},
	watch: [
		{
			src   : src + '/js/**/*.*',
			tasks : ['browserify']
		},
		{
			src   : src + '/scss/**/*.scss',
			tasks : ['styles']
		},
		{
			src   : src + '/svg/**/*.*',
			tasks : ['iconfont']
		}
	],
	copy: [
		{src: src + '/.htaccess', dest: dist},
		{src: src + '/webfonts/**', dest: dist + '/webfonts'}
	],
	rev: {
		src: dist + '/**/*.{html,css,js,woff,woff2,eot,ttf}',
		dest: dist
	},
	deploy: {
		src  : src + '/**',
		dest : dist,
		usemin: {
			src: src + '/index.html',
			dest: dist
		},
		rsync: {
			destination : '/home/180199/domains/securityapp.justin-schrader.com/html',
			src         : [dist + '/**', dist + '/.htaccess'],
			root        : dist,
			hostname    : 's180199.gridserver.com',
			username    : 'justin-schrader.com',
			progress    : false  // handy for debugging what is being disted
		}
	},
	clean: [dist, tmp],
	errorHandler: function(error) {
		console.log(error.toString());
		this.emit('end');
	}
};