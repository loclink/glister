const fs = require('fs');
const shell = require('shelljs');
const config = require('../config');
const { output } = require('./output');
const createKey = (keyName, email, callback) => {
  if (fs.existsSync(`${config.sshKeyDir}${keyName}`)) {
    output.error(`${config.sshKeyDir}${keyName}` + config.languageConfig.addUserCommand.alreadyExists);
    process.exit();
  }
  shell.exec(`ssh-keygen -t rsa -q -P "" -f ${config.sshKeyDir}${keyName} -C ${email}`, { silent: false }, callback)
    .stdout;
};

// 查看公钥
const checkPublicKey = keyName => {
  const publicKey = fs.readFileSync(`${config.sshKeyDir}${keyName}.pub`).toString();
  output(publicKey);
};

const switchGitUser = async userInfo => {
  await shell.exec(`git config --global user.name "${userInfo.name}"`, { silent: false }).stdout;
  await shell.exec(`git config --global user.email "${userInfo.email}"`, { silent: false }).stdout;
};

module.exports = {
  createKey,
  checkPublicKey,
  switchGitUser
};
