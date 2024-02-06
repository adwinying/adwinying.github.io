---
draft: false
date: 2024-02-06T15:30:15.000+09:00
tags:
- docker
- nix
- nixos
- flakes
thumbnail:
title: Building a Docker Image using Nix Flakes
excerpt: Some additional flags need to build an image with Nix flakes.
slug: building-a-docker-image-using-nix-flakes

---

Building a docker image using nix is great as dependencies are always bundled together in nix. By using nix, you don't need to find out and install the missing dependencies that are not on the base images, which saves quite a considerable time debuging docker images.

However, while building with nix in docker I came across this error message:

```
error: unable to load seccomp BPF program: Invalid argument
```

[According to this Github issue](https://github.com/DeterminateSystems/nix-installer/issues/324), this error occurs when nix is running inside an emulated environment (ie. an architecture different from the one running natively on your machine). This can be solved by appending `filter-syscalls = false` to the nix config. Note that this may be a security risk, but for running inside containers this seems to be an acceptable one.

In a Dockerfile, here's how you would apply to your image's nix config:

```dockerfile
FROM nixos/nix:latest AS builder

RUN echo "experimental-features = nix-command flakes" >> /etc/nix/nix.conf \
  && echo "filter-syscalls = false" >> /etc/nix/nix.conf

# add your commands here
```
