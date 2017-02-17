(function(global) {

  var _slice = Array.prototype.slice;
  var _module = { };

  _module.resolve = function(id) {
    return this.require.cache[id] ? id : null;
  }.bind(_module);

  _module.require = function(id) {
    return this.require.cache[id];
  }.bind(_module);

  _module.require.cache = { };

  global.module = global.module || _module;
  global.define = function define(na, wrap) {
    wrap(
      function exports() {
        var args = _slice.call(arguments);
        var _export;
        if (args.length === 1) {
          _export = args[0];
        } else if (args.length > 1) {
          _export = assign.apply(null, args);
        }
        if (_export) {
          _export = bind_all(_export);
          if (_export.init) _export.init();
          return global.module.require.cache[_export.ns] = _export;
        }
      },
      function require(id) { return global.module.require(id); },
      function make(o) { global.module.require.cache[o.ns] = global.define.make(o); }
    );
  };

  function assign() {
    var items = _slice.call(arguments).reverse();
    var target = items.pop();
    for (var i = 0, l = items.length; i < l; i++) {
      var source = items[i];
      for (var key in source) {
        if (source.hasOwnProperty(key)) target[key] = source[key];
      }
    }
    return target;
  }

  function bind_all(o) {
    for (var k in o) {
      if (typeof o[k] === 'function' && o.hasOwnProperty(k)) o[k] = o[k].bind(o);
    }
    return o;
  }

})(this);
