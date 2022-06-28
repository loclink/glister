const { program } = require('commander');
const config = require('../config');
const { switchLanguageAction, userListAction,addUserAction,backupAction } = require('./action');
const { switchLanguageCommand, listCommand, addUserCommand,backupCommand } = config.languageConfig;

const registerCommands = () => {
  // lan指令
  program.command('lan').description(switchLanguageCommand.commandDescription).action(switchLanguageAction);
  // list指令
  program.command('list').description(listCommand.commandDescription).action(userListAction);
  // useradd指令
  program.command('useradd').description(addUserCommand.commandDescription).action(addUserAction);
  // backup指令
  program.command('backup').description(backupCommand.commandDescription).action(backupAction)
};

module.exports = {
  registerCommands
};
