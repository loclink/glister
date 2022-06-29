const inquirer = require('inquirer');
const config = require('../config');
const { switchLanguage } = require('../utils/update-gtrc');
const { addUser } = require('../utils/user-action');
const { verifyBackup } = require('../utils/verify');
const { output } = require('../utils/output');
const { createKey, checkPublicKey } = require('../utils/run-command');
const chalk = require('chalk');
const globalConf = config.gitconfigData.user;
const { switchLanguageCommand, listCommand, addUserCommand, backupCommand } = config.languageConfig;

// 切换语言操作
const switchLanguageAction = () => {
  const prompt = inquirer.createPromptModule();
  prompt({
    name: 'switchLanguage',
    type: 'list',
    message: switchLanguageCommand.inquirerIssue,
    choices: ['English', '简体中文']
  }).then(res => {
    switchLanguage(res.switchLanguage);
    output.succeed(config.languageConfig.switchLanguageCommand.actionSucceeded + res.switchLanguage);
  });
};

// 打印用户列表操作
const userListAction = () => {
  output.userTable(null, () => {
    output.succeed(listCommand.currentUserTips + `name:${globalConf.name} email:${globalConf.email}`);
    verifyBackup(listCommand.notBackup);
  });
};

// 添加用户操作
const addUserAction = async () => {
  const prompt = inquirer.createPromptModule();
  await prompt(
    addUserCommand.inquirerIssue.map((item, index) => ({ type: 'input', name: 'addUser_' + index, message: item }))
  ).then(async userInfo => {
    const groupIsExist = config.allUserList.find(item => item.group === userInfo.addUser_0);
    if (groupIsExist) {
      // 提问是否覆盖用户
      const result = await prompt({
        name: 'isCover',
        type: 'confirm',
        message: addUserCommand.groupIsExist + chalk.blue(groupIsExist.group),
        default: false,
        suffix:
          chalk.blue(`\nname:${groupIsExist.name}`) +
          ' | ' +
          chalk.blue(`email:${groupIsExist.email}\n`) +
          chalk.cyan(addUserCommand.groupIsExistSuffix)
      }).then(res => {
        return res.isCover;
      });
      if (!result) return;
    }
    addUser({
      [userInfo.addUser_0]: {
        name: userInfo.addUser_1,
        email: userInfo.addUser_2
      }
    });
    output.succeed(addUserCommand.actionSucceeded);
    // 重载所有用户列表
    config.reloadAllUserList();
    // 打印表格
    output.userTable(userInfo.addUser_0);

    // 提问是否创建key
    await prompt({
      name: 'createKey',
      message: addUserCommand.createKey,
      type: 'confirm',
      default: false,
      suffix: addUserCommand.createKeySuffix
    }).then(res => {
      res.createKey &&
        createKey(userInfo.addUser_1, userInfo.addUser_2, () => {
          output(addUserCommand.saveKeyPath + config.sshKeyDir + userInfo.addUser_1);
          output();
          output(`id_rsa_${userInfo.addUser_1}.pub: `);
          checkPublicKey(userInfo.addUser_1);
        });
    });
  });
};

// 备份操作
const backupAction = () => {
  const prompt = inquirer.createPromptModule();
  prompt({
    name: 'backupUserInfo',
    type: 'input',
    message: backupCommand.inquirerIssue
  }).then(res => {
    addUser({
      [res.backupUserInfo]: {
        name: globalConf.name,
        email: globalConf.email
      }
    });
    output.succeed(backupCommand.actionSucceeded);
    // 重载所有用户列表
    config.reloadAllUserList();
    // 打印表格
    output.userTable(res.backupUserInfo);
  });
};


const removeUserAction = () => {
  const prompt = inquirer.createPromptModule();

}
module.exports = {
  switchLanguageAction,
  userListAction,
  addUserAction,
  backupAction,
  removeUserAction
};
