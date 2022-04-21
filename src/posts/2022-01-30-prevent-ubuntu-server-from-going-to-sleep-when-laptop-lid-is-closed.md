---
draft: true
date: 2022-01-30T23:46:56.000+09:00
tags:
- laptop
- linux
- ubuntu
thumbnail: ''
title: Prevent Ubuntu Server from going to Sleep when Laptop Lid is Closed
excerpt: ''
slug: prevent-ubuntu-server-from-going-to-sleep-when-laptop-lid-is-closed

---
Recently I've been running a couple of tests on my old laptop to see whether it could replace my current home server. I installed ubuntu server and closed the lid, preparing to SSH into the laptop, to realize that I couldn't because the laptop went to sleep. You would think that when you install the server flavour they would disable sleep on lid close...

Fortunately an [ask ubuntu](https://askubuntu.com/questions/741271/disable-sleep-on-laptop-lid-close-in-tty1) post detailed the steps to disable such behavior:

```bash
$ sudo sed "s/^#*HandleLidSwitch=.*$/HandleLidSwitch=ignore/g" -i /etc/systemd/logind.conf
$ sudo systemctl restart systemd-logind.service
```
