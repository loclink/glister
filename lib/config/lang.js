const languageConfig = {
  zh: {
    helpDescription: {
      version: '查看版本号',
      help: '显示命令帮助',
      helpForCmd: '显示子命令帮助信息'
    },
    switchLanguageCommand: {
      commandDescription: '切换语言',
      inquirerIssue: '请选择语言：',
      actionResult: '语言切换成功，当前语言为：'
    },
    listCommand: {
      commandDescription: '查看当前用户列表',
      tableListTitle: 'git用户列表',
      currentUserTips: '当前正在使用：',
      notBackup:
        '检测到当前用户信息未被保存至glister管理器中\n为避免切换用户时信息被覆盖或丢失\n建议您使用 "gt backup" 命令来备份当前用户信息'
    },
    addUserCommand: {
      commandDescription: '添加一个新的git用户',
      inquirerIssue: ['新用户的分组名称是？', '请输入用户名：', '请输入邮箱：']
    },
    backupCommand: {
      commandDescription: '备份当前正在使用的用户信息',
      inquirerIssue: '输入需要备份到的分组名称：'
    }
  },

  en: {
    helpDescription: {
      version: 'print version number',
      help: 'display help for command',
      helpForCmd: 'display subcommand help information'
    },
    switchLanguageCommand: {
      commandDescription: 'switch the language',
      inquirerIssue: 'Please select a language:',
      actionResult: 'Language switching succeeded. Current language is: '
    },
    listCommand: {
      commandDescription: 'view current user list',
      tableListTitle: 'git user list',
      currentUserTips: 'currently in use:',
      notBackup:
        'It is detected that the current user information is not saved to the Glister Manager\nTo avoid information being overwritten or lost when switching users\nIt is recommended that you use the "gt backup" command to back up the current user user information'
    },
    addUserCommand: {
      commandDescription: 'add a new git user',
      inquirerIssue: ['What is the group name of the new user?', 'Enter one user name:', 'Enter one email:']
    },
    backupCommand: {
      commandDescription: 'backup user information currently in use',
      inquirerIssue: 'Enter the name of the group you want to back up to：'
    }
  }
};

module.exports = languageConfig;
