var path = require('path');
var _slice = Array.prototype.slice;

var define = global.define = function define(_module, wrap) {
  wrap(
    function exports() {
      var args = _slice.call(arguments);
      var _export;
      if (args.length === 1) {
        _export = args[0];
      } else if (args.length > 1) {
        _export = assign.apply(null, args);
      }
      if (_export) return _module.exports = bind_all(_export);
    },
    function require(id) { return _module.require(parse_path(id)); },
    function make() { _module.exports = define.make.apply(null, arguments); }
  );
};

define.path = function(id, pathname) { define.path[id] = path.normalize(parse_path(pathname)); };
define.path.local = path.dirname(require.main.filename);

function assign() {
  var items = _slice.call(arguments).reverse();
  var target = items.pop();
  items.forEach(function(source) {
    Object.keys(source).forEach(function(key) {
      target[key] = source[key];
    });
  });
  return target;
}

function bind_all(o) {
  Object.keys(o).forEach(k => {
    if (typeof o[k] === 'function') o[k] = o[k].bind(o);
  });
  return o;
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
