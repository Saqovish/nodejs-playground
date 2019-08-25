const nconf = require('nconf');
const path = require('path');

const PATH_TO_CONFIG_FILE = path.join(path.resolve(__dirname, './nconf/config.json'));

nconf
    .argv()
    .env()
    .file({ file: PATH_TO_CONFIG_FILE });

console.log(nconf.get('port'));

nconf.set('IS_PROD', nconf.get('NODE_ENV') === 'production')
nconf.set('IS_DEV', nconf.get('NODE_ENV') === 'development' || typeof nconf.get('NODE_ENV') === 'undefined')
nconf.set('IS_TEST', nconf.get('NODE_ENV') === 'test')

console.log("is production:", nconf.get('IS_PROD'))
console.log("is development:", nconf.get('IS_DEV'))
console.log("is test:", nconf.get('IS_TEST'))