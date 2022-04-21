---
draft: true
date: 2022-01-30T23:56:51.000+09:00
tags:
- tutorial
- backup
- kopia
- rclone
thumbnail: ''
title: How to set up File Backups with Kopia + Rclone
excerpt: ''
slug: how-to-set-up-file-backups-with-kopia-rclone

---
I was attempting to restore my backups from [Duplicati](https://duplicati.com) but it kept failing for unknown reasons. Fortunately it was just a test and I still had my original copy intact. A quick search seems to show people have been moving away from duplicati in favor of other solutions like [Duplicacy](https://duplicacy.com) and [Restic](https://restic.net). Many people had vouched for [Kopia](https://kopia.io) so I tried it out.

Kopia is a golang-based backup program. It supports most features that a typical backup solution support, including encrypted backups and incremental backups. Kopia also supports backing up to cloud storage providers via [Rclone](https://rclone.org) as well as object storage providers such as AWS's S3.

## Setting up Rclone

Before setting up Kopia, we need to first set up Rclone. Rclone enables file syncing between major cloud providers and your local filesystem.

Rclone can be install via apt but it seems like not all cloud providers are supported. As an alternative I installed Rclone via the bash script that they provided:

```bash
$ curl https://rclone.org/install.sh | sudo bash
```

Setting up Rclone is pretty straightforward. Just run the following command and Rclone will guide you through the configuration process.

```bash
$ rclone config
```

Rclone saves all the configuration data into `~/.config/rclone/rclone.conf`.

## Setting up Kopia

With Rclone set up, we can proceed to setting up Kopia. First, we install Kopia via `apt`:

```bash
$ sudo apt install kopia
```

Then, we create a repository, which we specify the backup destination and also initializes the files required for kopia to keep track of the backup snapshots. In my case, I set up a remote with rclone called `mega` which uses [MEGA](https://mega.nz) as the backup destination, and I wanted to save all the backup data in a directory in MEGA called `kopia`:

```bash
$ kopia repository create rclone --remote-path=mega:/kopia
```

We then run the following command to make sure kopia is functioning properly:

```bash
$ kopia repository validate-provider 
```

Kopia comes with pretty sane defaults out of the box. But compression is not enabled by default hence we enable it with the following command:

```bash
$ kopia policy set --global --compression=pgzip
```

Kopia provides other compression methods which are [detailed here](https://kopia.io/docs/advanced/compression/).

## Creating a backup snapshot

Creating a snapshot is really simple. All it takes is just a single command:

```bash
$ kopia snapshot create path/to/backup/dir
```

The first backup takes a while to complete. The time taken to backup varies with the size of the directory and also backup destination. For me a 10GB directory took around 40 minutes.

Subsequent backups took around 3 minutes as Kopia compares with the existing backup and only re-uploads the difference.

## Restoring a backup snapshot

Assuming that we're restoring from a different device, we would first need to set up Rclone and Kopia again. Repeat the same setup as before before proceeding.

Then, we first list out the available snapshots that we had made:

```bash
$ kopia snapshot list
adwin@thenas:/home/adwin/testdir                                                           2022-01-26 02:02:16 JST kdee0f71b89c000704fb66ed1810d4c1c 526.1 MB drwxr-xr-x files:12910 dirs:2049 (latest-2..5,daily-2)
  + 3 identical snapshots until 2022-01-26 11:00:06 JST
  2022-01-30 15:47:03 JST k9240a5a786392e75209476659b9d2bb4 528.1 MB drwxr-xr-x files:12910 dirs:2049 (latest-1,hourly-1,daily-1,weekly-1,monthly-1,annual-1)
```

We then state the snapshot ID (the string after the timestamp) that we want to restore, along with the restore destination directory:

```bash
$ kopia snapshot restore kdee0f71b89c000704fb66ed1810d4c1c path/to/restore/dir
```

This method of restore works for small backups, but it takes a significantly long time to restore compared to backup. A 300MB backup took around 45 minutes to restore, which is a bit too long in my opinion.

However, attempting to restore the 10GB backup kept getting stuck midway. [This post from the Kopia forums](https://kopia.discourse.group/t/rclone-restores-very-slowly/162/3) suggests that we first make a local copy of the repository using `rclone sync` and restore from it:

```bash
$ rclone sync --transfers=8 -P mega:/kopia path/to/kopiarepo
$ kopia repo connect filesystem --path path/to/kopiarepo
$ kopia restore <snapshot id> path/to/restore/dir
```

I ran `rclone sync` with 8 simultaneous transfers (8 seems to be the sweet spot) and show the sync progress with `-P`. `rclone sync` will resume from where it left off if it got interrupted. I find it really useful as the syncing process tend to get stuck halfway (Most cloud storage providers seems to block downloads if you download too much in a short period of time).

### Rclone sync with various cloud storage providers

To see which cloud provider would be suitable for Kopia backups I tested Google Drive, Microsoft OneDrive and MEGA.

#### Google Drive

Google Drive starts off strong (with speeds of \~3MB/s) for around 30 files or so before getting stuck. I recommend downloading from the web interface, which zips the directory contents in chunks of 2GB instead of using `rclone sync`.

#### Microsoft OneDrive

OneDrive only allows 2-4 simultaneous downloads but at pretty high speeds (\~3MB/s). However, OneDrive sync sometimes do get stuck, probably due to rate limiting. On one attempt I managed to download a \~5GB repository in 3 minutes.

#### MEGA

MEGA allows for simulatenous downloads. All 8 transfers were working at the same time, but speeds are limited to \~300KB/s for each download stream.

Regardless of cloud provider, if you ever get rate limited it is probably better to retry again after a couple of hours.