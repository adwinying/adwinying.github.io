---
draft: false
date: 2024-02-23T00:49:24.000+09:00
tags:
- servers
- nixos
- tailscale
thumbnail:
title: Automatically Connect to Tailscale in NixOS with OAuth Secrets
excerpt: A workaround to connec to tailscale programatically without auth keys expiring.
slug: automatically-connect-to-tailscale-in-nixos-with-oauth-secrets

---

On my NixOS powered machines, I wanted the machines to automatically connect to Tailscale. Usually, you would need to authenticated via a web browser in order to add a device to Tailscale. You could bypass (for automation purposes etc.) using an auth key, but auth keys only have a max validity of 90 days. If I were to reinstall NixOS after that the auth key would cease to work and I'll need to regenerate the key, which isn't very ideal. As a result, I just opted to manually authenticate every NixOS machine I own.

Recently, I came across [a Tailscale blog post on how to add docker containers to Tailscale](https://tailscale.com/blog/docker-tailscale-guide). It turns out, apart from auth keys, you can also use an OAuth secret to authenticate with Tailscale.

## Auth Keys vs OAuth Secret

[As summarized by the blog post mentioned above](https://tailscale.com/blog/docker-tailscale-guide#should-i-use-auth-keys-or-oauth-secrets), OAuth secrets do not expire, but you must assign a tag to the machines authenticated via OAuth secrets. Tagged machines have a different set of access control rules applied, so you'll need to set those rules. After updating the ACL file, I was able to recover most of the features, except for SSH-ing to untagged machines. At the time of writing, there is no way to allow tagged machines to SSH to untagged machines, but it is a tradeoff that I'm willing to make.

## Setting it up

### Step 1: Creating a new tag in Tailscale

[Go to Tailscale dashboard > Access control](https://login.tailscale.com/admin/acls/file), and add the following to the ACL file:

```json
{
  // Define the tags which can be applied to devices and by which users.
	"tagOwners": {
		"tag:nixos": ["autogroup:admin"],
	},
}
```

### Step 2: Allow SSH to and from tagged machines

In the same ACL file, we add the two entries below to SSH to and from tagged machines via Tailscale SSH without authenticating. As mentioned before, SSH from a tagged machine to an untagged one is unsupported.

```json
{
  "ssh": [
    {
      // SSH without authenticating
      "action": "accept",
      // SSH from untagged machines
      "src":    ["autogroup:member"],
      // SSH to untagged machines owned by the same user and all tagged machines
      "dst":    ["autogroup:self", "autogroup:tagged"],
      // Allow all SSH users except root
      "users":  ["autogroup:nonroot"],
    },
    {
      // SSH without authenticating
      "action": "accept",
      // SSH from tagged machines
      "src":    ["autogroup:tagged"],
      // SSH to all tagged machines
      "dst":    ["autogroup:tagged"],
      // Allow all SSH users except root
      "users":  ["autogroup:nonroot"],
    },
  ],
}
```

### Step 3: Enable Tailscale daemon in NixOS 

Add the following in your NixOS config:

```nix
{ pkgs, ... }: {
  services.tailscale.enable = true;

  # use the latest and greatest version of tailscale
  services.tailscale.package = pkgs.unstable.tailscale;
}
```

### Step 4: Add systemd Startup Script

I stole the example found in [Tailscale's blog on how to set up Minecraft in NixOS with Tailscale](https://tailscale.com/blog/nixos-minecraft) and tweaked it like so:

```nix
  # create a oneshot job to authenticate to Tailscale
  systemd.services.tailscale-autoconnect = {
    description = "Automatic connection to Tailscale";

    # make sure tailscale is running before trying to connect to tailscale
    after = [ "network-pre.target" "tailscale.service" ];
    wants = [ "network-pre.target" "tailscale.service" ];
    wantedBy = [ "multi-user.target" ];

    # set this service as a oneshot job
    serviceConfig.Type = "oneshot";

    # have the job run this shell script
    script = with pkgs; ''
      # wait for tailscaled to settle
      sleep 2

      # authenticate with tailscale
      ${tailscale}/bin/tailscale up --auth-key=$TAILSCALE_AUTH_KEY
    '';
  };
```

Where `$TAILSCALE_AUTH_KEY` is a secret that is managed by the [NixOS secrets manager of your choice](/simple-secrets-management-with-bitwarden-and-envsubst).

## Full Example

A real life example could be found in [my dotfiles repository](https://github.com/adwinying/dotfiles/commit/cd3b0bf3e1e88bd145faf4842df2c8d04189b9b5). I've added a few Nix options so I could toggle specific options for different machines.
