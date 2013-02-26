module.exports = function (grunt) {
  'use strict';

  var specFiles;
  var sourceFiles;

  specFiles = [
    'spec/gesture-recognizer.js',
    'spec/pan-gesture-recognizer.js',
    'spec/tap-gesture-recognizer.js'
  ];

  sourceFiles = [
    'src/gesture-recognizer.js',
    'src/pan-gesture-recognizer.js',
    'src/tap-gesture-recognizer.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: specFiles.concat(sourceFiles),
      tasks: 'default'
    },
    jshint: {
      specs: {
        options: {
          multistr: true,
          globals: {
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
          globals: {
            console: false
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
