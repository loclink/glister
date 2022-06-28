const os = require('os');
const fs = require('fs');
const path = require('path');
const ini = require('ini');

const homeDir = os.homedir();
const gitConfigPath = path.resolve(homeDir, '.gitconfig');
const gtrcPath = path.resolve(homeDir, '.gtrc');

const gtrcIsExist = fs.existsSync(gtrcPath)
const gtrcData =  gtrcIsExist ? ini.parse(fs.readFileSync(gtrcPath, 'utf-8').toString()) : {};
const gitconfigData = ini.parse(fs.readFileSync(gitConfigPath, 'utf-8').toString());
module.exports = {
  gitconfigData,
  gtrcData,
  gtrcIsExist,
  gtrcPath,
  gitConfigPath
};
