---
draft: false
date: 2022-08-19T10:47:36.000+09:00
tags:
- vim
- dotfiles
thumbnail: ''
title: A single command to load your vim configs from anywhere
excerpt: Is it just me, or the urge to load my vim config on a remote server is real?
slug: a-single-command-to-load-your-vim-configs-from-anywhere

---

As a vim user, don't you wish you can load your vim configs in a remote server somewhere?

My vim configs are managed in my [dotfiles repository](https://github.com/adwinying/dotfiles), but it's not worth the effort to clone a whole repository just to edit a file or two on the server. You could [edit a remote file from your local vim instance](https://unix.stackexchange.com/questions/202918/how-do-i-remotely-edit-files-via-ssh), but what if you're already in the remote server, with the file already opened?

## TL;DR

Run this command in vim to load my basic vim config (will be loaded every time you launch vim):

```
:so https://iadw.in/vimrc
```

Run this command in vim to load my basic vim only for your current session:

```
:so https://iadw.in/vimrc.tmp
```

## Sourcing a remote file

Turns out, vim (not vimscript) supports sourcing configs from a remote path. If you have your config files on `https://example.org/vimrc`, you can load the configs by entering the following command in normal mode:

```
:source https://example.org/vimrc
```

With this, you could get the raw path of your `vimrc` from your Github repository and load it easily. But the process becomes tedious if you split your configs into multiple files, not to mention the number of keystrokes to load your own config is just too much...

## A vimscript file to load your configs

For my configs, I need at least two files for a bare minimum setup, sans the plugins. I used a vimscript to download the two files using `curl` and sourced the downloaded files:

```vimscript
silent execute '!curl https://raw.githubusercontent.com/adwinying/dotfiles/master/vim/.vim/basic.vim https://raw.githubusercontent.com/adwinying/dotfiles/master/vim/.vim/colors/nord.vim > ~/.vimrc'
source ~/.vimrc
```

Ideally, you would put a script like this in a easily memorable URL (bonus points for a short one!). In my case I used my personal domain which is short and easily memorable, so all I need to do is to run the following comnmand:

```
:source https://iadw.in/vimrc
```

In addition, I also prepared a temporary version in case I don't want the configs to remain after exiting vim:

```
:source https://iadw.in/vimrc.tmp
```
