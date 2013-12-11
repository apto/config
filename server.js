var Path = require('path');
var uuid64 = require('uuid64');

if (!process.env.NODE_CONFIG_DIR) {
  process.env.NODE_CONFIG_DIR = Path.join(__dirname, '../../server/config/env');
}

var ebEnv = require('eb-env');

if (!ebEnv.name) {
  var packageFile = Path.join(__dirname, '../../package.json');
  var packageName = 'unknown';
  try {
    var pkg = require(packageFile);
    packageName = pkg.name;
  } catch (e) {
    // will use default name
  }
  ebEnv.name = packageName + '-local-env';
}

var envRegEx = /-([^-]+)-env/;
var match = envRegEx.exec(ebEnv.name);
var envType = match[1] || 'local';
process.env.NODE_ENV = envType;

var config = require('config');

config.env = {
  name: ebEnv.name,
  type: envType,
  app: ebEnv.app || {
    sourceId: uuid64()
  }
};

module.exports = config;