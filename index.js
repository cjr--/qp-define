var path = require('path');
var __slice = Array.prototype.slice;

var define = global.define = function define(_module, wrap) {
  wrap(
    function exports() {
      var args = __slice.call(arguments);
      var expo;
      if (args.length === 1) {
        expo = args[0];
      } else if (args.length === 2) {
        expo = args[1];
      } else if (args.length === 3 && typeof args[1] === 'object' && typeof args[2] === 'function') {
        expo = args[2].call(null, args[0], args[1]);
      } else {
        expo = assign.apply(null, args.slice(1));
      }
      Object.keys(expo).forEach(function(k, v) {
        if (typeof v === 'function') expo[k] = v.bind(expo);
      });
      _module.exports = expo;
    },
    function require(id) {
      return _module.require(parse_path(id));
    },
    function make() {
      _module.exports = define.make.apply(null, arguments);
    }
  );
};

define.path = function(id, pathname) {
  define.path[id] = path.normalize(parse_path(pathname));
};

define.path.local = path.dirname(require.main.filename);

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

function parse_path(id) {
  var parts = id.split('/');
  var define_path = define.path[parts[0]];
  if (define_path) {
    parts[0] = define_path;
    id = parts.join('/');
  }
  return id;
}

module.exports = define;
