#!/usr/bin/env node

const config = require('./lib/config');
const { program } = require('commander');
const { registerCommands } = require('./lib/core/command');
const { verifyProgramInstruction, verifyVersion } = require('./lib/utils/verify');

const language = config.languageConfig;

// 校验git
verifyProgramInstruction('git', language.notGit);

// 检测版本
verifyVersion().then(res => {
  // 查看版本号
  program.version(require('./package.json').version, '-v, --version', language.helpDescription.version);

  // 自定义帮助信息
  program.helpOption('-h, --help', language.helpDescription.help);

  // 自定义子命令的帮助信息描述
  program.addHelpCommand('help [command]', language.helpDescription.helpForCmd);

  // 注册指令
  registerCommands();

  program.parse(process.argv);
});
