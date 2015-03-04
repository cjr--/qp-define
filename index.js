var path = require('path');
var __library = path.join(__dirname, '..', '..', 'library');

global.define = function define(_module, definition) {
  definition.call(global, function(id, exported) {
    _module.exports = exported;
  }, _module.require, function library(id) {
    return _module.require(path.join(__library, id));
  }, function project(id) {
    return _module.require.main.require('./' + id);
  });
};

global.define.configure = function(library_path) {
  __library = path.join(__dirname, library_path);
};
