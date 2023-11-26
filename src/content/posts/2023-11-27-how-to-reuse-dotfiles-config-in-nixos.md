---
draft: false
date: 2023-11-27T14:43:11.000+09:00
tags:
- nixos
- nix
- dotfiles
- vim
- lazygit
- tutorial
thumbnail:
title: How to Reuse Dotfiles config in NixOS
slug: how-to-reuse-dotfiles-config-in-nixos
excerpt: Here's a trick to reuse existing dotfiles in your NixOS setup.

---

NixOS is great and I've migrated most of my linux boxes to NixOS. Nix allows you to configure application-specific settings, removing the need to host a separate doftfiles repository. However, there are still machines like my MacBooks that I prefer to run whatever OS that it came with, and ideally I would like them to share the same dotfiles among them. Instead of configuring each application via nix, I choose to symlink the configs via `home-manager`:

```nix
{ config, ... }: {
  # take lazygit for example
  home.packages = [ pkgs.lazygit ];
  xdg.configFile.lazygit.source = config.lib.file.mkOutOfStoreSymlink "/path/to/dotfiles/dir/lazygit";
}
```

This will create a symlink from `/path/to/dotfiles/dir/lazygit` to `~/.config/lazygit`.

For dotfiles that are placed outside of `~/.config`, the following config will work instead:

```nix
{ config, ... }: {
  # take vim for example
  home.packages = [ pkgs.vim ];
  home.file.".vimrc".source = config.lib.file.mkOutOfStoreSymlink "/path/to/dotfiles/dir/vim/.vimrc";
}
```

This will create a symlink from `path/to/dotfiles/dir/vim/.vimrc` to `~/.vimrc`.
