(function(global) {

  var __slice = Array.prototype.slice;
  var _module = { };

  _module.resolve = function(id) {
    return this.require.cache[id] ? id : null;
  }.bind(_module);

  _module.require = function(id) {
    return this.require.cache[id];
  }.bind(_module);

  _module.require.cache = {};

  global.define = function define(na, wrap) {
    wrap(
      function exports(id) {
        var args = __slice.call(arguments);
        if (args.length === 2) {
          _module.require.cache[id] = args[1];
        } else if (args.length === 3 && typeof args[2] === 'object' && typeof args[2] === 'function') {
          _module.require.cache[id] = args[2].call(null, split_id(id).ns, args[1]);
        } else {
          _module.require.cache[id] = assign.apply(null, args.slice(1));
        }
      },
      function require(id) {
        return _module.require(id);
      }
    );
  };

  function assign() {
    var items = __slice.call(arguments).reverse();
    var target = items.pop();
    for (var i = 0, l = items.length; i < l; i++) {
      var source = items[i];
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }

  function split_id(id) {
    var idx = id.indexOf('::');
    var key, ns;
    if (idx > 0) {
      key = id.slice(0, idx);
      ns = id.slice(idx + 2);
    }
    return { id: id, ns: ns || id, key: key, dir: undefined, filename: undefined };
  }

})(this);
