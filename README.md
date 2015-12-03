[![npm license][licence-image]][licence-url]
[![npm version][npm-version-image]][npm-version-url]
[![dependency status][david-dm-image]][david-dm-url]
[![dev dependency status][david-dm-dev-image]][david-dm-dev-url]

#### server

`> npm install qp-define --save`

#### browser

`<script src="qp-define.min.js"></script>`

#### why?

- simple module system which works on both client and server
- leaves dependency management alone
- minimal additional syntax

#### usage

- `require('qp-define')` to introduce a global `define` function.
- `define` a module and call `exports` with the result.
- `require` core modules in the normal way.
- ensure modules are loaded in dependency order on the client.

#### optional

- on the server add keys for other locations which contain modules you want to use.
- `local` is predefined as `path.dirname(require.main.filename)`, this is only useful for files in a node based project which
won't be shared outside of the project. the `define.path.local` reference is useful for referencing the local project whilst
keeping it externally available.
- `require` works in the normal way with the addition of predefined paths. predefined paths are accessed by prefixing the path name, eg `var my_module = require('pathname/my_module')`

#### example

````
// ./main.js
var path = require('path');

define = require('qp-define');
define.path('project_a', define.path.local);
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
[licence-image]: https://img.shields.io/npm/l/qp-define.svg
[npm-version-image]: http://img.shields.io/npm/v/qp-define.svg
[david-dm-image]:https://img.shields.io/david/cjr--/qp-define.svg
[david-dm-dev-image]:https://img.shields.io/david/dev/cjr--/qp-define.svg

[licence-url]: https://github.com/cjr--/qp-define/blob/master/LICENSE
[npm-version-url]: https://npmjs.org/package/qp-define
[david-dm-url]:https://david-dm.org/cjr--/qp-define
[david-dm-dev-url]:https://david-dm.org/cjr--/qp-define#info=devDependencies
