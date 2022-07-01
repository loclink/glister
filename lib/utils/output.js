const chalk = require('chalk');
const { Table } = require('console-table-printer');
const config = require('../config');

const output = (message = '') => {
  console.log(message);
};

output.error = errorMessage => {
  console.log(chalk.red(errorMessage));
};

output.succeed = succeedMessage => {
  console.log(chalk.green(succeedMessage));
};

output.warning = warningMessage => {
  console.log(chalk.yellow(warningMessage));
};

// 打印表格
output.userTable = (freshUser, currentUser, callback) => {
  const table = new Table({
    title: config.languageConfig.listCommand.tableListTitle,
    columns: [
      {
        name: 'group',
        title: 'group',
        alignment: 'center'
      },
      {
        name: 'name',
        title: 'name',
        alignment: 'center'
      },
      {
        name: 'email',
        title: 'email',
        alignment: 'center'
      },
      {
        name: 'apply',
        title: 'apply',
        alignment: 'center'
      }
    ]
  });

  config.allUserList.forEach(item => {
    if (item.name === freshUser?.name && item.email === freshUser?.email) {
      item.apply = '✔';
      table.addRow(item, { color: 'yellow' });
    } else if (item.name === currentUser.name && item.email === currentUser.email && item.group === currentUser.scope) {
      item.apply = '✔';
      table.addRow(item, { color: 'green' });
    } else if (item.name === currentUser.name && item.email === currentUser.email && currentUser.scope !== 'global') {
      item.apply = '✔';
      table.addRow(item, { color: 'green' });
    } else {
      table.addRow(item);
    }
  });

  output();
  table.printTable();
  callback && callback();
};

// 打印当前正在应用的用户信息
output.currentUserInfo = currentUser => {
  output.succeed(
    `${config.languageConfig.listCommand.currentUserTips} name: ${currentUser.name} email: ${currentUser.email}`
  );
};

module.exports = {
  output
};
