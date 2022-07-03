// 英文语言信息
const en = {
  notGit: 'Sorry, the program depends on the git, please check your system to install git',
  setLanguage: {
    description: 'Set the interactive language',
    inquirerIssue: 'Please select the language:',
    actionSucceeded: 'Set successfully, the current language is:'
  },
  printUserList: {
    description: 'View the current list of users',
    tableListTitle: 'Git USER STATUS TABLE',
    currentUserTips: 'Current user'
  },
  createUser: {
    description: 'Create a git user',
    groupNameIllegal: '"global" as a special group name, please replace the other group name and try again',
    inquirerIssue: [
      {
        message: 'Please enter the group name to which the new user belongs:',
        name: 'group'
      },
      {
        message: 'Please enter a user name:',
        name: 'name'
      },
      {
        message: 'Please enter a email address:',
        name: 'email'
      }
    ],
    actionSucceeded: 'The user to create a successful!',
    groupIsExist: 'The same group name already exists in the user list:',
    groupIsExistSuffix: 'Do you overwrite this user information? [ y:override N:exit, default:N ] ',
    createKey: 'Whether for the new user generated key?[default:N]',
    saveKeyPath: 'The key has been saved to the path:',
    alreadyExists: 'The key file name already exists:'
  },
  removeUser: {
    description: 'Delete the specified user',
    inquirerIssue: 'Please select the user you want to delete:',
    confirmRemove: 'Are you sure you want to delete this user? The operation is not reversible[default:N]',
    actionSucceeded: 'Delete user successfully!'
  },
  backupUser: {
    description: 'Backup is currently using user information',
    inquirerIssue: 'Enter and set a group name for the user:',
    actionSucceeded: 'User backup successful!'
  },
  notBackup:
    'The current user information is not saved in "Glister manager"\nTo avoid information being overwritten or lost when switching users\nIt is recommended that you use "gt backup" command to backup the current user information',

  useUser: {
    description: 'Set the git user to be the global user of Git if the current working directory is not a git repository',
    inquirerIssue: 'Please select a user:',
    confirmGlobal: 'The current working directory does not exist git repository, continued operation will change the global user, whether or not to continue?[default:y]',
    confirmLocal: 'The current working directory is a Git repository. Do you want to change Git users for this repository? This operation does not affect the global[default:y]',
    actionSucceeded: 'set the user successfully!'
  },

  helpDescription: {
    version: 'Check the version number',
    help: 'Display command help',
    helpForCmd: 'Display command help',
    substituteTip: 'Can use the complete instruction "glister" alternative "gt"'
  },

  addGitIgnore: {
    description: 'As a local git repository add .gitignore files',
    inquirerIssue: 'Please select an ignore template:',
    fileIsExist: 'Detected presence in the warehouse .gitignore file, select overwrite or append?',
    actionSucceeded: '.gitignoreThe file was added successfully!',
    choices: ['node', 'python', 'java', 'basic'],
    noRepository: 'The current working directory is not a Git repository, use this command in a git repository',
    action: [
      { name: 'overwrite', value: 'overwrite' },
      { name: 'appended', value: 'append' }
    ]
  },

  needUpdate: 'A new version of the remote warehouse has been detected:',
  updateAction: 'Please execute "npm i glister -g" update to this version',
  notGlobalUser: 'Git global user detected is not currently configured, Glister run condition needs to use git global user, configure immediately?[default:y]',
  userInfoNotEmpty:'Create a failure, the user information cannot be empty'

};

module.exports = en;
