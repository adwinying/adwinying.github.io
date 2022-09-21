---
draft: false
date: 2022-09-16T10:42:27.000+09:00
tags:
- servers
- docker
- fly-io
- tailscale
thumbnail: ''
title: A Better Way to Integrate Tailscale on your fly.io-powered App
excerpt: I think this is a better way than the official docs.
slug: a-better-way-to-integrate-tailscale-on-your-fly-io-powered-app

---

The [official Tailscale docs](https://tailscale.com/kb/1132/flydotio/) does explain on how to integrate Tailscale into a [fly.io](https://fly.io) app. However, I'm not a fan of how the Tailscale version and architecture were hardcoded in the `Dockerfile`. I prefer my `Dockerfile` to always include the latest and greatest Tailscale version, and also I would like to support [multi-arch Docker builds](https://www.docker.com/blog/multi-arch-build-and-images-the-simple-way/).

If you want to achieve the same, just replace the `Dockerfile` template like so:

```diff
FROM alpine:latest as builder
WORKDIR /app
COPY . ./
# This is where one could build the application code as well.


- FROM alpine:latest as tailscale
- WORKDIR /app
- COPY . ./
- ENV TSFILE=tailscale_1.30.2_amd64.tgz
- RUN wget https://pkgs.tailscale.com/stable/${TSFILE} && tar xzf ${TSFILE} --strip-components=1
- COPY . ./
+ # Obtain tailscale binaries from the official docker image
+ FROM tailscale/tailscale:latest as tailscale


# https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds
FROM alpine:latest
RUN apk update && apk add ca-certificates iptables ip6tables && rm -rf /var/cache/apk/*

# Copy binary to production image
COPY --from=builder /app/start.sh /app/start.sh
- COPY --from=tailscale /app/tailscaled /app/tailscaled
- COPY --from=tailscale /app/tailscale /app/tailscale
+ COPY --from=tailscale /usr/local/bin/tailscaled /app/tailscaled
+ COPY --from=tailscale /usr/local/bin/tailscale /app/tailscale
RUN mkdir -p /var/run/tailscale /var/cache/tailscale /var/lib/tailscale

# Run on container startup.
CMD ["/app/start.sh"]
```
Code: Replace the `Dockerfile` from the Tailscale docs with this
