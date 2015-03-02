### example 1
````
define(module, function(exports) {
  
  exports('my-module', {
    
  });
  
});
````

### example 2
````
define(module, function(exports, require, library) {
  
  var fs = require('fs');
  var qp = library('qp-library');
  
  exports('my-module', qp.make({

    mixin: ['events'],
    
    self: {
    
      properties: {
        // static properties
      },
      
      // static ctor
      init: function() { }
      
    },
    
    properties: {
      // instance properties
    },
    
    // instance ctor
    init: function(config) { }
  
  }));
  
});
````