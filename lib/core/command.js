const { program } = require('commander');
const { langConfig } = require('../config');
const { switchLanguageAction } = require('./action');
const registerCommands = () => {
  program.command('lan').description(langConfig.switchLanguage.commandDescription).action(switchLanguageAction);
  // program.command('list').description()
};

module.exports = {
  registerCommands
};
