/*global module, require */
var fs = require('fs');

module.exports = (function() {
  'use strict';
  var matchByRegex = function(regex) {
    return function(itemToFilter) {
      return itemToFilter.match(regex);
    };
  };

  var createFileObject = function(filerevObject) {
    var files = [],
        jsFiles,
        cssFiles;
    for (var key in filerevObject) {
      if (filerevObject.hasOwnProperty(key)) {
        files.push(filerevObject[key]);
      }
    }
    return {
      js: files.filter(matchByRegex(/\.js$/)),
      css: files.filter(matchByRegex(/\.css$/)),
    };
  };

  var writeYmlString = function(filesObject) {
    var ymlString = '';
    var writeFileLine = function(file) {
      ymlString = ymlString + '  - "' + file + '"\n';
    };
    ymlString = ymlString + '---' + '\n';

    for (var fileTypeKey in filesObject) {
      if (filesObject.hasOwnProperty(fileTypeKey)) {
        ymlString = ymlString + fileTypeKey + ':\n';
        filesObject[fileTypeKey].forEach(writeFileLine);
      }
    }
    return ymlString;

  };
  var createYmlFile = function(filerevObject) {
    var filesObject = createFileObject(filerevObject);
    return writeYmlString(filesObject);
  };
  return createYmlFile;
}());
