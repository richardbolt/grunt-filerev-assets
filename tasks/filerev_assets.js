/*
 * grunt-filerev-assets
 * https://github.com/richardbolt/grunt-filerev-assets
 *
 * Copyright (c) 2013 Richard Bolt
 * Licensed under the MIT license.
 */

'use strict';

function stripPrefixFromObj(obj, options) {
  var assets = {};
  for (var _key in obj) {
    if (obj.hasOwnProperty(_key)) {
      var key = _key,
          value = obj[key];
      if (options.cwd) {
        if (key.substr(0, options.cwd.length) === options.cwd) {
            key = _key.substr(options.cwd.length);
        }
        if (obj[_key].substr(0, options.cwd.length) === options.cwd) {
          value = obj[_key].substr(options.cwd.length);
        }
      }
    assets[key] = value;
    }
  }
  return assets;
}

function addPrefixToObj(obj, options) {
  var assets = {};
  for (var _key in obj) {
    if (obj.hasOwnProperty(_key)) {
      var key = _key,
          value = obj[key];
      if (options.prefix) {
        value = options.prefix + value;
      }
    assets[key] = value;
    }
  }
  return assets;
}

function normalizePath(path) {
    // Swaps \ in path with /, to ensure consistent results for win/*nix
    while (path.indexOf('\\') > 0) {
        path = path.replace('\\', '/');
    }
    return path;
}

module.exports = function(grunt) {

  grunt.registerMultiTask('filerev_assets', 'Record asset paths from grunt-filerev to a json file', function() {
      var self = this, spaces = 0,
        options = self.options({
          dest: 'assets.json',  // Writes to this file.
          cwd: '',  // Removes cwd from the paths recorded.
          prefix: '',  // Prepends this value to all asset paths.
          prettyPrint: false
        });

      // We must have run filerev in some manner first.
      // If we do this: grunt.task.requires('filerev');
      // then if we ran filerev:action we will fail out,
      // when we don't want to. This just checks for the presence of the
      // grunt.filerev object and fails if it's not present.
      // You can override the warning with the --force command line option.
      if (!grunt.filerev) {
        grunt.fail.warn('Could not find grunt.filerev. Required task "filerev" must be run first.');
      }

      if (!options.dest || !grunt.filerev.summary) {
        grunt.log.error('No file saved.');
        grunt.log.error(options.dest, grunt.filerev.summary);
        return;
      }

      var assets = {};
      Object.keys(grunt.filerev.summary).forEach(function (key) {
        assets[normalizePath(key)] = normalizePath(grunt.filerev.summary[key]);
      });
      if (options.cwd) {
        assets = stripPrefixFromObj(assets, options);
      }
      if (options.prefix) {
        assets = addPrefixToObj(assets, options);
      }
      if (options.prettyPrint) {
        spaces = 4;
      }

      grunt.file.write(options.dest,
                       JSON.stringify(assets, null, spaces));

      grunt.filerevassets = assets;

      grunt.log.writeln('File', options.dest, 'created.');
  });

};
