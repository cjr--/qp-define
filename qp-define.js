(function(global) {

  var _module = { };

  _module.resolve = function(id) {
    return id;
  }.bind(_module);

  _module.require = function(id) {
    return this.require.cache[id];
  }.bind(_module);

  _module.require.cache = {};

  global.define = function define(na, definition) {
    definition.call(global, function(id, exported) {
      _module.require.cache[id] = exported;
    }, _module.require, _module.require, _module.require);
  };

})(this);
