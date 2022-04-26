---
draft: true
date: 2018-09-01T23:10:16.000+09:00
tags:
- docker
- ghost
- https
thumbnail: ''
title: Enabling HTTPS in a Ghost + Docker environment
excerpt: How to enable HTTPS for ghost's docker image.
slug: enabling-https-in-a-ghost-docker-environment

---
So I have a [Ghost](https://ghost.org) blog running on top of [Docker](https://www.docker.com/) on a [DigitalOcean](https://www.digitalocean.com/) cloud server. One fine day, I got an email from ghost announcing Ghost v2 is out. Since I'm a sucker for shiny new things I attempted to upgrade and see what's the fuss is all about. But that's not the main point.

As you may guessed from the title, I 1-uped the difficulty by attempting to add HTTPS support as well. I tried to do so when setting up the blog initially but decided setting it up was plenty and decided to call it a day. Furthermore, as Chrome [doesn't wanna play nice with non-HTTPS sites](https://www.theverge.com/2018/2/8/16991254/chrome-not-secure-marked-http-encryption-ssl) in the near future, now couldn't have been a better time to implement HTTPS. This time around, I finally manage to get HTTPS running, or else this blog post wouldn't exist right?

![Browser address bar showing a green lock](/uploads/https.png "Having that green lock puts a smile on my face")

_If you don't really care about how it works and you just want to set it up, the files and setup instructions are up on my_ [_Github_](https://github.com/adwinying/docker-ghost).

## Ghost and HTTPS

So the way Ghost supports HTTPS is via nginx. This is achieved by using a [reverse proxy](https://en.wikipedia.org/wiki/Reverse_proxy), where nginx would "redirect" a request to the corresponding web service by looking at the host URL. For example, you could have example1.com and example2.com hosting different services on the same machine pointing to the same IP address; and nginx would direct the request to the right service depending on the host URL of the request. It's almost like magic!

## The Barebones Docker + Ghost

To start off, we would use the [official](https://hub.docker.com/_/ghost/) Docker image for Ghost. Since entering all the container parameters every time in the command line is a pain in the ass, we would compose a utilize Docker Compose by creating a `docker-compose.yml` file:

```yaml
version: '2'

services:
  ghost:
    image: ghost:2
    restart: always
    ports:
      - 2368:2368
    volumes:
      # To persist user data after container has been destroyed
      - ./content:/var/lib/ghost/content
```

This basically starts the Ghost container, connects the container's port 2368 with the host machine's port 2368 and links the host machines working directory `content` folder with `ghost/content` folder, so if any data is created would persist even after the container is destroyed.

To spin up the instance, just run `docker-compose up` and when its done you should be able to access it on [http://localhost:2368](http://localhost:2368).

## nginx - The reverse proxy handler

Next, we're going to set up nginx. Now since we are using Docker, we might as well containerize nginx as well. [jwilder's](https://hub.docker.com/r/jwilder/nginx-proxy/) nginx-proxy has provided a very useful nginx image that will detect all the Docker containers and automagically configure the nginx reverse proxy. All we need to do is to define the environmental variables for the containers that we would want to use nginx with.

In order to set up nginx, we would add the following onto our existing `docker-compose.yml` file:

```yaml
  # Reverse Proxy container
  nginx_proxy:
    image: jwilder/nginx-proxy:latest
    ports:
      # Expose port 80 and 443 to host machine 
      - 80:80
      - 443:443
    volumes:
      # To monitor the status/events of other docker containers
      - /var/run/docker.sock:/tmp/docker.sock:ro
```

In addition, we make additional modifications to the existing Ghost container:

```yaml
  # ghost container
  ghost:
    image: ghost:2
    restart: always
    expose:
      # instead of exposing the port directly to host,
      # we expose to only the internal docker network
      - '2368'
    volumes:
      - ./content:/var/lib/ghost/content
    environment:
      - url=https://blog.example.com  # URL value needed by Ghost
      - VIRTUAL_HOST=blog.example.com # The domain we want to use
    depends_on:
      - nginx_proxy
```

If everything goes well, rerun `docker-compose up` and you should be able to connect to the Ghost instance from the Docker host by executing the following command:

```bash
$ curl -H "Host: blog.example.com" localhost:80
```

If you see a bunch of HTML tags, then great! Time to set up HTTPS.

## Managing HTTPS certificates

In order to set up HTTPS, we need to obtain a certificate from a trusted provider. [Let's Encrypt](https://letsencrypt.org/) has been providing free certificates for HTTPS, which is what we will be using. Unfortunately, the certs provided has a pretty short lifespan but with the magic of Docker we can spin up a container to automate this process as well. jcrs' [letsencrypt-nginx-proxy-companion](https://hub.docker.com/r/jrcs/letsencrypt-nginx-proxy-companion/#lets-encrypt), as the name suggests, complements the nginx-proxy image by issuing HTTPS certs that could be used by nginx.

_NOTE: You'll need an existing domain that supports_ [CAA](https://letsencrypt.org/docs/caa/).

So, we add another container in our existing `docker-compose.yml` file:

```yaml
# Let's Encrypt SSL Cert Manager container
  ssl_manager:
    image: jrcs/letsencrypt-nginx-proxy-companion:latest
    volumes:
      # Need to monitor docker containers too
      - /var/run/docker.sock:/var/run/docker.sock:ro
      # We create a folder to store the certs
      - ./ssl_certs/:/etc/nginx/certs:rw
    volumes_from:
      - nginx_proxy # Allow it to access nginx's volumes
    depends_on:
      - nginx_proxy
```

In addition, we need to make changes to our existing containers as well:

```yaml
  ghost:
    ...
    environment:
      - url=https://blog.example.com
      - VIRTUAL_HOST=blog.example.com
      - LETSENCRYPT_HOST=blog.example.com   # Host you would like to use, typically same as VIRTUAL_HOST
      - LETSENCRYPT_EMAIL=admin@example.com # A valid email so Let's Encrypt could notify you when your certs are expiring when auto-renewal failed

  nginx_proxy:
    ...
    labels:
      # Allow letsencrypt container to identify the nginx_proxy container
      - "com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy"
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
      - ./ssl_certs:/etc/nginx/certs:ro # Allow nginx to read generated certs
      - /etc/nginx/vhost.d              # Directories that letsencrypt container needs to access
      - /usr/share/nginx/html           # Directories that letsencrypt container needs to access
```

Time to see the final results! Rerun `docker-compose up -d` and allow the containers to work its magic, and if everything goes well you should be able to access your Ghost instance in your web browser with HTTPS via the host URL you defined earlier.

## Future Work

In the server where I host my Docker instances, I also have other projects hosted on the same server without using Docker. Hence, I have apache set up which is running natively on my server in order to direct incoming requests to the correct destination. This results in the need to go through 2 different reverse proxies to reach my ghost instance.

    Request -> Apache (native install) -> nginx (docker) -> Ghost container

This works fine with port 80 HTTP but not port 443 HTTPS. As a workaround I disabled HTTPS on Apache, and allow HTTPS connections to connect directly to the nginx container. A proper fix seems to be to define the certs in the apache install instead of the nginx as mentioned in the [Ubuntu forums](https://ubuntuforums.org/showthread.php?t=2064909). Seems workable and would like to make it happen soon...

## References

* [Github repo to this project](https://github.com/adwinying/docker-ghost/blob/master/docker-compose.yml)
* [Alex's blog](https://blog.alexellis.io/your-ghost-blog/)
* [redth.codes blog](https://redth.codes/ghost-docker-new-blog/)
* [Docker Hub: jwilder/nginx-proxy](https://hub.docker.com/r/jwilder/nginx-proxy/)
* [Docker Hub: jcrs/letsencrypt-nginx-proxy-companion](https://hub.docker.com/r/jrcs/letsencrypt-nginx-proxy-companion)
* [Reverse Proxy with HTTPS](https://ubuntuforums.org/showthread.php?t=2064909)
