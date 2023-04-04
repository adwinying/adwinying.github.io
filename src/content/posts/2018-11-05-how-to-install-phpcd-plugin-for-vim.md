---
draft: false
date: 2018-11-05T23:23:18.000+09:00
tags:
- tutorial
- vim
- php
- dotfiles
thumbnail:
title: How to Install phpcd Plugin for vim
excerpt: phpcd is an autocomplete plugin for vim that integrates well with deoplete.
slug: how-to-install-phpcd-plugin-for-vim

---
[phpcd](https://github.com/lvht/phpcd.vim) is a autocompletion plugin for vim. It integrates well with [deoplete](https://github.com/Shougo/deoplete.nvim#configuration), providing useful suggestions when coding in php.

## Requirements

* msgpack php extension
* pcntl php extension

## Configuring on macOS

### Step 1: Install PHP via brew

As the stock PHP bundled with macOS does not include pcntl, we install a build of php from homebrew which comes with pcntl preinstalled.

```bash
$ brew install php
```

Make sure the php path is updated:

```bash
$ which php
# /usr/local/bin/php << expected output1
```

### Step 2: Install msgpack php extension via pecl

If you install php via brew, pecl should also come pre-installed:

```bash
$ pecl install msgpack
```

Confirm msgpack is install by running

```bash
$ php -m
```

and make sure `msgpack` is displayed on the output

### Step 3: Install phpcd

Follow the installation instructions on the [Github repo](https://github.com/lvht/phpcd.vim). Install using your favorite plugin manager and add the necessary configs to your vimrc file.

If it's not working, you might need to manually run `composer install` in the phpcd.vim directory...

### Bonus: Laravel Facades support

If you have a Laravel project, you could have facades autocompletion support with the [Laravel IDE Helper](https://github.com/barryvdh/laravel-ide-helper) composer package. Refer to this [issue](https://github.com/lvht/phpcd.vim/issues/135) to set it up.
