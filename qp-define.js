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
        _module.require.cache[id] = assign.apply(null, __slice.call(arguments).slice(1));
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

})(this);
