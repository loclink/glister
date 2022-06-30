const { program } = require('commander');
const config = require('../config');
const {
  switchLanguageAction,
  userListAction,
  addUserAction,
  backupAction,
  removeUserAction,
   useUserAction,
  gitignoreAction
} = require('./action');
const language = config.languageConfig;

const registerCommands = () => {
  // 切换语言
  program.command('lan').description(language.switchLanguageCommand.commandDescription).action(switchLanguageAction);
  // 打印列表
  program.command('list').description(language.listCommand.commandDescription).action(userListAction);
  // 添加用户
  program.command('useradd').description(language.addUserCommand.commandDescription).action(addUserAction);
  // 备份
  program.command('backup').description(language.backupCommand.commandDescription).action(backupAction);
  // 删除用户
  program.command('rm').description(language.removeCommand.commandDescription).action(removeUserAction);
  // 切换用户
  program.command('use').description(language.useUserCommand.commandDescription).action(useUserAction);
  // 配置忽略文件
  program.command('ign').description(language.ignoreCommand.commandDescription).action(gitignoreAction);
};

// const registerListenCommand = () => {
//   program.on('command:list', () => {
//   })
// };

module.exports = {
  registerCommands
};
