var Path = require('path');

if (!process.env.NODE_CONFIG_DIR) {
  process.env.NODE_CONFIG_DIR = Path.join(__dirname, 'server/config/env');
}

var ebEnv = require('eb-env');

if (!ebEnv.name) {
  var packageFile = Path.join(__dirname, '../../package.json');
  var packageName = 'unknown';
  try {
    packageName = packageFile.name;
  } catch (e) {
    // will use default name
  }
  ebEnv.name = packageName + '-local-env';
}

var envRegEx = /-([^-]+)-env/;
var match = envRegEx.exec(ebEnv.name);
process.env.NODE_ENV = match[1];

module.exports = require('config');