module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      compileJoined: {
        options: {
          join: true
        },
        files: {
          'dist/rsc-prin-tester.js': 'lib/**/**.coffee'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.registerTask('default', ['coffee']);
};
