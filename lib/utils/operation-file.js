const fs = require('fs');
const path = require('path');
const { output } = require('./output');

// 查看公钥
const checkPublicKey = (config, keyName) => {
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
const createGitIgnore = async (workPath, tempType) => {
  await copyFile(path.resolve(__dirname, `../template/${tempType}.ignore`), path.resolve(workPath, `./.gitignore`));
};

// 追加写入忽略配置文件
const appendWriteGitIgnore = async (workPath, tempType) => {
  await appendWriteFile(
    path.resolve(__dirname, `../template/${tempType}.ignore`),
    path.resolve(workPath, `./.gitignore`)
  );
};

module.exports = {
  copyFile,
  checkPublicKey,
  createGitIgnore,
  appendWriteFile,
  appendWriteGitIgnore
};
