module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          "src/gesture-recognizer.js",
          "src/tap-recognizer.js",
          "src/pan-recognizer.js"
        ],
        dest: 'dist/touch.js'
      }
    },
    watch: {
      files: "src/*.js",
      tasks: "dev"
    },
    jshint: {
      beforeconcat: "src/*.js",
      afterconcat: 'dist/touch.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('dev', ['jshint:beforeconcat', 'concat', 'jshint:afterconcat']);
  grunt.registerTask('default', ['concat']);
}
