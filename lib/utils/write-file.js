const fs = require('fs');
const ini = require('ini');
const config = require('../config');

const writeGtrc = () => {
  fs.writeFileSync(config.gtrcPath, ini.encode(config.gtrcData), err => {
    throw err;
  });
  config.reloadGtrc();
};

// const writeGitConfig = (gitconfigInfo, callback) => {
//   fs.writeFileSync(config.gitConfigPath, ini.encode(gitconfigInfo), callback)
// }
// const writeGtrc

module.exports = {
  writeGtrc
};
