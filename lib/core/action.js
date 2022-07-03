const inquirer = require('inquirer');
const chalk = require('chalk');
const { program } = require('commander');
const { output } = require('../utils/output');
const { setLanguage, createUser, removeUser } = require('../utils/set-glisterrc');
const { createKey, useGlobalUser, useLocalUser } = require('../utils/set-git-config');
const {
  verifyGroupNameIsExist,
  verifyBackup,
  verifyGitRepository,
  verifyFileIsExist,
  verifyNotEmpty
} = require('../utils/verify');
const { checkPublicKey, createGitIgnore, appendWriteGitIgnore } = require('../utils/operation-file');

// 设置语言
const setLanguageAction = async () => {
  const config = program.config;
  const prompt = inquirer.createPromptModule();
  const languageResult = await prompt({
    name: 'language',
    type: 'list',
    message: program.messageInfo.setLanguage.inquirerIssue,
    choices: ['English', '简体中文']
  });
  // 将结果同步设置
  await setLanguage(config, languageResult.language);
  // 打印结果
  output.succeed(program.messageInfo.setLanguage.actionSucceeded + languageResult.language);
};

// 打印用户列表
const printUserlistAction = () => {
  const config = program.config;
  output.printUserTable(program.messageInfo.printUserList.tableListTitle, config.allUserList, config.currentUserInfo);
  if (!verifyBackup(config)) output.warning(program.messageInfo.notBackup);
  output.currentUserInfo(config.currentUserInfo);
};

// 创建用户
const createUserAction = async () => {
  const config = program.config;
  const createUserMessage = program.messageInfo.createUser;
  const prompt = inquirer.createPromptModule();
  const newUserInfo = await prompt(
    createUserMessage.inquirerIssue.map(item => ({
      type: 'input',
      name: item.name,
      message: item.message
    }))
  );
  // 校验组名是否合法
  if (newUserInfo.groupName === 'global') {
    output.error(createUserMessage.groupNameIllegal);
    process.exit();
  }

  verifyNotEmpty(newUserInfo);

  // 校验组名是否存在
  const verifyUserResult = verifyGroupNameIsExist(newUserInfo.group, config.allUserList);
  if (verifyUserResult) {
    // 是否覆盖用户
    const confirCovermResult = await prompt({
      name: 'isCover',
      type: 'confirm',
      message: createUserMessage.groupIsExist + chalk.blue(newUserInfo.group),
      default: false,
      suffix:
        chalk.blue(`\nname:${verifyUserResult.name}`) +
        ' | ' +
        chalk.blue(`email:${verifyUserResult.email}\n`) +
        chalk.cyan(createUserMessage.groupIsExistSuffix)
    });
    if (!confirCovermResult.isCover) process.exit();
  }
  await createUser(config, newUserInfo);
  output.printUserTable(
    program.messageInfo.printUserList.tableListTitle,
    config.allUserList,
    config.currentUserInfo,
    newUserInfo
  );
  output.succeed(createUserMessage.actionSucceeded);
  // 提问是否创建key
  const createKeyResult = await prompt({
    name: 'createKey',
    message: createUserMessage.createKey,
    type: 'confirm',
    default: false
  });
  if (createKeyResult.createKey) {
    createKey(config, newUserInfo.group, newUserInfo.email, () => {
      output(createUserMessage.saveKeyPath + config.sshKeyDir + newUserInfo.group);
      output();
      output(`id_rsa_${newUserInfo.group}.pub:`);
      checkPublicKey(config, newUserInfo.group);
    });
  }
};

