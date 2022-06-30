# Glister

![](https://img.shields.io/badge/npm%20package-v0.0.1-yellow) ![](https://img.shields.io/badge/node->=16.15.0-blue?color=red&) ![](https://img.shields.io/badge/commander-v9.3.0-brightgreen) ![](https://img.shields.io/badge/inquirer-v8.2.4-green)  

> Glister 😎 是一款方便管理多个 git 用户和完成其他一些 git 操作的便携工具，如果你还在苦于寻找 git 多用户管理或更换用户的解决方案，那么请尝试使用 glister 吧，它可以让你在开源和工作中自如的切换 😍 无需繁杂的配置，无需冗长的指令，所有操作都将在终端交互式完成。
>
> 使用其他语言阅读：English | 简体中文

## 预览：

### 1. 😺 添加一个 git 用户：

![Peek 2022-06-30 22-59](https://tvax1.sinaimg.cn/large/0087ufIQgy1h3qnze58r9g30ov0j8b29.gif)

### 2. 😿 删除一个 git 用户：

![Peek 2022-06-30 23-01](https://tvax4.sinaimg.cn/large/0087ufIQgy1h3qo10u4czg30ov0j8b29.gif)

### 3. 😾 查看用户信息列表：

![Peek 2022-06-30 23-03](https://tvax2.sinaimg.cn/large/0087ufIQgy1h3qo2qdo0qg30ov0j84fv.gif)

### 4. 😹 使用已创建的用户：

![Peek 2022-06-30 23-04](https://tva4.sinaimg.cn/large/0087ufIQgy1h3qo409l28g30ov0j84qp.gif)

### 5. 😻 使用模板为本地仓库添加.gitignore配置文件：

![动画5](https://tva4.sinaimg.cn/large/0087ufIQly1h3qejrapeqg30s50jxnjv.gif)

## 安装：

```shell
npm install glister -g
```

## 快速开始：

先来看看都有哪些指令吧 :grimacing:：

```shell
PS E:\my_project\test-glister> gt --help
Usage: gt <command> [options]

Options:
  -v, --version   查看版本号
  -h, --help      显示命令帮助

Commands:
  lan             切换语言
  list            查看当前用户列表
  useradd         添加一个新的git用户
  backup          备份当前正在使用的用户信息
  rm              删除指定git用户信息
  use             选择一个用户作为git的global用户
  ign             为本地git仓库添加忽略文件
  help [command]  显示子命令帮助信息

Other:
  你还可以使用完整指令 "glister" 替代 "gt"
```

glister 的默认语言为英文，切换语言可以使用`gt lan`命令，目前仅支持："English"、"简体中文" :sunglasses:：

```shell
PS E:\my_project\test-glister> gt lan
? Please select a language: 简体中文
语言切换成功，当前语言为：简体中文
```

如果您正在使用 git 并且已经配置了 全局 的 name 和 email，那么在第一次使用 glister 时将会提示您需要备份当前全局配置信息，以免在下次切换用户时丢失全局用户信息，使用`gt backup`来备份当前全局用户信息 :eyes:：

![Peek 2022-06-30 22-14](https://tva1.sinaimg.cn/large/0087ufIQgy1h3qmoy0hyvg30ov0j8x6p.gif)

## 注意事项：

1. 新增用户时，可为此用户添加key，添加时将以`id_rsa_`拼接该用户的group名称作为私钥和公钥的文件名。写入至路径`~/.ssh/`中，key的邮箱为该用户的email。
2. 删除操作是不可逆的，无法找回已被删除的用户信息，key与用户信息非绑定关系，删除用户信息不会删除与之一同创建的key。
3. glister每3天检查一次版本更新，若存在新的版本需要您手动执行`npm install glister -g`更新至最新版。

## 日志：

- #### v0.0.1更新于2022/6/30:

  - 用户添加和删除以及切换当前用户
  - 打印用户列表
  - 为本地仓库添加忽略配置文件

***

## 联系：

- QQ：2285088054
- WX：coder7915

*本项目开源，欢迎交流学习。*

