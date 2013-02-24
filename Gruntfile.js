module.exports = function (grunt) {
  'use strict';

  var buildFile;
  var specFiles;
  var sourceFiles;

  buildFile = 'gesture-recognizers.js';

  specFiles = [
    'spec/gesture-recognizer.js',
    'spec/pan-gesture-recognizer.js'
  ];

  sourceFiles = [
    'src/gesture-recognizer.js',
    'src/pan-gesture-recognizer.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: specFiles.concat(sourceFiles),
      tasks: 'default'
    },
    concat: {
      dist: {
        src: sourceFiles,
        dest: buildFile
      }
    },
    jshint: {
      specs: {
        options: {
          multistr: true,
          globals: {
            console: false,
            it: false,
            expect: false,
            xit: false,
            describe: false,
            xdescribe: false,
            beforeEach: false,
            afterEach: false,
            spyOn: false,
            document: false,
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
      },
      build: {
        options: {
          globals: {
            console: false
          }
        },
        files: {
          src: buildFile
        }
      }
    },
    jasmine: {
      src: sourceFiles,
      options: {
        vendor: 'vendor/*.js',
        specs: specFiles
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default',
    [
      'jshint:specs',
      'jshint:src',
      'jasmine:src:build',
      'concat',
      'jshint:build'
    ]
  );
}
