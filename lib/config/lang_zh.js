const zh = {
  notGit: '抱歉, 该程序依赖于git, 请检查您的系统中是否安装git',
  setLanguage: {
    description: '设置交互语言',
    inquirerIssue: '请选择语言:',
    actionSucceeded: '设置成功，当前语言为:'
  },
  printUserList: {
    description: '查看当前用户列表',
    tableListTitle: 'GIT用户状态表',
    currentUserTips: '当前用户'
  },
  createUser: {
    description: '创建一个git用户',
    groupNameIllegal: 'global为特殊组名,请更换其他分组名称并重试',
    inquirerIssue: [
      {
        message: '请输入新用户所属组名:',
        name: 'group'
      },
      {
        message: '请输入用户名:',
        name: 'name'
      },
      {
        message: '请输入邮箱:',
        name: 'email'
      }
    ],
    actionSucceeded: '用户创建成功!',
    groupIsExist: '用户列表中已存在相同的组名:',
    groupIsExistSuffix: '是否覆盖该用户信息？[y:覆盖 N:退出 默认:N] ',
    createKey: '是否为该新用户生成密钥?[默认:N]',
    saveKeyPath: '密钥已保存至路径:',
    alreadyExists: '该密钥文件名称已存在:'
  },
  removeUser: {
    description: '删除指定用户',
    inquirerIssue: '请选择需要删除的用户:',
    confirmRemove: '确定要删除该用户吗？该操作不可逆[默认:N]',
    actionSucceeded: '删除用户成功!'
  },
  backupUser: {
    description: '备份当前正在使用的用户信息',
    inquirerIssue: '为该用户输入并设置一个分组名称:',
    actionSucceeded: '用户备份成功!'
  },
  notBackup:
    '当前用户信息未被保存至glister管理器中\n为避免切换用户时信息被覆盖或丢失\n建议您使用 "gt backup" 命令来备份当前用户信息',

  useUser: {
    description: '设置git用户，若当前工作目录非git仓库，将设置为git的全局用户',
    inquirerIssue: '请选择一个用户:',
    confirmGlobal: '当前工作目录不存在git仓库, 继续操作将更改全局用户, 是否继续?[默认:y]',
    confirmLocal: '当前工作目录为git仓库, 是否为此仓库更改git用户? 该操作不影响全局[默认:y]',
    actionSucceeded: '更换用户成功!'
  },

  helpDescription: {
    version: '查看版本号',
    help: '显示命令帮助',
    helpForCmd: '显示命令帮助',
    substituteTip: '可以使用完整指令 "glister" 替代 "gt"'
  },

  addGitIgnore: {
    description: '为本地git仓库添加.gitignore忽略文件',
    inquirerIssue: '请选择一个忽略模板:',
    fileIsExist: '检测到该仓库中已存在.gitignore文件，选择覆盖或追加?',
    actionSucceeded: '.gitignore文件添加成功!',
    choices: ['node', 'python', 'java', 'basic'],
    noRepository: '当前工作目录非git仓库，请在git仓库中使用该命令',
    action: [
      { name: '覆盖', value: 'overwrite' },
      { name: '追加', value: 'append' }
    ]
  },

  needUpdate: '检测到远程仓库存在新版本：',
  updateAction: '请执行 "npm i glister -g" 更新至该版本',
  notGlobalUser: '检测到当前未配置git全局用户，glister的运行条件需要使用git全局用户，立即配置?[默认:y]'
};

module.exports = zh;
