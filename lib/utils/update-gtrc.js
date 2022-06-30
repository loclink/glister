const fs = require('fs');
const ini = require('ini');
const config = require('../config');

// 写入配置
const writeGtrc = async () => {
  await fs.writeFileSync(config.gtrcPath, ini.encode(config.gtrcData));
  // 重载gt配置
  config.reloadGtrc();
};

// 切换语言
const switchLanguage = lang => {
  switch (lang) {
    case 'English':
      config.gtrcData.config.lang = 'en';
      break;
    default:
      config.gtrcData.config.lang = 'zh';
      break;
  }
  writeGtrc();
};

// const writeGitConfig = (gitconfigInfo, callback) => {
//   fs.writeFileSync(config.gitConfigPath, ini.encode(gitconfigInfo), callback)
// }
// const writeGtrc

module.exports = {
  writeGtrc,
  switchLanguage
};
