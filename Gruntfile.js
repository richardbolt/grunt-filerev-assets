/*
 * grunt-filerev-assets
 * https://github.com/rbolt/grunt-filerev-assets
 *
 * Copyright (c) 2013 Richard Bolt
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    filerev_assets: {
      default_options: {
        options: {
          cwd: 'public/', // Prevents the `public/` prefix from being recorded.
          dest: 'tmp/assets.json',
          prefix: '/static/'
        }
      },
      prettyPrint: {
        options: {
          cwd: 'public/', // Prevents the `public/` prefix from being recorded.
          dest: 'tmp/assets-pretty.json',
          prefix: '/static/',
          prettyPrint: true
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-filerev');

  // Load the fixtures into the object that filerev_assets expects.
  grunt.registerTask('filerev_setup', 'Mock grunt.filerev.summary', function(){
    grunt.filerev = grunt.file.readJSON('test/fixtures/test.json');
  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'filerev_setup', 'filerev_assets', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
