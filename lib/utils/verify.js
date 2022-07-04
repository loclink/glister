const fs = require('fs');
const shell = require('shelljs');
const dayjs = require('dayjs');
const isGit = require('is-git-repository');
const inquirer = require('inquirer');

const { program } = require('commander');
const { output } = require('./output');
const { writeGlisterrc } = require('./set-glisterrc');
const { useGlobalUser } = require('./set-git-config');

// 校验仓库版本
const verifyVersion = async () => {
  const config = program.config;
  const messageInfo = program.messageInfo;
  const nowTime = dayjs().format('YYYY-MM-DD');
  const lastCheckVersionTime = config.glisterrcConfig.config.lastCheckVersionTime;
  const checkUpdateCycle = config.glisterrcConfig.config.checkUpdateCycle;
  if (!lastCheckVersionTime || dayjs(nowTime).diff(lastCheckVersionTime, 'day') >= checkUpdateCycle) {
    let newVersionString = await shell.exec('npm view glister versions --json', { silent: true }).stdout;
    newVersionString = eval(newVersionString)
    if (typeof newVersionString === 'string' && newVersionString.trim() !== require('../../package.json').version) {
      output.warning(messageInfo.needUpdate + newVersionString.trim());
      output.warning(messageInfo.updateAction);
    } else if (newVersionString[newVersionString.length - 1] !== require('../../package.json').version) {
      output.warning(messageInfo.needUpdate + newVersionString[newVersionString.length - 1]);
      output.warning(messageInfo.updateAction);
    }
    // 记录上次检查更新的时间
    program.config.glisterrcConfig.config.lastCheckVersionTime = nowTime;
    await writeGlisterrc();
  }
};

// 校验当前用户是否有备份
const verifyBackup = config => {
  const isBackup = config.glisterUserList.find(
    item => item.name === config.currentUserInfo.name && item.email === config.currentUserInfo.email
  );
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

// 校验组名是否存在
const verifyGroupNameIsExist = (groupName, allUserList) => {
  return allUserList.find(item => item.group === groupName);
};

// 校验是否不存咋global用户
const verifyIsExistGlobalUser = async () => {
  const messageInfo = program.messageInfo;
  const globalGitConfig = program.config.globalGitConfig;
  if (!globalGitConfig.user?.name || !globalGitConfig.user?.email) {
    const prompt = inquirer.createPromptModule();
    const createGlobalUser = await prompt({
      name: 'confirmCreate',
      message: messageInfo.notGlobalUser,
      type: 'confirm',
      default: true
    });

    if (createGlobalUser.confirmCreate) {
      const createGlobalInquirerIssue = messageInfo.createUser.inquirerIssue.filter(item => item.name !== 'group');
      const globalUserInfo = await prompt(
        createGlobalInquirerIssue.map(item => ({ type: 'input', name: item.name, message: item.message }))
      );

      verifyNotEmpty(globalUserInfo);

      await useGlobalUser(globalUserInfo);

      output.succeed(messageInfo.createUser.actionSucceeded);
    } else {
      process.exit();
    }
  }
};

// 校验非空
const verifyNotEmpty = infoObj => {
  Object.keys(infoObj).forEach(key => {
    if (!infoObj[key]) {
      output.error(program.messageInfo.userInfoNotEmpty);
      process.exit();
    }
  });
};

module.exports = {
  verifyBackup,
  verifyProgramInstruction,
  verifyVersion,
  verifyGitRepository,
  verifyFileIsExist,
  verifyGroupNameIsExist,
  verifyIsExistGlobalUser,
  verifyNotEmpty
};
