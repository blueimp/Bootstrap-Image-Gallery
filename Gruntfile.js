/*
 * Bootstrap Image Gallery Gruntfile
 * https://github.com/blueimp/Bootstrap-Image-Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global module */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'js/bootstrap-image-gallery.js',
                'js/demo.js'
            ]
        },
        less: {
            production: {
                options: {
                    cleancss: true
                },
                src: [
                    'css/bootstrap-image-gallery.css'
                ],
                dest: 'css/bootstrap-image-gallery.min.css'
            }
        },
        uglify: {
            production: {
                src: [
                    'js/bootstrap-image-gallery.js'
                ],
                dest: 'js/bootstrap-image-gallery.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bump-build-git');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['test', 'less', 'uglify']);

};
