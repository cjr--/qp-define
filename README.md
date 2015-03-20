#### `qp-define`

#### server

`> npm install qp-define --save`

#### browser

`<script src="qp-define.js"></script>`

#### usage

require `qp-define` to introduce a global `define` function.

on the server `configure` keys for other locations which contain modules you want to use. `project` is predefined as `__dirname` but can be overridden. on the client reference the files you need in the correct order.

`define` a module and `exports` the result. `require` works in the normal way with the addition of predefined paths. predefined paths are accessed by prefixing with `keyname::moduleid`.
````
// ./main.js
var path = require('path');

define = require('qp-define');
define.configure({
  paths: {
    user: path.join(__dirname, '..', 'user_modules')
  }
});

define(module, function(exports, require) {

  var example = require('project::example');
  example.run();

});

````
````
// ./example.js
define(module, function(exports, require) {

  var os  = require('os');
  var log = require('qp-library/log');

  exports('example', {

    run: function() {
      log.clear();
      log('example:');
      log('memory:', os.totalmem());
      log.dir(define.paths);
    }

  });

});
````
