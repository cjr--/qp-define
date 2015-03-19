#### `qp-define`

`define` modules which can be used by both client & server.

#### server

`> npm install qp-define --save`

#### browser

`<script src="qp-define.js"></script>`

#### usage

require `qp-define` to introduce a global `define` function.

on the server `configure` keys for other locations which contain modules you want to use.
````
define.configure({
  paths: {
    library: '/users/cjr--/github/qp-library'
  }
})
````

`define` a module and `exports` the result. `require` works in the normal way with the addition of predefined paths. predefined paths are accessed by prefixing with `keyname::moduleid`.
````
define(module, function(exports, require) {

  var fs = require('fs');
  var log = require('library::log');

  exports('my-module', {

    run: function() {
      log('running example');
      log('exists', fs.stat(define.path.library));
    }

  });

});
````
