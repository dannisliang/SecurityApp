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
      fallback : 'src/index.html',  // needed for html5 pushstate
      livereload: {
        port: 35929
      }
    }
  },
  sass: {
    src  : src + '/styles/**/*.{sass,scss,css}',
    dest : local + '/styles',
    settings: {
      indentedSyntax : false, // Enable .sass syntax?
      imagePath      : '/images' // Used by the image-url helper
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
  html: {
    src  : 'src/index.html',
    dest : local
  },
  watch: {
    src   : 'src/**/*.*',
    tasks : ['build']
  },
  copyLocal: [
    {src: src + '/.htaccess', dest: local}
  ],
  copyDeploy: [
    {src: src + '/.htaccess', dest: deploy},
    {src: local + '/index.html', dest: deploy}
  ],
  deploy: {
    src  : src + '/**',
    dest : deploy,
    uglify: {
      src  : local + '/js/**',
      dest : deploy + '/js'
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
