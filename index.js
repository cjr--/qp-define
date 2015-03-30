var path = require('path');
var __slice = Array.prototype.slice;

var define = global.define = function define(_module, wrap) {
  wrap(
    function exports(id) {
      var args = __slice.call(arguments);
      if (args.length === 2) {
        _module.exports = args[1];
      } else if (args.length === 3 && typeof args[2] === 'object' && typeof args[2] === 'function') {
        _module.exports = args[2].call(null, id, args[1]);
      } else {
        _module.exports = assign.apply(null, args.slice(1));
      }
    },
    function require(id) {
      return _module.require(parse_path(id));
    }
  );
};

define.paths = {
  local: path.dirname(require.main.filename)
};

define.path = function(id, path) {
  define.paths[id] = parse_path(path);
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

function parse_path(id) {
  var parts = id.split('/');
  if (define.paths[parts[0]]) {
    parts[0] = define.paths[parts[0]];
    id = parts.join(path.sep);
  }
  return id;
}

module.exports = define;
