var path = require('path');
var fs = require('fs');
var uglify = require('uglify-js');

fs.writeFileSync(
  path.join(__dirname, 'qp-define.min.js'),
  uglify.minify(fs.readFileSync(path.join(__dirname, 'qp-define.js'), 'utf8')).code
);
