#!/usr/bin/env node

const { langConfig, gitconfigData, gtrcData } = require('./lib/config');
const { program } = require('commander');
const { printTable } = require('console-table-printer');
const { registerCommands } = require('./lib/core/command');

// 查看版本号
program.version(require('./package.json').version, '-v, --version', langConfig.helpDescription.version);

// 自定义帮助信息
program.helpOption('-h, --help', langConfig.helpDescription.help);

// 自定义子命令的帮助信息描述
program.addHelpCommand('help [command]', langConfig.helpDescription.helpForCmd);

// 注册指令
registerCommands();

console.log(gtrcData);
console.log(gitconfigData);

const t = [
  { index: 1, text: 'abcdefg' },
  { index: 3, text: 'abcdefg' },
  { index: 2, text: 'abcdefg' }
];

program.parse(process.argv);
