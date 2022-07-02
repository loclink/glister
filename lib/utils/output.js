const chalk = require('chalk');
const { program } = require('commander');
const { Table } = require('console-table-printer');

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
output.printTable = (tableConfig = {}, tableRowData = [], callback) => {
  const table = new Table({
    title: tableConfig.title,
    columns: tableConfig.columns
  });
  tableRowData.forEach(item => {
    table.addRow(item.data, item.conf);
  });
  table.printTable();
  callback && callback();
};

// 打印用户列表
output.printUserTable = (tableTitle, allUserList = [], currentUserInfo, newUserInfo, callback) => {
  const tableConfig = {
    title: tableTitle,
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
        name: 'status',
        title: 'status',
        alignment: 'center'
      }
    ]
  };
  const finalUserList = allUserList.map(item => {
    const tableRowData = {};
    if (
      item.name === currentUserInfo.name &&
      item.email === currentUserInfo.email &&
      item.group === currentUserInfo.scopeType
    ) {
      item.status = '✔';
      tableRowData.data = item;
      tableRowData.conf = { color: 'green' };
    } else if (
      item.name === currentUserInfo.name &&
      item.email === currentUserInfo.email &&
      item.group !== 'global' &&
      currentUserInfo.scopeType === 'local'
    ) {
      item.status = '✔';
      tableRowData.data = item;
      tableRowData.conf = { color: 'green' };
    } else if (newUserInfo?.group === item.group) {
      item.status = 'new';
      tableRowData.data = item;
      tableRowData.conf = { color: 'yellow' };
    } else {
      tableRowData.data = item;
    }
    return tableRowData;
  });
  output.printTable(tableConfig, finalUserList, callback);
};

// 打印当前正在应用的用户信息
output.currentUserInfo = currentUser => {
  const scope =
    currentUser.scopeType === 'global' ? chalk.magenta(currentUser.scopeType) : chalk.yellow(currentUser.scopeType);
  output.succeed(
    `${program.messageInfo.printUserList.currentUserTips}[${scope}]:\nname:${currentUser.name}    email:${currentUser.email} `
  );
};

module.exports = {
  output
};
