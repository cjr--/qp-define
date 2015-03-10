#### server

`> npm install qp-define --save`

#### browser

`<script src="qp-define.js"></script>`

#### usage

require `qp-define` to introduce a global `define` function.

````
define(module, function(exports, require) {

  var another_module = require('another');

  exports('my-module', {

  });

});
````
