var path = require('path');
var __slice = Array.prototype.slice;

var define = global.define = function define(_module, wrap) {
  wrap(
    function exports(id) {
      var args = __slice.call(arguments);
      if (args.length === 2) {
        _module.exports = args[1];
      } else if (args.length === 3 && typeof args[2] === 'object' && typeof args[2] === 'function') {
        _module.exports = args[2].call(null, split_id(id).ns, args[1]);
      } else {
        _module.exports = assign.apply(null, args.slice(1));
      }
    },
    function require(id) {
      return _module.require(split_id(id).filename || id);
    }
  );
};

define.paths = {
  project: path.dirname(require.main.filename)
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

function split_id(id) {
  var idx = id.indexOf('::');
  var key, dir, ns, filename;
  if (idx > 0) {
    key = id.slice(0, idx);
    ns = id.slice(idx + 2);
    dir = define.paths[key];
    if (dir) {
      filename = path.join(dir, ns);
    }
  }
  return { id: id, ns: ns || id, key: key, dir: dir, filename: filename };
}

module.exports = define;
