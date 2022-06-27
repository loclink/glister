const inquirer = require('inquirer');
const { writeGtrc } = require('../utils/write-file')
const { langConfig } = require('../config');

// 切换语言操作
const switchLanguageAction = () => {
  const prompt = inquirer.createPromptModule();
  prompt({
    name: 'switchLanguage',
    type: 'list',
    message: langConfig.switchLanguage.inquirerIssue,
    choices:['English', '简体中文']
  }).then(res => {
    console.log(res)
    writeGtrc({lang: res.switchLanguage === 'English' ? 'en' : 'zh'})
  });
};

module.exports = {
  switchLanguageAction
};
