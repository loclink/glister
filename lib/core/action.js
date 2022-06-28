const chalk = require('chalk');
const inquirer = require('inquirer');
const { Table } = require('console-table-printer');

const config = require('../config');
const { writeGtrc } = require('../utils/write-file');

const { switchLanguageCommand, addUserCommand, listCommand, backupCommand } = config.languageConfig;
// 切换语言操作
const switchLanguageAction = () => {
  const prompt = inquirer.createPromptModule();
  prompt({
    name: 'switchLanguage',
    type: 'list',
    message: switchLanguageCommand.inquirerIssue,
    choices: ['English', '简体中文']
  }).then(res => {
    config.gtrcData.config = { lang: res.switchLanguage === 'English' ? 'en' : 'zh' };
    writeGtrc();
    // 打印结果
    const result = config.languageConfig.switchLanguageCommand.actionResult + res.switchLanguage;
    console.log(chalk.green(result));
  });
};

// 打印用户列表操作
const userListAction = () => {
  const globalConf = config.gitconfigData.user;
  const gtrcUserGroupList = Object.keys(config.gtrcData.userGroup).map(item => ({
    group: item,
    name: config.gtrcData.userGroup[item].name,
    email: config.gtrcData.userGroup[item].email
  }));
  const allGlobalConf = [{ group: 'global', name: globalConf.name, email: globalConf.email }, ...gtrcUserGroupList];
  const backupGlobalInfo = gtrcUserGroupList.find(item => item.name === globalConf.name);
  console.log(backupGlobalInfo);
  const table = new Table({
    title: listCommand.tableListTitle
  });

  allGlobalConf.forEach(item => {
    if (item.group === 'global') {
      table.addRow(item, { color: 'green' });
    } else {
      table.addRow(item);
    }
  });
  table.printTable();
  console.log(chalk.green(listCommand.currentUserTips + `name:${globalConf.name} email:${globalConf.email}`));
  if (!backupGlobalInfo) console.log(chalk.yellow(listCommand.notBackup));
};

const addUserAction = () => {
  const prompt = inquirer.createPromptModule();
  prompt(
    addUserCommand.inquirerIssue.map((item, index) => ({ type: 'input', name: 'addUser_' + index, message: item }))
  ).then(res => {
    config.gtrcData.userGroup = {
      ...config.gtrcData.userGroup,
      [res.addUser_0]: {
        name: res.addUser_1,
        email: res.addUser_2
      }
    };
    writeGtrc();
    console.log('创建成功');
  });
};

const backupAction = () => {
  const prompt = inquirer.createPromptModule();
  prompt({
    name: 'backupUserInfo',
    type: 'input',
    message: backupCommand.inquirerIssue
  }).then(res => {
    console.log(res)
  });
};
module.exports = {
  switchLanguageAction,
  userListAction,
  addUserAction,
  backupAction
};
