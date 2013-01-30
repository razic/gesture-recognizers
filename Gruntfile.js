'use strict';

module.exports = function (grunt) {
  var build;
  var specFiles;
  var sourceFiles;
  var specAndSourceFiles;

  build = 'dist/touch.js';

  specFiles = [
    'spec/gesture-recognizer.js'
  ];

  sourceFiles = [
    'src/gesture-recognizer.js',
    'src/tap-recognizer.js',
    'src/pan-recognizer.js'
  ];

  specAndSourceFiles = specFiles.concat(sourceFiles);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: specAndSourceFiles,
      tasks: 'default'
    },
    concat: {
      dist: {
        src: sourceFiles,
        dest: build
      }
    },
    jshint: {
      beforeconcat: specAndSourceFiles,
      afterconcat: build
    },
    jasmine: {
      src: sourceFiles,
      options: {
        specs: specFiles
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['jshint:beforeconcat', 'jasmine', 'concat', 'jshint:afterconcat']);
}
