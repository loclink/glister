const os = require('os');
const fs = require('fs');
const path = require('path');
const ini = require('ini');
const languageConfig = require('./lang');

// 属主目录
const homeDir = os.homedir();
// .gitconfig目录
const gitConfigPath = path.resolve(homeDir, '.gitconfig');
// .gtrc目录
const gtrcPath = path.resolve(homeDir, '.gtrc');

// 全局配置
const config = {
  homeDir,
  gitConfigPath,
  gtrcPath,
  gtrcData: {
    config: {},
    userGroup: {}
  },
  gitconfigData: {},
  languageConfig: {}
};

// 重载gtrc
config.reloadGtrc = function () {
  const gtrcData = fs.existsSync(this.gtrcPath) ? ini.parse(fs.readFileSync(this.gtrcPath, 'utf-8').toString()) : {};
  this.gtrcData = { ...this.gtrcData, ...gtrcData };
};

// 重载gitconfig
config.reloadGitConfig = function () {
  this.gitconfigData = ini.parse(fs.readFileSync(this.gitConfigPath, 'utf-8').toString());
};

config.reloadAllUserData = function () {
  this.allUserData = [
    { group: 'global', name: config.gitconfigData.user.name, email: config.gitconfigData.user.email }
  ];
};
// 动态加载语言
Object.defineProperty(config, 'languageConfig', {
  get() {
    return languageConfig[this.gtrcData?.config?.lang ?? 'en'];
  }
});

// 载入git相关文件配置
config.reloadGtrc();
config.reloadGitConfig();
config.reloadAllUserData();
console.log(config)
module.exports = config;
