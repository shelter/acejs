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
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false,
                    clearRequireCache: false,
                    require: './node_modules/blanket'
                },
                src: ['tests/**/*.js']
            },
            coverage: {
                options: {
                    reporter: 'travis-cov'
                },
                src: ['tests/**/*.js']
            }
        }
    });
    //load tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha-test');
    //register task
    grunt.registerTask('default', ['jshint', 'uglify']);
};
