#!/usr/bin/env node

const config= require('./lib/config');
const { program } = require('commander');
const { registerCommands } = require('./lib/core/command');

// 查看版本号
program.version(require('./package.json').version, '-v, --version',  config.languageConfig.helpDescription.version);

// 自定义帮助信息
program.helpOption('-h, --help', config.languageConfig.helpDescription.help);

// 自定义子命令的帮助信息描述
program.addHelpCommand('help [command]',  config.languageConfig.helpDescription.helpForCmd);

// 注册指令
registerCommands();




program.parse(process.argv);
