const languageConfig = {
  zh: {
    notGit: '抱歉，该程序依赖于git，请检查您是否安装git',
    needUpdate: '检测到远程仓库存在新版本：',
    updateAction: '请执行 "npm i glister -g" 更新至该版本',
    notBackup:
      '检测到当前用户信息未被保存至glister管理器中\n为避免切换用户时信息被覆盖或丢失\n建议您使用 "gt backup" 命令来备份当前用户信息',

    ignoreCommand: {
      commandDescription: '为本地git仓库添加忽略文件',
      inquirerIssue: '请选择一个忽略模板：',
      fileIsExist: '检测到.gitignore文件已存在，选择覆盖或追加？',
      actionSucceeded: 'git忽略配置添加成功!',
      choices: ['node', 'normal'],
      noRepository: '当前目录不在git仓库中，请将目录切换至本地仓库后执行该命令',
      action: [
        { name: '覆盖', value: 'overwrite' },
        { name: '追加', value: 'append' }
      ]
    },
    useUserCommand: {
      commandDescription: '更换当前用户, 当前工作路径如果在仓库则更改local用户, 若不在则更改global用户',
      inquirerIssue: '选择一个用户信息: ',
      confirmGlobal: '当前工作目录不存在git仓库, 继续操作将更改全局用户, 是否继续?[默认:y]',
      confirmLocal: '当前工作目录为git仓库, 是否为此仓库更改git用户? 该操作不影响全局[默认:y]',
      actionSucceeded: '更换用户成功!'
    },
    removeCommand: {
      commandDescription: '删除指定git用户信息',
      inquirerIssue: '请选择要删除的用户：',
      confirmRemove: '确定要删除该用户吗？该操作不可逆[默认:N]',
      actionSucceeded: '删除用户成功！'
    },
    helpDescription: {
      version: '查看版本号',
      help: '显示命令帮助',
      helpForCmd: '显示子命令帮助信息',
      substituteTip: '你还可以使用完整指令 "glister" 替代 "gt"'
    },
    switchLanguageCommand: {
      commandDescription: '切换语言',
      inquirerIssue: '请选择语言：',
      actionSucceeded: '语言切换成功，当前语言为：'
    },
    listCommand: {
      commandDescription: '查看当前已创建的用户列表',
      tableListTitle: 'GIT用户状态表',
      currentUserTips: '当前用户为:'
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
    notGit: '抱歉，该程序依赖于git，请检查您是否安装git',
    needUpdate: '检测到远程仓库存在新版本：',
    updateAction: '请执行 "npm i glister -g" 更新至该版本',
    notBackup:
      '检测到当前用户信息未被保存至glister管理器中\n为避免切换用户时信息被覆盖或丢失\n建议您使用 "gt backup" 命令来备份当前用户信息',

    ignoreCommand: {
      commandDescription: '为本地git仓库添加忽略文件',
      inquirerIssue: '请选择一个忽略模板：',
      fileIsExist: '检测到.gitignore文件已存在，选择覆盖或追加？',
      actionSucceeded: 'git忽略配置添加成功!',
      choices: ['node', 'normal'],
      noRepository: '当前目录不在git仓库中，请将目录切换至本地仓库后执行该命令',
      action: [
        { name: '覆盖', value: 'overwrite' },
        { name: '追加', value: 'append' }
      ]
    },
    useUserCommand: {
      commandDescription: '从用户列表中更换当前用户',
      inquirerIssue: '选择一个用户信息: ',
      confirmGlobal: '当前工作目录不存在git仓库, 继续操作将更改全局用户, 是否继续?[默认:y]',
      confirmLocal: '是否更改当前git仓库的用户信息?[默认:y]',
      actionSucceeded: '更换用户成功!'
    },
    removeCommand: {
      commandDescription: '删除指定git用户信息',
      inquirerIssue: '请选择要删除的用户：',
      confirmRemove: '确定要删除该用户吗？该操作不可逆[默认:N]',
      actionSucceeded: '删除用户成功！'
    },
    helpDescription: {
      version: '查看版本号',
      help: '显示命令帮助',
      helpForCmd: '显示子命令帮助信息',
      substituteTip: '你还可以使用完整指令 "glister" 替代 "gt"'
    },
    switchLanguageCommand: {
      commandDescription: '切换语言',
      inquirerIssue: '请选择语言：',
      actionSucceeded: '语言切换成功，当前语言为：'
    },
    listCommand: {
      commandDescription: '查看当前用户列表',
      tableListTitle: '当前git用户列表',
      currentUserTips: '当前环境下的用户为:'
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
  }

  // 英文语言信息
  // en: {
  //   notGit: 'Sorry, this program depends on git. Please check if you have Git installed',
  //   needUpdate: 'New version detected in remote warehouse:',
  //   updateAction: 'Please execute "npm i glister -g" to update to this version',
  //   notBackup:
  //     'It is detected that the current user information is not saved to the Glister Manager\nTo avoid information being overwritten or lost when switching users\nIt is recommended that you use the "gt backup" command to back up the current user user information',
  //   ignoreCommand: {
  //     commandDescription: 'add ignore file for local git repository',
  //     inquirerIssue: 'Please select an ignore template:',
  //     fileIsExist: ' Detected Gitignore file already exists. Choose overwrite or append?',
  //     actionSucceeded: 'Git ignore configuration added successfully!',
  //     choices: ['node', 'normal'],
  //     noRepository:
  //       'The current directory is not in the GIT warehouse. \nPlease switch the directory to the local warehouse and execute the command',
  //     action: ['overwrite', 'append']
  //   },
  //   useUserCommand: {
  //     commandDescription: 'select a user as the global user of GIT',
  //     inquirerIssue: 'Please select a user and set it as the current global user:',
  //     confirmSwtich: 'Are you sure to set this user as the current global user [default: y]',
  //     actionSucceeded: 'User switching succeeded!'
  //   },
  //   removeCommand: {
  //     commandDescription: 'delete the specified git user information',
  //     inquirerIssue: 'Please select a user to delete:',
  //     confirmRemove: 'Are you sure you want to delete this user? This operation is irreversible [default:N]',
  //     actionSucceeded: 'Delete user succeeded!'
  //   },
  //   helpDescription: {
  //     version: 'print version number',
  //     help: 'display help for command',
  //     helpForCmd: 'display subcommand help information',
  //     substituteTip: 'You can also use the full command "glister" instead of "gt"'
  //   },
  //   switchLanguageCommand: {
  //     commandDescription: 'switch the language',
  //     inquirerIssue: 'Please select a language:',
  //     actionSucceeded: 'Language switching succeeded. Current language is: '
  //   },
  //   listCommand: {
  //     commandDescription: 'view current user list',
  //     tableListTitle: 'CURRENTLY GIT USER LIST',
  //     currentUserTips: 'Currently in use:'
  //   },
  //   addUserCommand: {
  //     commandDescription: 'add a new git user',
  //     inquirerIssue: ['What is the group name of the new user?', 'Enter one user name:', 'Enter one email:'],
  //     actionSucceeded: 'User created successfully!',
  //     groupIsExist: 'The same group name already exists:',
  //     groupIsExistSuffix: 'Select overwrite? [y:cover N:exit default:N] ',
  //     createKey: 'Create a secret key for this group?',
  //     createKeySuffix: '[default:N]',
  //     saveKeyPath: 'Secret key saved to path:',
  //     alreadyExists: 'already exists \nIf the key is used, then it is not recommended to delete or change'
  //   },
  //   backupCommand: {
  //     commandDescription: 'backup user information currently in use',
  //     inquirerIssue: 'Enter the name of the group you want to back up to：',
  //     actionSucceeded: 'User info backup successfully!'
  //   }
  // }
};

module.exports = languageConfig;
