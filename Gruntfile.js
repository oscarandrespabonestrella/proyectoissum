
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %>, <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'public/js/app.js',
        dest: 'public/js/app.min.js'
      }
    },
    jshint: {
      options: {
        browser: true,
        globals: {
          jQuery: true
        }
      },
      all: {
        files: {
          src: ['public/js/src/**/*.js']
        }
      }
    },
    concat: {
      options: {
      },
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'js/src/app.js',
          'js/src/controllers/SiteController.js',
        ],
        dest: 'js/app.js'
      }
    },
    less: {
      development: {
        options: {
          paths: ['less'],
          yuicompress: false
        },
        files: {
          'public/css/app.css':'less/index.less'
        }
      }
    },
    cssmin: {
      compress: {
        files: {
          'public/css/app.min.css': ['css/app.css']
        }
      }
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js','js/src/**/*.js','js/vendor/**/*.js'],
        tasks: ['jshint','concat','uglify'],
        options: {
          debounceDelay: 250
        }
      },
      less: {
        files: 'less/**/*.less',
        tasks: ['less','cssmin'],
        options: {
          debounceDelay: 250
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['jshint','concat','uglify','less','cssmin','watch']);

};

/* EOF */