---
draft: false
date: 2021-02-06T23:30:12.000+09:00
tags:
- vfio
- vm
- linux
- macos
- windows
- pc
thumbnail: ''
title: My Experience with VFIO + Single GPU Passthrough
excerpt: Summed up my experience setting up VFIO on an Arch Linux desktop.
slug: my-experience-with-vfio-single-gpu-passthrough

---
## Desktop Specs

* **Processor:** AMD Ryzen 7 3700X
* **RAM:** Klevv 2x16GB 3200MHz DDR4
* **Motherboard:** MSI microATX B550 Mortar WIFI
* **GPU:** Sapphire Pulse Radeon RX580 8GB
* **SSD:** Samsung 970EVO 1TB NVME
* **HDD:** Some Toshiba 2.5" 1TB ripped from my old laptop
* **PSU:** SilverStone SFX-L 80+ Gold 500W
* **Host OS:** Arch Linux with latest stable/LTS kernel
* **Guest OS:** Windows 10, macOS Big Sur

## Guides Used

* [joeknock90's Single GPU Passthrough Guide](https://github.com/joeknock90/Single-GPU-Passthrough)
* [ArchWiki's VFIO Guide](https://wiki.archlinux.org/index.php/PCI_passthrough_via_OVMF)

## Great IOMMU groups on this motherboard

Doing some research on VFIO compatibility with B550 motherboard seems to show that IOMMU groups aren't good, but I still went with B550 anyways.

Surprise surprise, IOMMU groups were great. The GPU's PCI slot, and 1 of 2 USB controllers is on its own IOMMU group. No ACS patch override needed. (More on USB controller passthrough later)

## Patched kernel/Old BIOS version unnecessary

Some guides like [this one from PassthroughPOST](https://passthroughpo.st/mac-os-vm-guide-part-2-gpu-passthrough-and-tweaks/) seem to suggest that a patched kernel or an old BIOS version is needed to successfully perform GPU passthrough.

As a precaution I did not update my BIOS and GPU passthrough worked. I looked into the BIOS AGESA version and it turned out to be 1.3.0. Updated to the latest version (1.5.0 at this time of writing) and it still works.

## GPU Bios Patch

joeknock90's guide has included procedures on GPU ROM patching for Nvdia cards, but had stated nothing about AMD cards. Happy to report that AMD does not need to do any ROM patching.

## No need for libvirt hooks

I tried setting up hooks, but there was a 50/50 chance of the script triggering a Segmentation Fault error, causing the whole system to become unresponsive. [This reddit post](https://www.reddit.com/r/VFIO/comments/dc3mu3/rx580_my_experiences_in_passthrough/) seem to suggest that did single GPU passthrough with RX580 stated that the hooks were unnecessary. Commented out all the scripts and 10 out of 10 times, the VM boots up successfully.

## No display manager? Just ensure xorg isn't running

Most tutorials would suggest killing the display manager but what if you don't use a display manager or desktop environment? If you booted up a graphical interface via xorg (`startx` command) just make sure its not running or you'll just return to a blank screen when you turn off your VM.

## vendor-reset may be needed?

[vendor-reset](https://www.reddit.com/r/VFIO/comments/jturbd/vendorreset_new_project_to_help_amd_users_vfio/) is a project that aims to help prevent GPU reset issues. I thought it would let me run xorg in the background while running a VM but turns out that's impossible as you can't just suddenly yank the GPU from xorg or it'll crash (thanks [VFIO Discord](https://www.reddit.com/r/VFIO/comments/5b5znr/click_here_to_join_the_vfio_discord_server/) for pointing that out!).

Didn't bother removing it so it may or may not have help with the reset bug, I can't really tell.

## evdev only worked 10% of the time for my mouse

evdev didn't seem to work with my mouse (Logitech MX Master 2) most of the time. Tried all sorts of things (unplug/plug USB etc.) between reboots but no avail. Gave up and used USB passthrough instead. USB passthrough worked great until you need to hotplug a device. So I tried to passthrough one of my USB controllers.

## USB Controller Passthrough

It is generally recommended that a dedicated USB PCIe card is used for pass through. Most users that tried passing through the motherboard's built in USB controller seems to have reset issues. Nevertheless I gave it a try and suprisingly works flawlessly, even surviving reboots.

![I/O layout of an MSI B550 MORTAR WIFI motherboard](/uploads/desktop-io.png "On the MSI B550 MORTAR WIFI, red ports are on one USB controller, and the blue ports + front ports are on another controller")

## First, start by running a Windows VM

My ultimate goal is to get a functional macOS build running. But to get a general feel of setting up a VM on linux, it is better to start by getting a working Windows VM.

Windows in a VM is well supported and documented. Few bumps and hiccups along the way (more on that below), but mostly a smooth process.

## VFIO drivers for Windows

Got the pre-compiled (and signed) VFIO drivers for Windows from Fedora (via the ArchWiki). The ISO download was painfully slow. Fortunately KVM supports floppy disk mounting so I went with the much smaller floppy image instead.

## Windows 10 Ameliorated

My plan was to use the Windows VM for only gaming so I thought a stripped down, "clean" version of Windows would be better for my use case. Installed Windows 10 AME but I feel it's too stripped down for me. I think a vanilla Windows 10 install + a [debloat script](https://github.com/bmrf/tron/blob/master/README.md) would work better for me.

## Windows 10 GPU Passthrough

Passed through the GPU to the Windows 10 VM, installed the latest AMD GPU drivers and fired up Tomb Raider. Cranked it up to max settings and played for a couple of hours. Works flawlessly.

## Moving on to macOS VM

Time for the main event. There's a couple projects that aims to help easily set up a macOS VM on linux. I tried [foxlet's macOS-Simple-KVM](https://github.com/foxlet/macOS-Simple-KVM) project and [kholia's OSX-KVM](https://github.com/kholia/OSX-KVM). Both works great before passing through the GPU.

## Remember to turn on CSM in BIOS!

For weeks I tried to passthrough my GPU to the macOS VM but it just gets stuck in the bootloader. It took too much time so I took a break and tried again. Did a whole lot of googling, and reread all the tutorials/guides that I could find...

Until I came across [PassthroughPOST's Guide on GPU Passthrough](https://passthroughpo.st/explaining-csm-efifboff-setting-boot-gpu-manually/),  
and realized that CSM was not enabled. RTFM kids.

## VMWare display device couldn't be turned off

OSX-KVM's libvirt XML config came with `vmware-svga` enabled. Tried to remove it but macOS boots up with a blank screen, even with a GPU vBIOS ROM file configured.

In the end I just left it in, but I could not see the OpenCore menu at all. I just press enter and hope that the macOS login screen appears. Also macOS now thinks there are two different displays connected so I just set them to mirrored displays.

## Setting up iMessage

Followed [OpenCore's guide](https://dortania.github.io/OpenCore-Post-Install/universal/iservices.html) to enable iMessage on the VM. Took a huge gamble by activating the VM using my main Apple ID. So far so good, seems to have worked.

## Handoff/Continuity in macOS VM

Like with any other hackintoshes, a supported Wifi/BT Broadcom card is needed. The original plan was to get the card + M.2 adapter and pass it through the VM. Unfortunately the adapter's M.2 key is different from what my motherboard supports. Consulting with my motherboard's manual also seem to suggest that the M.2 slots are only for storage devices. Hence this plan is currently on hold.

## Overall thoughts

The ability to run any OS is great, it's like having the best of all worlds.  
Couple of caveats here and there, but generally speaking works great.  
Would only recommend to people who are willing to put time and effort into this.
