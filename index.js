var path = require('path');

var define = global.define = function define(_module, wrap) {
  wrap(
    function define_exports(arg1, arg2) {
      if (arguments.length === 2) {
        arg2.ns = arg1;
        return _module.exports = arg2;
      } else {
        return _module.exports = arg1;
      }
    },
    function define_require(id, options) {
      if (options) {
        id = parse_path(id);
        var o = null;
        if (options.safe) {
          try { o = _module.require(id); } catch(_) { }
        } else {
          o = _module.require(id);
        }
        if (options.nocache) delete require.cache[require.resolve(id)];
        return o;
      } else {
        return _module.require(parse_path(id));
      }
    }
  );
};

define.path = function(id, pathname) { define.path[id] = path.normalize(parse_path(pathname)); };
define.path.local = path.dirname(require.main.filename);
define.path.root = process.cwd();

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
