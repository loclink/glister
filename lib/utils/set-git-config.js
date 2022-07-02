const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { program } = require('commander');
const reloadConfig = require('../config');
const { output } = require('./output');

const createKey = (config, keyName, email, callback) => {
  if (fs.existsSync(`${config.sshKeyDir}${keyName}`)) {
    output.error(`${program.messageInfo.createUser.alreadyExists} ${config.sshKeyDir}${keyName}`);
    process.exit();
  }
  shell.exec(`ssh-keygen -t rsa -q -P "" -f ${config.sshKeyDir}${keyName} -C ${email}`, { silent: false }, callback)
    .stdout;
};

// 执行切换用户操作
const useGlobalUser = async userInfo => {
  await shell.exec(`git config --global user.name "${userInfo.name}"`, { silent: false }).stdout;
  await shell.exec(`git config --global user.email "${userInfo.email}"`, { silent: false }).stdout;
  await reloadConfig();
};

const useLocalUser = async userInfo => {
  await shell.exec(`git config  user.name "${userInfo.name}"`, { silent: false }).stdout;
  await shell.exec(`git config  user.email "${userInfo.email}"`, { silent: false }).stdout;
  await reloadConfig();
};
module.exports = {
  createKey,
  useGlobalUser,
  useLocalUser
};