// 删除用户
const removeUserAction = async () => {
  const config = program.config;
  const removeUserMessage = program.messageInfo.removeUser;
  const prompt = inquirer.createPromptModule();
  const removeResult = await prompt({
    name: 'removeUser',
    type: 'list',
    message: removeUserMessage.inquirerIssue,
    choices: config.filterUserList.map(item => {
      return {
        name: `group:${item.group} name:${item.name} email:${item.email}`,
        value: item.group
      };
    })
  });

  const isConfirm = await prompt({
    name: 'confirmRemove',
    type: 'confirm',
    message: removeUserMessage.confirmRemove,
    default: false
  });

  if (isConfirm.confirmRemove) {
    await removeUser(removeResult.removeUser, config);
    output.succeed(removeUserMessage.actionSucceeded);
  }
};

// 备份操作
const backupUserAction = async () => {
  const config = program.config;
  const backupUserMessage = program.messageInfo.backupUser;
  const prompt = inquirer.createPromptModule();

  const backupResult = await prompt({
    name: 'group',
    type: 'input',
    message: backupUserMessage.inquirerIssue
  });

  const backupUserInfo = {
    group: backupResult.group,
    name: config.currentUserInfo.name,
    email: config.currentUserInfo.email
  };

  verifyNotEmpty(backupUserInfo);

  await createUser(config, backupUserInfo);
  output.succeed(backupUserMessage.actionSucceeded);
  output.printUserTable(
    program.messageInfo.printUserList.tableListTitle,
    config.allUserList,
    config.currentUserInfo,
    backupUserInfo
  );
};

// 使用用户
const useUserAction = async () => {
  const config = program.config;
  const useUserMessage = program.messageInfo.useUser;
  const isGitRepository = verifyGitRepository();
  const prompt = inquirer.createPromptModule();
  const scope = isGitRepository ? 'local' : 'global';
  const confirmMessage = isGitRepository ? useUserMessage.confirmLocal : useUserMessage.confirmGlobal;
  const confirmResult = await prompt({
    name: 'confirm',
    type: 'confirm',
    message: confirmMessage,
    default: true
  });

  !confirmResult.confirm && process.exit();

  const userResult = await prompt({
    name: 'userInfo',
    type: 'list',
    message: useUserMessage.inquirerIssue,
    choices: config.filterUserList.map(item => {
      return {
        name: `group:${item.group} name:${item.name} email:${item.email}`,
        value: item
      };
    })
  });

  if (scope === 'global') {
    await useGlobalUser(userResult.userInfo);
  } else if (scope === 'local') {
    await useLocalUser(userResult.userInfo);
  }
  output.succeed(useUserMessage.actionSucceeded);

  output.printUserTable(
    program.messageInfo.printUserList.tableListTitle,
    program.config.allUserList,
    program.config.currentUserInfo
  );
};

// 添加忽略配置文件
const addGitIgnoreAction = async () => {
  const addGitIgnoreMessage = program.messageInfo.addGitIgnore;
  const config = program.config;
  // 检测当前工作路径是否为git仓库
  verifyGitRepository(addGitIgnoreMessage.noRepository);

  const prompt = inquirer.createPromptModule();
  const tempResult = await prompt({
    name: 'ignore',
    message: addGitIgnoreMessage.inquirerIssue,
    type: 'list',
    choices: addGitIgnoreMessage.choices
  });

  const ignoreIsExist = verifyFileIsExist(`${config.currentRepositoryPath}/.gitignore`);

  if (ignoreIsExist) {
    const actionResult = await prompt({
      name: 'action',
      message: addGitIgnoreMessage.fileIsExist,
      type: 'list',
      choices: addGitIgnoreMessage.action
    });

    if (actionResult.action === 'append') {
      await appendWriteGitIgnore(config.currentRepositoryPath, tempResult.ignore);
    } else {
      await createGitIgnore(config.currentRepositoryPath, tempResult.ignore);
    }
  } else {
    await createGitIgnore(config.currentRepositoryPath, tempResult.ignore);
  }
  output.succeed(addGitIgnoreMessage.actionSucceeded);
};

module.exports = {
  setLanguageAction,
  printUserlistAction,
  createUserAction,
  removeUserAction,
  backupUserAction,
  useUserAction,
  addGitIgnoreAction
};
