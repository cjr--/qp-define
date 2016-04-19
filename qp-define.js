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

  global.module = global.module || _module;
  var define = global.define = function define(na, wrap) {
    wrap(
      function exports() {
        var args = __slice.call(arguments);
        var expo;
        if (args.length === 2) {
          expo = args[1];
        } else if (args.length === 3 && typeof args[1] === 'object' && typeof args[2] === 'function') {
          expo = args[2].call(null, args[0], args[1]);
        } else {
          expo = assign.apply(null, args.slice(1));
        }
        for (var key in expo) {
          if (source.hasOwnProperty(key)) expo[key] = expo[key].bind(expo);
        }
        _module.require.cache[args[0]] = expo;
      },
      function require(id) {
        return _module.require(id);
      },
      function make() {
        var id = arguments[0].ns || arguments[0];
        _module.require.cache[id] = define.make(id, arguments[1] || arguments[0]);
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

})(this);
