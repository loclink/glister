# Glister

![](https://img.shields.io/badge/npm%20package-v0.0.1-yellow) ![](https://img.shields.io/badge/node->=16.15.0-blue?color=red&) ![](https://img.shields.io/badge/commander-v9.3.0-brightgreen) ![](https://img.shields.io/badge/inquirer-v8.2.4-green)  

> Glister is a handy tool for managing multiple Git users and performing other Git operations. If you're still looking for a solution for managing multiple Git users or switching users, try glister, it allows you to switch between open source and work freely, without cumbersome configuration, without lengthy instructions, all operations will be done interactively in the terminal. :yum:
>
> Read in other languages: English | [简体中文](https://github.com/loclink/glister/blob/master/docs/readme_zh.md)  :eyes:

## Preview：

### 1. 😺 Add a git user:

![Peek 2022-07-01 00-24](https://tvax4.sinaimg.cn/large/0087ufIQgy1h3qqfzd7kbg30ov0j8tk1.gif)

### 2. 😿 To delete a git users:

![Peek 2022-07-01 00-26](https://tvax1.sinaimg.cn/large/0087ufIQgy1h3qqhdzg83g30ov0j8kjl.gif)

### 3. 😾 View the user information list:

![Peek 2022-07-01 00-27](https://tva2.sinaimg.cn/large/0087ufIQgy1h3qqibz2u2g30ov0j84mi.gif)

### 4. 😹 To use already created users:

![Peek 2022-07-01 00-28](https://tvax3.sinaimg.cn/large/0087ufIQgy1h3qqjm90l3g30ov0j87wi.gif)

### 5. 😻 Use the template for the local warehouse add. gitignore configuration file:

![Peek 2022-07-01 00-31](https://tva1.sinaimg.cn/large/0087ufIQgy1h3qqmvnic0g31bh0yr4da.gif)

## Install:

```shell
npm install glister -g
```

## Quick start:

Let's look at what are the instructions :grimacing: :

```shell
➜  my-project gt --help
Usage: gt <command> [options]

Options:
  -v, --version   print version number
  -h, --help      display help for command

Commands:
  lan             switch the language
  list            view current user list
  useradd         add a new git user
  backup          backup user information currently in use
  rm              delete the specified git user information
  use             select a user as the global user of GIT
  ign             add ignore file for local git repository
  help [command]  display subcommand help information

Other:
  You can also use the full command "glister" instead of "gt"
```

Glister default language is English, and the `gt lan'`command can be used to switch languages. Currently, only 'English' and 'Simplified Chinese' are supported :sunglasses:：

```shell
➜  my-project gt lan 
? 请选择语言： English
Language switching succeeded. Current language is: English
```

If you are using Git and have already configured, global name and email, the first time you use Glister you will be prompted to back up your current global configuration, to avoid losing global user information the next time you switch users, use `gt backup` to back up the current global user information :eyes:：

![Peek 2022-07-01 00-34](https://tvax3.sinaimg.cn/large/0087ufIQgy1h3qqpocog3g30oc0jb7wh.gif)

## Matters needing attention:

1. When new users, but for the users to add the key, when added to ` id_rsa_ ` joining together the user name of the group as a private key and the public.
2. Delete operation is not reversible, unable to retrieve user information has been deleted, relationship between the key and user information is not binding, will not delete the delete user information.
3. Glister check version updates once every 3 days, if there is new version needs you performed manually`npm install glister -g`Update to the latest version.

## Log:

- #### v0.0.1 Update on 2022/6/30:

  - Users to add and delete, and switch the current user.
  - Print the user list.
  - For the local warehouse add ignore configuration files.

***

## Contact me:

- QQ：2285088054
- WX：coder7915

*The project is open source, welcomed the exchange of learning.*

