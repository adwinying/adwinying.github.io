---
draft: false
date: 2022-04-07T00:03:18.000+09:00
tags:
- oracle
- cloud
- port-forwarding
- networking
- troubleshooting
thumbnail: ''
title: Setting up Port Forwarding on an Oracle Cloud Instance
excerpt: The troubles of port forwarding using an Oracle Cloud instance.
slug: setting-up-port-forwarding-on-an-oracle-cloud-instance

---
Earlier this year, I came across Oracle Cloud's generous free ARM compute resources (up to 4CPU and 24GB RAM). It sounded too good to be true, but I tried running a couple of services on an instance and it seemed to work pretty well. In fact, I was wondering why I should pay $5/month for a Vultr VPS when this is free...

So, I took the plunge and tried to migrate my tunnel server from Vultr to Oracle Cloud. I created a new instance and then ran my [Ansible provisioning script](https://github.com/adwinying/server-provisioning) on the new instance, updated my DNS to point at the new instance and then... things were broken. My hosted services aren't accessible outside of my local network, and I couldn't SSH into any of my machines in the local network even with VPN activated.

## Ingress Firewall Rules

Traditional cloud services gives you a lot more control over your VM's network, so does Oracle Cloud. By default, all ports except 22 (SSH) are closed, and you need to explicitly state which ports to open for the VM.

![Oracle Cloud compute instance ingress rules](/uploads/ingress-rules.png "Configure ingress rules for the virtual cloud network your VM instance is under")

## Updating iptable rules to the correct physical interface

After doing some sanity checks with [DigitalOcean's excellent tutorial on port forwarding with iptables](https://www.digitalocean.com/community/tutorials/how-to-forward-ports-through-a-linux-gateway-with-iptables), I realized that the physical interfaces had changed and I updated them, but `curl` still shows `Connection Refused`...

## Disabling default iptable rules

So I decided it was time to dig deep and look into the firewall rules on the VM instance itself. Running the following commands will list all the active rules:

```bash
$ sudo iptables -S
```

And it seems to me that Oracle Cloud has defined a couple of rules by default. I disabled the default rules by going to `/etc/iptables/rules.v4` and commented out the rules, leaving only the following rules enabled:

```
*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]
:InstanceServices - [0:0]
COMMIT
```

Pretty much everything is enabled, which you might think is bad for security, but I had `ufw` configured so it should be fine...

## Defining Wireguard's Interface MTU

After disabling the iptable rules, `curl` no longer returns `Connection Refused`, but it seems to be stuck forever. Time to inspect packets with `tcpdump`:

```bash
$ sudo tcpdump -i wg0 port 80
```

I ran the above commands on the Oracle Cloud instance and the port forward destination, and here are the logs:

```
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on wg0, link-type RAW (Raw IP), capture size 262144 bytes
15:03:18.073434 IP tunnel.63661 > 192.168.50.2.http: Flags [S], seq 2140683422, win 65535, options [mss 1414,nop,wscale 6,nop,nop,TS val 2514772347 ecr 0,sackOK,eol], length 0
15:03:18.203423 IP 192.168.50.2.http > tunnel.63661: Flags [S.], seq 3390514814, ack 2140683423, win 64296, options [mss 1380,sackOK,TS val 2682332000 ecr 2514772347,nop,wscale 7], length 0
15:03:18.218738 IP tunnel.63661 > 192.168.50.2.http: Flags [.], ack 1, win 2052, options [nop,nop,TS val 2514772493 ecr 2682332000], length 0
15:03:18.219378 IP tunnel.63661 > 192.168.50.2.http: Flags [P.], seq 1:77, ack 1, win 2052, options [nop,nop,TS val 2514772493 ecr 2682332000], length 76: HTTP: GET / HTTP/1.1
15:03:18.235008 IP 192.168.50.2.http > tunnel.63661: Flags [.], ack 77, win 502, options [nop,nop,TS val 2682332032 ecr 2514772493], length 0
15:03:18.260612 IP 192.168.50.2.http > tunnel.63661: Flags [P.], seq 10945:11389, ack 77, win 502, options [nop,nop,TS val 2682332056 ecr 2514772493], length 444: HTTP
15:03:18.278022 IP tunnel.63661 > 192.168.50.2.http: Flags [.], ack 1, win 2052, options [nop,nop,TS val 2514772552 ecr 2682332032,nop,nop,sack 1 {10945:11389}], length 0
15:03:23.262575 IP 192.168.50.2.http > tunnel.63661: Flags [F.], seq 11389, ack 77, win 502, options [nop,nop,TS val 2682337058 ecr 2514772552], length 0
15:03:23.315602 IP tunnel.63661 > 192.168.50.2.http: Flags [.], ack 1, win 2052, options [nop,nop,TS val 2514777590 ecr 2682332032,nop,nop,sack 1 {10945:11390}], length 0
15:03:26.177485 IP tunnel.63661 > 192.168.50.2.http: Flags [R.], seq 77, ack 1, win 2052, length 0
^C
10 packets captured
10 packets received by filter
0 packets dropped by kernel
```

Public-facing server (Oracle Cloud)

```
tcpdump: verbose output suppressed, use -v[v]... for full protocol decode
listening on wg0, link-type RAW (Raw IP), snapshot length 262144 bytes
15:02:49.785777 IP 192.168.50.1.63661 > therig.http: Flags [S], seq 2140683422, win 65535, options [mss 1414,nop,wscale 6,nop,nop,TS val 2514772347 ecr 0,sackOK,eol], length 0
15:02:49.785854 IP therig.http > 192.168.50.1.63661: Flags [S.], seq 3390514814, ack 2140683423, win 64296, options [mss 1380,sackOK,TS val 2682332000 ecr 2514772347,nop,wscale 7], length 0
15:02:49.816484 IP 192.168.50.1.63661 > therig.http: Flags [.], ack 1, win 2052, options [nop,nop,TS val 2514772493 ecr 2682332000], length 0
15:02:49.817647 IP 192.168.50.1.63661 > therig.http: Flags [P.], seq 1:77, ack 1, win 2052, options [nop,nop,TS val 2514772493 ecr 2682332000], length 76: HTTP: GET / HTTP/1.1
15:02:49.817671 IP therig.http > 192.168.50.1.63661: Flags [.], ack 77, win 502, options [nop,nop,TS val 2682332032 ecr 2514772493], length 0
15:02:49.842420 IP therig.http > 192.168.50.1.63661: Flags [P.], seq 1:2737, ack 77, win 502, options [nop,nop,TS val 2682332056 ecr 2514772493], length 2736: HTTP: HTTP/1.1 200 OK
15:02:49.842439 IP therig.http > 192.168.50.1.63661: Flags [P.], seq 2737:5473, ack 77, win 502, options [nop,nop,TS val 2682332056 ecr 2514772493], length 2736: HTTP
15:02:49.842452 IP therig.http > 192.168.50.1.63661: Flags [P.], seq 5473:8209, ack 77, win 502, options [nop,nop,TS val 2682332056 ecr 2514772493], length 2736: HTTP
15:02:49.842463 IP therig.http > 192.168.50.1.63661: Flags [P.], seq 8209:10945, ack 77, win 502, options [nop,nop,TS val 2682332056 ecr 2514772493], length 2736: HTTP
15:02:49.842476 IP therig.http > 192.168.50.1.63661: Flags [P.], seq 10945:11389, ack 77, win 502, options [nop,nop,TS val 2682332056 ecr 2514772493], length 444: HTTP
15:02:49.880535 IP 192.168.50.1.63661 > therig.http: Flags [.], ack 1, win 2052, options [nop,nop,TS val 2514772552 ecr 2682332032,nop,nop,sack 1 {10945:11389}], length 0
15:02:49.899820 IP therig.http > 192.168.50.1.63661: Flags [.], seq 1:1369, ack 77, win 502, options [nop,nop,TS val 2682332114 ecr 2514772552], length 1368: HTTP: HTTP/1.1 200 OK
15:02:50.146498 IP therig.http > 192.168.50.1.63661: Flags [.], seq 1:1369, ack 77, win 502, options [nop,nop,TS val 2682332360 ecr 2514772552], length 1368: HTTP: HTTP/1.1 200 OK
15:02:50.626932 IP therig.http > 192.168.50.1.63661: Flags [.], seq 1:1369, ack 77, win 502, options [nop,nop,TS val 2682332841 ecr 2514772552], length 1368: HTTP: HTTP/1.1 200 OK
15:02:51.586965 IP therig.http > 192.168.50.1.63661: Flags [.], seq 1:1369, ack 77, win 502, options [nop,nop,TS val 2682333801 ecr 2514772552], length 1368: HTTP: HTTP/1.1 200 OK
15:02:53.613818 IP therig.http > 192.168.50.1.63661: Flags [.], seq 1:1369, ack 77, win 502, options [nop,nop,TS val 2682335828 ecr 2514772552], length 1368: HTTP: HTTP/1.1 200 OK
15:02:54.843659 IP therig.http > 192.168.50.1.63661: Flags [F.], seq 11389, ack 77, win 502, options [nop,nop,TS val 2682337058 ecr 2514772552], length 0
15:02:54.951155 IP 192.168.50.1.63661 > therig.http: Flags [.], ack 1, win 2052, options [nop,nop,TS val 2514777590 ecr 2682332032,nop,nop,sack 1 {10945:11390}], length 0
15:02:54.951202 IP therig.http > 192.168.50.1.63661: Flags [.], seq 1:1369, ack 77, win 502, options [nop,nop,TS val 2682337165 ecr 2514777590], length 1368: HTTP: HTTP/1.1 200 OK
15:02:55.213135 IP therig.http > 192.168.50.1.63661: Flags [.], seq 1:1369, ack 77, win 502, options [nop,nop,TS val 2682337427 ecr 2514777590], length 1368: HTTP: HTTP/1.1 200 OK
15:02:55.720279 IP therig.http > 192.168.50.1.63661: Flags [.], seq 1:1369, ack 77, win 502, options [nop,nop,TS val 2682337934 ecr 2514777590], length 1368: HTTP: HTTP/1.1 200 OK
15:02:56.706990 IP therig.http > 192.168.50.1.63661: Flags [.], seq 1:1369, ack 77, win 502, options [nop,nop,TS val 2682338921 ecr 2514777590], length 1368: HTTP: HTTP/1.1 200 OK
15:02:57.976002 IP 192.168.50.1.63661 > therig.http: Flags [R.], seq 77, ack 1, win 2052, length 0
^C
23 packets captured
23 packets received by filter
0 packets dropped by kernel
```

Server behind NAT (Port forward destination)

I found out that the connection is being properly forwarded, but some packets were not received by the Oracle Cloud instance. Upon closer look packets with large lengths (1000+) are missing from the Oracle Cloud instance side. Weird.

After comparing the states of the old VM instance on Vultr it seems like the MTU for the Wireguard interface is different; Oracle Cloud's MTU is 9000 (!).

```bash
$ ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9000 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000
    link/ether 02:00:17:00:8f:64 brd ff:ff:ff:ff:ff:ff
7: wg0: <POINTOPOINT,NOARP,UP,LOWER_UP> mtu 9000 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/none123456
```

Googling for "Wireguard MTU" seems to suggest that the MTU is the problem here. [This Github gist here](https://gist.github.com/nitred/f16850ca48c48c79bf422e90ee5b9d95) states that the optimal MTU is 1420 for the server and 1384 for the peer so I tried it out by adding the MTU into my wireguard config files. `curl` finally worked!

...or so I thought.

`curl` to an HTTPS address however, seems to remain stuck. [This blog post here](https://keremerkan.net/posts/wireguard-mtu-fixes/) recommends an MTU of 1280 throughout the network and with this value HTTPS finally worked as well.
