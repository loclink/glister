const fs = require('fs');
const ini = require('ini');
const { program } = require('commander');
// 写入glisterrc
const writeGlisterrc = async () => {
  await fs.writeFileSync(program.config.gtrcPath, ini.encode(program.config.glisterrcConfig));
};

// 设置语言
const setLanguage = async (config, lang) => {
  switch (lang) {
    case 'English':
      config.glisterrcConfig.config.lang = 'en';
      break;
    default:
      config.glisterrcConfig.config.lang = 'zh';
      break;
  }
  await writeGlisterrc();
};

// 创建用户
const createUser = async (config, newUserInfo) => {
  config.glisterrcConfig.userGroup = {
    ...config.glisterrcConfig.userGroup,
    [newUserInfo.group]: {
      name: newUserInfo.name,
      email: newUserInfo.email
    }
  };
  config.glisterUserList = program.getGlisterUserList(config.glisterrcConfig);
  config.allUserList = program.getAllUserList(config.glisterUserList, config.globalGitConfig);
  await writeGlisterrc();
};

// 删除用户
const removeUser = async (group, config) => {
  delete config.glisterrcConfig.userGroup[group];
  // 同步数据
  await writeGlisterrc();
};

module.exports = {
  setLanguage,
  createUser,
  removeUser,
  writeGlisterrc
};
