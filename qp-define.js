(function(global) {

  var _module = { };

  _module.exports = function(ns, _export) {
    if (arguments.length === 1) {
      _export = ns;
      ns = _export.ns;
    } else {
      _export.ns = ns;
    }
    return this.require.cache[ns] = _export;
  }.bind(_module);

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
      function exports(id, o) { return _module.require.cache[id] = o; },
      function require(id) { return _module.require(id); }
    );
  };

})(this);
