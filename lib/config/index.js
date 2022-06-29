const os = require('os');
const fs = require('fs');
const path = require('path');
const ini = require('ini');
const languageConfig = require('./lang');

// 属主目录
const homeDir = os.homedir();
// .ssh 目录
const sshKeyDir = path.resolve(homeDir, '.ssh/id_rsa_');
// .gitconfig目录
const gitConfigPath = path.resolve(homeDir, '.gitconfig');
// .glisterrc
const gtrcPath = path.resolve(homeDir, '.glisterrc');

// 全局配置
const config = {
  homeDir,
  sshKeyDir,
  gitConfigPath,
  gtrcPath,
  gtrcData: {
    config: {
      lastCheckVersionTime: '',
      checkUpdateCycle: 3,
      lang: 'en'
    },
    userGroup: {}
  },
  gitconfigData: {},
  languageConfig: {},
  allUserList: []
};

// 重载gtrc
config.reloadGtrc = function () {
  const gtrcData = fs.existsSync(this.gtrcPath) ? ini.parse(fs.readFileSync(this.gtrcPath, 'utf-8').toString()) : {};
  const gtConfig = Object.assign(this.gtrcData.config, gtrcData.config);
  this.gtrcData = Object.assign(this.gtrcData, gtrcData);
  this.gtrcData.config = gtConfig;
};

// 重载gitconfig
config.reloadGitConfig = function () {
  this.gitconfigData = ini.parse(fs.readFileSync(this.gitConfigPath, 'utf-8').toString());
};

// 重载全部用户列表
config.reloadAllUserList = function () {
  this.gtrcUserGroupList = Object.keys(this.gtrcData.userGroup).map(item => ({
    group: item,
    name: this.gtrcData.userGroup[item].name,
    email: this.gtrcData.userGroup[item].email
  }));
  this.allUserList = [
    { group: 'global', name: config.gitconfigData.user.name, email: config.gitconfigData.user.email },
    ...this.gtrcUserGroupList
  ];
};

// 动态加载语言
Object.defineProperty(config, 'languageConfig', {
  get() {
    return languageConfig[this.gtrcData?.config?.lang];
  }
});

// 载入glister配置文件
config.reloadGtrc();
// 载入git配置文件
config.reloadGitConfig();
// 载入全部用户列表
config.reloadAllUserList();

console.log(config);
module.exports = config;
