module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          "src/gesture-recognizer.js",
          "src/tap-recognizer.js"
        ],
        dest: 'dist/touch.js'
      }
    },
    watch: {
      files: "src/*.js",
      tasks: "dev"
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('dev', ['concat']);
  grunt.registerTask('default', ['concat']);
}
