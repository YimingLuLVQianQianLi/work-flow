
const getConfig = require('commitlint-config-cz/lib/config').get;
// From a path.
const czConfig = getConfig('.cz-config.js');
const config = getConfig(czConfig);
module.exports = {
    extends: ["cz"]
}