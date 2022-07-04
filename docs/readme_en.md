# Glister

[![OSCS Status](https://www.oscs1024.com/platform/badge//loclink/glister.git.svg?size=small) ![](https://img.shields.io/badge/npm%20package-v0.0.3-yellow) ![](https://img.shields.io/badge/node->=16.15.0-blue?color=red&) ![](https://img.shields.io/badge/commander-v9.3.0-brightgreen) ![](https://img.shields.io/badge/inquirer-v8.2.4-green)  

> Glister 😎 is an interactive terminal tool for managing multiple Git users and performing other Git operations. If you're still looking for a solution for managing multiple Git users or switching users, try glister, it can help you manage multiple Git users and automatically identify whether the current working directory is a git repository to determine whether user switching affects local or global. It also helps you to create automatically in your project .gitignore file, you can choose to ignore the template based on the language type of the project development, currently supported: `nodejs` `python` `java`
>
> Read in other languages: ：[English](https://github.com/loclink/glister/blob/master/docs/readme_en.md) | 简体中文
>
> If you are using glister and feel that this tool is good, please leave a star to show you to the glister :heartpulse:



## Install：

``` shell
npm install glister -g
```



## Quick Start：

### 1. Help instructions :grimacing:：

Use `gt --help'` to see all the glister-related instructions, starting with the ones that are available～ 

```shell
➜  ~ gt --help
Usage: gt <command> [options]

Options:
  -v, --version   查看版本号
  -h, --help      显示命令帮助

Commands:
  lan             设置交互语言
  list            查看当前用户列表
  useradd         创建一个git用户
  rm              删除指定用户
  backup          备份当前正在使用的用户信息
  use             设置git用户，若当前工作目录非git仓库，将设置为git的全局用户
  ign             为本地git仓库添加.gitignore忽略文件
  help [command]  显示命令帮助

Other:
  可以使用完整指令 "glister" 替代 "gt"
```



### 2. First use :heart_eyes:：

It's worth noting that if you're new to Git and you haven't created a global user for Git, the `gt`or `glister` command will first ask you to create a global user, this is a must for glister, because Glister presupposes that you have Git installed and have created a global user for Git. When you don't have a global user, Glister will alert you and help you create one：

![Peek 2022-07-03 15-43](https://tvax2.sinaimg.cn/large/0087ufIQgy1h3ts9rb8hqg30oc0jb4qs.gif)



### 3. Set Language  :sunglasses:：

Glister default language is English, and the `gt lan` command can be used to switch languages. Currently, only 'English' and 'Simplified Chinese' are supported

```shell
PS E:\my_project\test-glister> gt lan
? Please select a language: 简体中文
语言切换成功，当前语言为：简体中文
```



### 4. Create a git user :wink:：

Glister allows you to create a new git user at any time, with the option of generating a key for that user and printing a public key for your remote repository：

![Peek 2022-07-03 16-21](https://tvax1.sinaimg.cn/large/0087ufIQgy1h3ttc0ttxxg30oc0jbn8a.gif)



### 5. Use git user :blush:：

Use the `gt use`directive to select a user from the current user list as the user of the current environment, setting the scope of the user to be different in different environments. If your current path is in the Git repository, then the `gt use` command only applies to the current repository, which is local, and if you are not currently in any Git repository, this action applies globally, which is global：

![Peek 2022-07-03 16-38](https://tvax4.sinaimg.cn/large/0087ufIQgy1h3tttv25qfg30oc0jbq9h.gif)

![Peek 2022-07-03 16-45](https://tva2.sinaimg.cn/large/0087ufIQgy1h3tu1ew1ghg30oc0jb7ds.gif)



### 6. View the current user status :astonished:：

If the user you are currently using is not saved to the Glister manager, the `gt list` command will prompt you that you need the current user to go to the Glister manager, in order to avoid losing the current user information, the backup operation is done using `gt backup` , after which you need to enter a group for the sake of management：

![Peek 2022-07-03 15-53](https://tvax4.sinaimg.cn/large/0087ufIQgy1h3tsiliy4hg30oc0jbjyc.gif)

A symbol appears when using the`gt list`command: 'something' marks the user's ge status in the current environment and is highlighted in green. Different repositories will automatically read the current user status, if you use different users in multiple projects, Glister will automatically help you identify your current environment, and clearly mark your current users, you can use the `gt list` in each project to see the status of the current user and the scope of the current user in 'global' or 'local' with different colors.

*If there are local users in the project, Git will give priority to local users as your current users, with local taking precedence over global*



### 7. Delete user :sweat_smile:：

Delete the created user using the ` gt rm`Directive：

![Peek 2022-07-03 16-56](https://tva2.sinaimg.cn/large/0087ufIQgy1h3tudktcjlg30oc0jbgr5.gif)



### 8. Create a .gitignore file in the repository :yum:：

Use the `gt ign`command to create an ignore file for your project from existing templates, currently available: `nodejs` `python` `java`and a normar template:

![动画5](https://tva4.sinaimg.cn/large/0087ufIQly1h3qejrapeqg30s50jxnjv.gif)



## Matters needing attention：

1. Delete operation is irreversible, can not retrieve the deleted user information, Key and user information non-binding relationship, delete user information will not delete the key created with it.
2. Glister checks for updates every three days, and if there is a new version, you need to manually perform `npm install glister -g` to update to the latest version.

## Log：

- #### v0.0.2 update to 2022/07/03

  - Distinguish between environments local and global, which set the user scope differently
  - Optimize the user list presentation style
  - Increase is not empty
  - New `pthon` `java` .gitignore template
  - 代码大量重构

- #### v0.0.1 update to 2022/6/30:

  - The user adds and deletes and toggles the current user
  - Print the list of users
  - Add an ignore profile for the local repository

***

## 联系：

- QQ：2285088054
- WX：coder7915

*The project is open source, welcomed the exchange of learning.*

