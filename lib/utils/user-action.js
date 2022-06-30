const config = require('../config');
const { writeGtrc } = require('./operation-file');

const addUser = async userInfo => {
  config.gtrcData.userGroup = {
    ...config.gtrcData.userGroup,
    ...userInfo
  };
  await writeGtrc();
};

const removeUser = async groupName => {
  delete config.gtrcData.userGroup[groupName];
  // 同步数据
  await writeGtrc();
};

// 过滤当前用户列表
const filterCurrentUserList = userList => {
  return userList.filter(item => item.name !== config.gitconfigData.user?.name);
};
module.exports = {
  addUser,
  removeUser,
  filterCurrentUserList
};
