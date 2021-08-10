var path = require('path');
var fs = require('fs');
var uglify = require('uglify-js');
//var term = require('qp-library/term');

//term.set_title('qp-define - build');

fs.writeFileSync(
  path.join(__dirname, 'qp-define.min.js'),
  uglify.minify(fs.readFileSync(path.join(__dirname, 'qp-define.js'), 'utf8')).code
);
