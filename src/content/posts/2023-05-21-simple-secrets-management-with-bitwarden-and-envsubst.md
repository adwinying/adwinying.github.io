---
draft: false
date: 2023-05-21T20:07:16.000+09:00
tags:
- tutorial
- nix
- nixos
- secrets
- bash
- bitwarden
- envsubst
thumbnail:
title: Simple Secrets Management with Bitwarden and Envsubst
slug: simple-secrets-management-with-bitwarden-and-envsubst
excerpt: Existing secrets management solutions are complicated. Here's a simple one.

---

Managing secrets is hard. Existing solutions such as [Hashicorp Vault](https://www.hashicorp.com/products/vault) is too complicated, especially for personal use. If you think about it, we're all managing secrets already, with something called password managers (hope you're using one). Why not manage infrastructure secrets with our password managers?

## Concept

Ideally, I would like to utilize the password manager to store the secret values, which will then be used to bootstrap config files that will be used by various programs/services throughout the system. [Bitwarden](https://bitwarden.com/), which is my password manager of choice offers a feature called Secret Notes. Secret Notes lets you safely store any aribitrary text, which seems like a good fit to store the secret values. Next, a tool would be needed to replace some placeholder text with the secrets obtained from the password manager. [Envsubst](https://linuxhandbook.com/envsubst-command/) seems like a good candidate, where it can substitute bash variables with values defined via environment variables.

## Tying it altogether

I wrote a shell script that would bootstrap secrets for a given host:

```sh
#!/bin/sh

set -eu

CWD=$(realpath -e $(dirname $0))
HOSTNAME=$(hostname)
SECRET_NOTE_NAME="secrets.$HOSTNAME"
INPUT_DIR="$CWD/../secrets/$HOSTNAME"
OUTPUT_DIR="$HOME/.secrets"

# Get all secrets for host
SECRETS=$(bw get notes $SECRET_NOTE_NAME)

# Expose secrets as shell variables
set -a
eval "$SECRETS"
set +a

# Remove secrets directory if it exists
if [ -d $OUTPUT_DIR ]; then
  rm -rf $OUTPUT_DIR
fi

# Make a copy of the secrets directory
mkdir -p $(dirname $OUTPUT_DIR)
cp -r $INPUT_DIR $OUTPUT_DIR

# Temporarily change to output directory
pushd $OUTPUT_DIR > /dev/null

# Recursively loop through all files in output directory and replace all
# instances of $secret_name with the value of the corresponding shell variable
for file in $(find . -type f); do
  echo "Bootstrapping: $file"
  envsubst < $file > $file.tmp
  cat $file.tmp > $file
  rm $file.tmp
done

# Return to original directory
popd > /dev/null

echo "Done."
```
CODE: bootstrap-secrets.sh

This script assumes a couple of things:

- You run this script on each host to bootstrap the host's secrets
- A secret note named `secrets.[hostname]` exists with a valid .env format
- Config templates (input) are located in `~/.dotfiles/secrets/[hostname]`
- Bootstrapped configs (output) will be generated in `~/.secrets`
- You've already logged in to Bitwarden via the CLI. If not, run the following command:
  ```bash
  $ export BW_SESSION=$(bw login --raw)
  ```

## General Workflow

This is how the overall system will work:

1. Commit your config templates in a git repository
2. Clone the repository to ~/.dotfiles/secrets of the host that you want to boostrap
3. Login to Bitwarden CLI
4. Run `bootstrap-secrets.sh`

Your git repository should have a directory structure like so:

```
├── bootstrap-secrets.sh
└── secrets
    ├── host1
    │   ├── host1_config1
    │   └── host1_secret1
    ├── host2
    │   ├── host2_config1
    │   ├── host2_secret1
    │   ├── host2_secret2
    │   └── nested_config
    │       ├── nested_config1
    │       └── nested_config2
    └── host3
        ├── host3_secret1
        └── host3_secret2
```

## Examples

### Application config

Say I have an [rclone](https://rclone.org/) config file that contains credentials for a cloud provider that I want to use in a machine with hostname `foobar`. I would just commit the following into my git repository:

```
[mega]
type = mega
user = $MEGA_USER
pass = $MEGA_PASS
hard_delete = true
```

In Bitwarden, I would add the following to a secret note named `secrets.foobar`:

```
MEGA_USER=myuser
MEGA_PASS=mypassword
```

Then in `foobar`, I would run the following commands to generate the config file containing the actual secrets:

```bash
$ git clone /path/to/remote/git/repo ~/.dotfiles
$ export BW_SESSION=$(bw login --raw)
$ ~/.dotfiles/bootstrap-secrets.sh
```

This will generate the file in `~/.secrets/rclone.conf`. Finally, we generate a symlink to where the rclone config will be expected:

```bash
$ ln -s ~/.secrets/rclone.conf ~/.config/rclone/rclone.conf
```

### Shell scripts

Say I have a shell script that uses a secret to run a specific command. I would define a file containing just the secret:

```
$MY_SCRIPT_SECRET
```
CODE: my_script_secret.txt

Same for application configs, I would add the secret to the secret note:

```
MY_SCRIPT_SECRET=foobar
```

Bootstrapping steps are the same too:

```bash
$ git clone /path/to/remote/git/repo ~/.dotfiles/secrets
$ export BW_SESSION=$(bw login --raw)
$ ~/.dotfiles/bootstrap-secrets.sh
```

The secrets are then loaded into the bash script using `cat` command:

```bash
MY_SECRET=$(cat ~/.secrets/my_script_secret.txt)
```
