const languageConfig = {
  zh: {
    notGit: '抱歉，该程序依赖于git，请检查您是否安装git',
    needUpdate: '检测到远程仓库存在新版本：',
    updateAction: '请执行 "npm i glister -g" 更新至该版本',
    removeCommand: {
      commandDescription: '删除指定git用户信息',
      inquirerIssue:'确定要删除该用户吗？该操作不可逆[默认:N]',
      actionSucceeded: '删除用户成功！'
    },
    helpDescription: {
      version: '查看版本号',
      help: '显示命令帮助',
      helpForCmd: '显示子命令帮助信息'
    },
    switchLanguageCommand: {
      commandDescription: '切换语言',
      inquirerIssue: '请选择语言：',
      actionSucceeded: '语言切换成功，当前语言为：'
    },
    listCommand: {
      commandDescription: '查看当前用户列表',
      tableListTitle: '当前git用户列表',
      currentUserTips: '当前正在使用：',
      notBackup:
        '检测到当前用户信息未被保存至glister管理器中\n为避免切换用户时信息被覆盖或丢失\n建议您使用 "gt backup" 命令来备份当前用户信息'
    },
    addUserCommand: {
      commandDescription: '添加一个新的git用户',
      inquirerIssue: ['新用户的分组名称是？', '请输入用户名：', '请输入邮箱：'],
      actionSucceeded: '用户创建成功！',
      groupIsExist: '已存在相同的组名：',
      groupIsExistSuffix: '是否选择覆盖？[y:覆盖 N:退出 默认:N] ',
      createKey: '是否为该分组创建秘钥？',
      createKeySuffix: '[默认:N]',
      saveKeyPath: '秘钥已保存至路径：',
      alreadyExists: '已经存在了 \n如果你正在使用这个秘钥，那么不建议删除或修改'
    },
    backupCommand: {
      commandDescription: '备份当前正在使用的用户信息',
      inquirerIssue: '输入需要备份到的分组名称：',
      actionSucceeded: '用户信息备份成功！'
    }
  },

  en: {
    notGit: 'Sorry, this program depends on git. Please check if you have Git installed',
    needUpdate: 'New version detected in remote warehouse:',
    updateAction: 'Please execute "npm i glister -g" to update to this version',
    removeCommand: {
      commandDescription: 'delete the specified git user information',
      inquirerIssue:'Are you sure you want to delete this user? This operation is irreversible [default:N]',
      actionSucceeded: 'Delete user succeeded!'
    },
    helpDescription: {
      version: 'print version number',
      help: 'display help for command',
      helpForCmd: 'display subcommand help information'
    },
    switchLanguageCommand: {
      commandDescription: 'switch the language',
      inquirerIssue: 'Please select a language:',
      actionSucceeded: 'Language switching succeeded. Current language is: '
    },
    listCommand: {
      commandDescription: 'view current user list',
      tableListTitle: 'CURRENTLY GIT USER LIST',
      currentUserTips: 'Currently in use:',
      notBackup:
        'It is detected that the current user information is not saved to the Glister Manager\nTo avoid information being overwritten or lost when switching users\nIt is recommended that you use the "gt backup" command to back up the current user user information'
    },
    addUserCommand: {
      commandDescription: 'add a new git user',
      inquirerIssue: ['What is the group name of the new user?', 'Enter one user name:', 'Enter one email:'],
      actionSucceeded: 'User created successfully!',
      groupIsExist: 'The same group name already exists:',
      groupIsExistSuffix: 'Select overwrite? [y:cover N:exit default:N] ',
      createKey: 'Create a secret key for this group?',
      createKeySuffix: '[default:N]',
      saveKeyPath: 'Secret key saved to path:',
      alreadyExists: 'already exists \nIf the key is used, then it is not recommended to delete or change'
    },
    backupCommand: {
      commandDescription: 'backup user information currently in use',
      inquirerIssue: 'Enter the name of the group you want to back up to：',
      actionSucceeded: 'User info backup successfully!'
    }
  }
};

module.exports = languageConfig;
