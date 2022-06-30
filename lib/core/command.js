const { program } = require('commander');
const config = require('../config');
const {
  switchLanguageAction,
  userListAction,
  addUserAction,
  backupAction,
  removeUserAction,
  switchUserAction
} = require('./action');
const language = config.languageConfig;

const registerCommands = () => {
  // lan指令
  program.command('lan').description(language.switchLanguageCommand.commandDescription).action(switchLanguageAction);
  // list指令
  program.command('list').description(language.listCommand.commandDescription).action(userListAction);
  // useradd指令
  program.command('useradd').description(language.addUserCommand.commandDescription).action(addUserAction);
  // backup指令
  program.command('backup').description(language.backupCommand.commandDescription).action(backupAction);
  // 删除用户
  program.command('rm').description(language.removeCommand.commandDescription).action(removeUserAction);
  // 切换用户
  program.command('switch').description(language.switchUserCommand.commandDescription).action(switchUserAction);
};

// const registerListenCommand = () => {
//   program.on('command:list', () => {
//   })
// };

module.exports = {
  registerCommands
};
