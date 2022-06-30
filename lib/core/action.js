const inquirer = require('inquirer');
const config = require('../config');
const chalk = require('chalk');

const {
  switchLanguage,
  checkPublicKey,
  createIgnoreTemplate,
  appendWriteGitignor
} = require('../utils/operation-file');
const { addUser, removeUser } = require('../utils/user-action');
const { verifyGitRepository, verifyFileIsExist } = require('../utils/verify');
const { output } = require('../utils/output');
const { createKey, switchGitUser } = require('../utils/run-command');

const globalConf = config.gitconfigData.user;
const {
  switchLanguageCommand,
  listCommand,
  addUserCommand,
  backupCommand,
  removeCommand,
  useUserCommand,
  ignoreCommand
} = config.languageConfig;

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
    if (config.gitconfigData.user?.name) {
      output.succeed(
        listCommand.currentUserTips + `name:${config.gitconfigData.user.name} email:${config.gitconfigData.user.email}`
      );
    }
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
        createKey(userInfo.addUser_0, userInfo.addUser_2, () => {
          output(addUserCommand.saveKeyPath + config.sshKeyDir + userInfo.addUser_0);
          output();
          output(`id_rsa_${userInfo.addUser_0}.pub: `);
          checkPublicKey(userInfo.addUser_0);
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

// remove
const removeUserAction = async () => {
  const prompt = inquirer.createPromptModule();
  const removeResult = await prompt({
    name: 'removeUser',
    type: 'list',
    message: removeCommand.inquirerIssue,
    choices: config.gtrcUserGroupList.map(item => {
      return {
        name: `group:${item.group} name:${item.name} email:${item.email}`,
        value: item.group
      };
    })
  });

  const isConfirm = await prompt({
    name: 'confirmRemove',
    type: 'confirm',
    message: removeCommand.confirmRemove,
    default: false
  });

  if (isConfirm.confirmRemove) {
    await removeUser(removeResult.removeUser);
    output.succeed(removeCommand.actionSucceeded);
  }
};

// 使用用户
const useUserAction = async () => {
  const prompt = inquirer.createPromptModule();
  const result = await prompt({
    name: 'switchUser',
    type: 'list',
    message: useUserCommand.inquirerIssue,
    choices: config.gtrcUserGroupList.map(item => {
      return {
        name: `group:${item.group} name:${item.name} email:${item.email}`,
        value: item
      };
    })
  });
  await switchGitUser(result.switchUser);
  output.succeed(useUserCommand.actionSucceeded);
  userListAction();
};

// 添加忽略配置文件
const gitignoreAction = async () => {
  verifyGitRepository(ignoreCommand.noRepository);
  const prompt = inquirer.createPromptModule();
  const tempResult = await prompt({
    name: 'ignore',
    message: ignoreCommand.inquirerIssue,
    type: 'list',
    choices: ignoreCommand.choices
  });
  const ignoreIsExist = verifyFileIsExist(`${process.cwd()}/.gitignore`);
  if (ignoreIsExist) {
    const actionResult = await prompt({
      name: 'action',
      message: ignoreCommand.fileIsExist,
      type: 'list',
      choices: ignoreCommand.action
    });
    if (actionResult.action === 'append') {
      await appendWriteGitignor(tempResult.ignore);
    } else {
      await createIgnoreTemplate(tempResult.ignore);
    }
  } else {
    await createIgnoreTemplate(tempResult.ignore);
  }

  output.succeed(ignoreCommand.actionSucceeded);
};

module.exports = {
  switchLanguageAction,
  userListAction,
  addUserAction,
  backupAction,
  removeUserAction,
  useUserAction,
  gitignoreAction
};
