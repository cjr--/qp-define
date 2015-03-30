#### server

`> npm install qp-define --save`

#### browser

`<script src="qp-define.min.js"></script>`

#### usage

- require `qp-define` to introduce a global `define` function.

- on the server `configure` keys for other locations which contain modules you want to use.

- `local` is predefined as `path.dirname(require.main.filename)`, this is only useful for files in a node based project which
won't be shared outside of the project. the `define.paths.local` reference is useful for referencing the local project whilst
keeping it externally available.

- on the client reference the files you need in the correct order. the references are used to namespace the exports inside an object literal

- `define` a module and call `exports` with the result.

- `require` works in the normal way with the addition of predefined paths. predefined paths are accessed by prefixing the path name, eg `var my_module = require('pathname/my_module')`


````
// ./main.js
var path = require('path');

define = require('qp-define');
define.path('project_a', define.paths.local);
define.path('user_modules', path.join(__dirname, '..', 'user_modules'));

define(module, function(exports, require) {

  var example0 = require('local/example0');
  var example1 = require('project_a/example1');
  var example2 = require('user_modules/example2');

  example0.run();
  example1.run();
  example2.run();

});

````
````
// ./example0.js
define(module, function(exports, require) {

  exports('example0', {

    run: function() {
      console.log('example0.run');
    }

  });

});
````
````
// ./example1.js
define(module, function(exports, require) {

  exports('project_a/example1', {

    run: function() {
      console.log('example1.run');
    }

  });

});
````
````
// ./../user_modules/example2/index.js
define(module, function(exports, require) {

  var path = require('path');

  exports('user_modules/example2', {

    run: function() {
      console.log('example2.run');
    }

  });

});
````
