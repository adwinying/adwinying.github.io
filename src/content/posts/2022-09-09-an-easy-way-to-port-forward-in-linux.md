---
draft: false
date: 2022-09-09T12:47:00.000+09:00
tags:
- servers
- linux
- homelab
- port-forward
thumbnail:
title: An Easy Way to Port Forward in Linux
excerpt: The secret lies within SSH.
slug: an-easy-way-to-port-forward-in-linux

---

Port forwarding in linux usually requires the use of `iptables`. Although [DigitalOcean's article](https://www.digitalocean.com/community/tutorials/how-to-forward-ports-through-a-linux-gateway-with-iptables) provides an excellent guide on how to configure `iptables`, the rules are not really easy to understand. I end up having to lookup the commands every single time I need to port forward.

```bash
iptables -A FORWARD -i eth0 -o %i -p tcp --syn --dport 80 -m conntrack --ctstate NEW -j ACCEPT
iptables -A FORWARD -i eth0 -o %i -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A FORWARD -i %i -o eth0 -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j DNAT --to-destination 192.168.123.2
iptables -t nat -A POSTROUTING -o eth1 -p tcp --dport 80 -d 192.168.123.2 -j SNAT --to-source 192.168.123.1
iptables -D FORWARD -i eth0 -o %i -p tcp --syn --dport 80 -m conntrack --ctstate NEW -j ACCEPT
iptables -D FORWARD -i eth0 -o %i -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -D FORWARD -i %i -o eth0 -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -t nat -D PREROUTING -i eth0 -p tcp --dport 80 -j DNAT --to-destination 192.168.123.2
iptables -t nat -D POSTROUTING -o eth1 -p tcp --dport 80 -d 192.168.123.2 -j SNAT --to-source 192.168.123.1
```
Code: Commands just to port forward a single port. I think this is pretty complicated...

## SSH tunnels

SSH tunnels allows us to port forward easily with just a single command. Let's say we have two servers, A and B, and we want to forward all traffic on port 8080 on server A to server B's port 80:

```bash
$ ssh -L 8080:localhost:80 server-b.example.org
```

Since it's a tunnel, you can even port forward to a different server. Say server C is only accessible via server B, and we want to forward to server C's port 80 instead:

```bash
$ ssh -L 8080:server-c.example.org:80 server-b.example.org
```

### Reverse connections

What if server B is inside some secure network and cannot be accessed by server A? We can initiate an SSH connection from server B and use an SSH reverse tunnel:

```bash
# executing this command from server B
$ ssh -R 8080:localhost:80 server-a.example.org
```

This is great for servers behind a double NAT or for servers that you don't want to expose to the internet.

### Making it persistent

Combine SSH tunnels with `autossh`, you can make sure the connection is restarted automatically when the SSH connection is disconnected:

```bash
$ autossh -N -L 8080:localhost:8080 server-b.example.org
```

### Making it really persistent

To persist the connection even after server A restarts, we can configure it as a `systemd` service:

```
[Unit]
Description=SSH portforward powered by autossh
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User={{ ssh_portforward_server_user }}
ExecStart=/usr/bin/autossh -N -L 8080:localhost:8080 server-b.example.org
Restart=always
RestartSec=60

[Install]
WantedBy=multi-user.target
```

### Port forwarding privileged ports (1 - 1024)

In order to open ports that are below 1024, you'll need root access:

```bash
$ sudo ssh -L 80:localhost:80 server-b.example.org
```

### Enabling external connections to access the port forwards

Port forwards are generally bound to localhost by default (ie. you can only access the port forward locally). To access the port forward from outside, you'll need to make sure `GatewayPorts` is enabled in your `sshd_config`:

```
GatewayPorts yes
```
Code: In ubuntu, sshd_config is located in `/etc/ssh/sshd_config`

If you're using reverse tunnel, you'll need to allow the client to specify an address:

```
GatewayPorts clientspecified
```

## Pros and Cons

### Pros
- Easy one liner to port forward
- Port forwarding is only in effect when connection can be established (port closes automatically if connection is closed)

### Cons
- Need to expose SSH port 22, in which it could be security risk
