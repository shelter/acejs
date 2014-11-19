/**
 * grunt configuration
 */

module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            src: ['src/*.js']
        },
        uglify: {
            default: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.js',
                    dest: 'dist'
                }]
            }
        }
    });
    //load tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //register task
    grunt.registerTask('default', ['jshint', 'uglify']);
};
