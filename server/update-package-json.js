'use strict';

const fs = require('fs');

let pkg = JSON.parse(fs.readFileSync('./package.json').toString());

pkg.main = 'app.min.js';

pkg.scripts = {
  'prestart': 'npm install --production',
  'start': 'node app.min.js',
  'dev-start': 'PORT=80 NODE_ENV=development node app.min.js',
};

fs.writeFileSync('package-build.json', JSON.stringify(pkg));