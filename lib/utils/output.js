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
output.userTable = (fresh, callback) => {
  const table = new Table({ title: config.languageConfig.listCommand.tableListTitle });
  config.allUserList.forEach(item => {
    switch (item.group) {
      case 'global':
        table.addRow(item, { color: 'green' });
        break;
      case fresh:
        fresh && table.addRow(item, { color: 'yellow' });
        break;
      default:
        table.addRow(item);
        break;
    }
  });
  table.printTable();
  callback && callback();
};

module.exports = {
  output
};
