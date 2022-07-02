#!/usr/bin/env node

const reloadConfig = require('./lib/config');
const { program } = require('commander');
const { registerCommands } = require('./lib/core/command');
const { helpOptions } = require('./lib/core/help');
const { verifyProgramInstruction, verifyVersion, verifyIsExistGlobalUser } = require('./lib/utils/verify');

// 入口
const glisterStart = async () => {
  // 加载配置
  await reloadConfig();

  // 校验git
  verifyProgramInstruction('git', program.messageInfo.notGit);

  await verifyVersion();

  await verifyIsExistGlobalUser();

  //  注册指令
  registerCommands();

  // 查看版本号
  program.version(require('./package.json').version, '-v, --version', program.messageInfo.helpDescription.version);

  // 自定义帮助信息
  program.helpOption('-h, --help', program.messageInfo.helpDescription.help);

  // 自定义子命令的帮助信息描述
  program.addHelpCommand('help [command]', program.messageInfo.helpDescription.helpForCmd);

  // 加载额外的帮助选项
  helpOptions();

  program.parse(process.argv);
};

glisterStart();
// const language = config.languageConfig;

// // 检测版本
// verifyVersion().then(async res => {
//   // 校验当前用户是否备份
//   await verifyBackup(language.notBackup);

//   );

//

// });
