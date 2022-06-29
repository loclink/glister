const config = require('../config');
const { writeGtrc } = require('./update-gtrc');

const addUser = userInfo => {
  config.gtrcData.userGroup = {
    ...config.gtrcData.userGroup,
    ...userInfo
  };
  writeGtrc();
};

const deleteUser = () => {};

module.exports = {
  addUser,
  deleteUser
};
