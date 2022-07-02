const os = require('os');
const fs = require('fs');
const path = require('path');
const ini = require('ini');
const shell = require('shelljs');
const isGit = require('is-git-repository');
const parseGitConfig = require('parse-git-config');
const messageInfo = require('./lang');
const { program } = require('commander');
program.getBasicConfigData = () => {
  // 属主目录
  const homeDir = os.homedir();
  // .ssh 目录
  const sshKeyDir = path.resolve(homeDir, '.ssh/id_rsa_');
  // .gitconfig目录
  const gitConfigPath = path.resolve(homeDir, '.gitconfig');
  // .glisterrc
  const gtrcPath = path.resolve(homeDir, '.glisterrc');

  const isGitRepository = isGit();
  return {
    homeDir,
    sshKeyDir,
    gtrcPath,
    gitConfigPath,
    isGitRepository
  };
};

// 获取当前仓库路径
program.getCurrentRepositoryPath = async () => {
  const currentRepositoryPath = await shell.exec(`git rev-parse --show-toplevel`, { silent: true }).stdout;
  return currentRepositoryPath.trim();
};

// 获取当前仓库的config数据 没有则返回空对象
program.getCurrentRepositoryConfig = async repositoryPath => {
  // const config = parseGitConfig.expandKeys(ini.parse(localConfig));
  if (!repositoryPath) return {};
  const repositoryConfigPath = path.resolve(repositoryPath, './.git/config');
  const repositoryIniConfig = ini.parse(await fs.readFileSync(repositoryConfigPath, 'utf-8').toString());
  const repositoryConfig = parseGitConfig.expandKeys(repositoryIniConfig);
  return repositoryConfig;
};

// .glisterrc
program.getGlisterrcConfig = async glisterrcPath => {
  const glisterrcConfig = (await fs.existsSync(glisterrcPath))
    ? ini.parse(await fs.readFileSync(glisterrcPath, 'utf-8').toString())
    : {};
  return program.initGlisterrcConfig(glisterrcConfig);
};

// 初始化glisterrc 的 config 属性
program.initGlisterrcConfig = glisterrcConfig => {
  const config = {
    checkUpdateCycle: 3,
    lang: 'en',
  };
  glisterrcConfig.config = {
    ...config,
    ...glisterrcConfig.config
  };
  return glisterrcConfig;
};

// 获取git全局配置信息
program.getGlobalGitConfig = async gitConfigPath => {
  if (!fs.existsSync(gitConfigPath)) {
    return {};
  }
  const GlobalGitConfig = ini.parse(await fs.readFileSync(gitConfigPath, 'utf-8').toString());
  return GlobalGitConfig;
};

// 获取当前git用户信息
program.getCurrentGitUser = (currentRepositoryConfig, globalGitConfig) => {
  let scopeType = 'global';
  const name = currentRepositoryConfig.user?.name || globalGitConfig.user?.name || null;
  const email = currentRepositoryConfig.user?.email || globalGitConfig.user?.email || null;
  if (currentRepositoryConfig.user?.name) scopeType = 'local';
  return {
    name,
    email,
    scopeType
  };
};

// 获取glister保持的用户列表
program.getGlisterUserList = glisterrcConfig => {
  return Object.keys(glisterrcConfig.userGroup || {}).map(groupName => {
    return {
      group: groupName,
      name: glisterrcConfig.userGroup[groupName]?.name,
      email: glisterrcConfig.userGroup[groupName]?.email
    };
  });
};

// 获取所有用户列表
program.getAllUserList = (glisterUserList, globalGitConfig) => {
  const userList = [...glisterUserList];
  userList.unshift({
    group: 'global',
    name: globalGitConfig.user?.name,
    email: globalGitConfig.user?.email
  });

  return userList;
};

// 过滤当前用户列表
program.getFilterCurrentUserList = (glisterUserList, currentUserInfo) => {
  if (glisterUserList.length <= 1) return glisterUserList;
  return glisterUserList.filter(item => item.name !== currentUserInfo.name);
};

const loadConfig = async () => {
  const basicConfig = program.getBasicConfigData();
  const currentRepositoryPath = await program.getCurrentRepositoryPath();
  const currentRepositoryConfig = await program.getCurrentRepositoryConfig(currentRepositoryPath);
  const glisterrcConfig = await program.getGlisterrcConfig(basicConfig.gtrcPath);
  const globalGitConfig = await program.getGlobalGitConfig(basicConfig.gitConfigPath);
  const currentUserInfo = program.getCurrentGitUser(currentRepositoryConfig, globalGitConfig);
  const glisterUserList = program.getGlisterUserList(glisterrcConfig);
  const allUserList = program.getAllUserList(glisterUserList, globalGitConfig);
  const filterUserList = program.getFilterCurrentUserList(glisterUserList, currentUserInfo);

  return {
    ...basicConfig,
    currentRepositoryPath,
    currentRepositoryConfig,
    glisterrcConfig,
    globalGitConfig,
    currentUserInfo,
    allUserList,
    filterUserList,
    glisterUserList
  };
};

const reloadConfig = async () => {
  program.config = await loadConfig();
};

Object.defineProperty(program, 'messageInfo', {
  get() {
    return messageInfo[program.config.glisterrcConfig.config.lang];
  }
});

module.exports = reloadConfig;
