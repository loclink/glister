const fs = require('fs');
const path = require('path');
const ini = require('ini');
const { output } = require('./output');
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

// 查看公钥
const checkPublicKey = keyName => {
  const publicKey = fs.readFileSync(`${config.sshKeyDir}${keyName}.pub`).toString();
  output(publicKey);
};

// copy
const copyFile = async (src, dist) => {
  await fs.writeFileSync(dist, fs.readFileSync(src));
};

// 追加写入文件内容
const appendWriteFile = async (src, dist) => {
  const distContent = fs.readFileSync(dist).toString();
  const finalContent = distContent + '\n\n' + fs.readFileSync(src).toString();
  await fs.writeFileSync(dist, finalContent);
};

// 添加忽略配置文件
const createIgnoreTemplate = async tempType => {
  await copyFile(
    path.resolve(__dirname, `../template/${tempType}.ignore`),
    path.resolve(process.cwd(), `./.gitignore`)
  );
};

// 追加写入忽略配置文件
appendWriteGitignor = async tempType => {
  await appendWriteFile(
    path.resolve(__dirname, `../template/${tempType}.ignore`),
    path.resolve(process.cwd(), `./.gitignore`)
  );
};

module.exports = {
  writeGtrc,
  copyFile,
  switchLanguage,
  checkPublicKey,
  createIgnoreTemplate,
  appendWriteFile,
  appendWriteGitignor
};
