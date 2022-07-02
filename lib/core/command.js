const { program } = require('commander');
const {
  setLanguageAction,
  printUserlistAction,
  createUserAction,
  removeUserAction,
  backupUserAction,
  useUserAction,
  addGitIgnoreAction
} = require('./action');

// 注册指令
const registerCommands = () => {
  const messageInfo = program.messageInfo;
  // 切换语言
  program.command('lan').description(messageInfo.setLanguage.description).action(setLanguageAction);

  // 打印用户状态列表
  program.command('list').description(messageInfo.printUserList.description).action(printUserlistAction);

  // 添加用户
  program.command('useradd').description(messageInfo.createUser.description).action(createUserAction);

  // 删除用户
  program.command('rm').description(messageInfo.removeUser.description).action(removeUserAction);

  // 备份
  program.command('backup').description(messageInfo.backupUser.description).action(backupUserAction);

  // 切换用户
  program.command('use').description(messageInfo.useUser.description).action(useUserAction);

  // 配置忽略文件
  program.command('ign').description(messageInfo.addGitIgnore.description).action(addGitIgnoreAction);
};

// const registerListenCommand = () => {
//   program.on('command:list', () => {
//   })
// };

module.exports = {
  registerCommands
};
