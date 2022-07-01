const fs = require('fs');
const shell = require('shelljs');
const dayjs = require('dayjs');
const isGit = require('is-git-repository');

const config = require('../config');
const { output } = require('./output');
const { writeGtrc } = require('./operation-file');
const { getCurrentGitUser } = require('../utils/run-command');
// 校验仓库版本
const verifyVersion = () => {
  return new Promise((resolve, reject) => {
    const nowTime = dayjs().format('YYYY-MM-DD');
    const lastCheckVersionTime = config.gtrcData.config.lastCheckVersionTime;
    const checkUpdateCycle = config.gtrcData.config.checkUpdateCycle;
    if (!lastCheckVersionTime || dayjs(nowTime).diff(lastCheckVersionTime, 'day') >= checkUpdateCycle) {
      shell.exec('npm view glister versions', { silent: true }, (code, stdout, stderr) => {
        if (stdout.trim() !== require('../../package.json').version) {
          output.warning(config.languageConfig.needUpdate + stdout.trim());
          output.warning(config.languageConfig.updateAction);
        }
        // 记录上次检查更新的时间
        config.gtrcData.config.lastCheckVersionTime = nowTime;
        // 写入配置
        writeGtrc();

        resolve();
      }).stdout;
    } else {
      resolve();
    }
  });
};

// 校验当前用户是否有备份
const verifyBackup = async notMessage => {
  // const globalConf = config.gitconfigData.user;
  config.currentUser = await getCurrentGitUser();
  if (!config.currentUser.name) return;
  const isBackup = config.gtrcUserGroupList.find(
    item => item.name === config.currentUser.name && item.email === config.currentUser.email
  );
  if (!isBackup) output.warning(notMessage);
  return isBackup;
};

// 校验程序指令是否存在
const verifyProgramInstruction = (instruction, notMessage) => {
  if (!shell.which(instruction)) {
    output.error(notMessage);
    process.exit();
  }
};

// 校验当前是否在git仓库中
const verifyGitRepository = noRepository => {
  if (!isGit() && noRepository) {
    output.error(noRepository);
    process.exit();
  } else {
    return isGit();
  }
};

// 校验指定路径下是否存在同名文件
const verifyFileIsExist = filePath => {
  return fs.existsSync(filePath);
};

module.exports = {
  verifyBackup,
  verifyProgramInstruction,
  verifyVersion,
  verifyGitRepository,
  verifyFileIsExist
};
