module.exports = function (grunt) {
  'use strict';

  var specFiles;
  var sourceFiles;

  specFiles = "spec/*-spec.js"

  sourceFiles = [
    'src/tap.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: sourceFiles.concat(specFiles),
      tasks: 'default'
    },
    jshint: {
      specs: {
        options: {
          undef: true,
          multistr: true,
          globals: {
            gestureRecognizers: false,
            document: false,
            console: false,
            it: false,
            expect: false,
            xit: false,
            describe: false,
            xdescribe: false,
            beforeEach: false,
            afterEach: false,
            spyOn: false,
            GestureRecognizer: false,
            PanGestureRecognizer: false,
            Timecop: false
          }
        },
        files: {
          src: specFiles
        }
      },
      src: {
        options: {
          undef: true,
          globals: {
            exports: false,
            console: false,
            GestureRecognizer: false,
            PanGestureRecognizer: false
          }
        },
        files: {
          src: sourceFiles
        }
      }
    },
    jasmine: {
      src: 'gesture-recognizers.js',
      options: {
        vendor: 'vendor/*.js',
        specs: specFiles
      }
    },
    uglify: {
      options: {
        wrap: 'gestureRecognizers',
        mangle: false
      },
      myTarget: {
        files: {
          'gesture-recognizers.js': sourceFiles
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default',
    [
      'jshint:specs',
      'jshint:src',
      'uglify',
      'jasmine:src:build'
    ]
  );
}
