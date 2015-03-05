var path = require('path');
var __slice = Array.prototype.slice;

var define = global.define = function define(_module, wrap) {
  wrap(
    function exports(id) {
      _module.exports = assign.apply(null, __slice.call(arguments).slice(1));
    },
    function require(id) {
      var idx = id.indexOf('::');
      if (idx > 0) {
        var dir = define.paths[id.slice(0, idx)];
        if (dir) {
          id = path.join(dir, id.slice(idx + 2));
        }
      }
      return _module.require(id);
    }
  );
};

define.paths = {
  project: __dirname
};

define.configure = function(config) {
  assign(define.paths, config.paths);
};

function assign() {
  var items = __slice.call(arguments).reverse();
  var target = items.pop();
  items.forEach(function(source) {
    Object.keys(source).forEach(function(key) {
      target[key] = source[key];
    });
  });
  return target;
}

module.exports = define;
