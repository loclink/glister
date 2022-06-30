# Glister

![](https://img.shields.io/badge/npm%20package-v0.0.1-yellow)![](https://img.shields.io/badge/node->=16.15.0-blue?color=red&)![](https://img.shields.io/badge/commander-v9.3.0-brightgreen)![](https://img.shields.io/badge/inquirer-v8.2.4-green)

> glister😎 是一款方便管理多个 git 用户和完成其他一些 git 操作的便携工具，它能让你在开源项目和工作项目中自如的切换，如果你还在苦于寻找 git 多用户管理的解决方案，那么请尝试使用 glister 吧~😍。
>
> 使用其他语言阅读：

## 预览：

### 1.😺 添加一个 git 用户：

![动画](https://tva1.sinaimg.cn/large/0087ufIQly1h3qdx6pdw3g30cx0iodil.gif)

### 2. 😿 删除一个 git 用户：

![动画2](https://tvax4.sinaimg.cn/large/0087ufIQly1h3qe27abbvg30cx0a7dgq.gif)

### 3. 😾 查看用户信息列表：

![动画3](https://tva2.sinaimg.cn/large/0087ufIQly1h3qe5f6yfeg30cx0a7dg2.gif)

### 4. 😹 使用其他用户：

![动画4](https://tva2.sinaimg.cn/large/0087ufIQly1h3qecfgdqjg30cx0a7q4i.gif)

### 5. 😻 为本地仓库新增 git 忽略配置文件：

![动画5](https://tva4.sinaimg.cn/large/0087ufIQly1h3qejrapeqg30s50jxnjv.gif)

## 安装：

```shell
npm install glister -g
```

## 快速开始：

先来看看都有哪些指令吧 😬：

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

glister 的默认语言为英文，切换语言可以使用`gt lan`命令，目前仅支持："English"、"简体中文"：

```shell
PS E:\my_project\test-glister> gt lan
? Please select a language: 简体中文
语言切换成功，当前语言为：简体中文
```

如果你正在使用 git 并且已经配置了 global 的 name 和 email，那么在第一次使用 glister 时将会提示您需要备份已经添加的 global 配置信息，以免在下次切换用户时丢失当前用户信息：
