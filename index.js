var path = require('path');
var __slice = Array.prototype.slice;

var define = global.define = function define(_module, wrap) {
  wrap(
    function exports() {
      var args = __slice.call(arguments);
      if (args.length === 2) {
        _module.exports = args[1];
      } else if (args.length === 3 && typeof args[1] === 'object' && typeof args[2] === 'function') {
        _module.exports = args[2].call(null, args[0], args[1]);
      } else {
        _module.exports = assign.apply(null, args.slice(1));
      }
    },
    function require(id) {
      return _module.require(parse_path(id));
    },
    function make() {
      _module.exports = define.make.apply(null, arguments);
    }
  );
};

define.path = function(id, path) {
  define.path[id] = parse_path(path);
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
