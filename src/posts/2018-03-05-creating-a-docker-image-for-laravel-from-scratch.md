---
draft: false
date: 2018-03-05T01:00:00.000+09:00
tags:
- docker
- laravel
- php
- nodejs
thumbnail: ''
title: Creating a Docker image for Laravel from scratch
excerpt: How to make a docker image from scratch for Laravel.
slug: creating-a-docker-image-for-laravel-from-scratch

---
## Background

I was looking at various stacks to develop a RESTful API and I came across Laravel. Laravel was a viable candidate mainly because it was in PHP (which my company is familiar with) and also it seems not too hard to develop (after going through a few webcasts on YouTube). Hence I decided take Laravel for a spin.

Never did I know setting up the development environment was a PITA.

## Problem

There were several options to set up Laravel locally, but none seem to work for me. Starting from the options from the official docs, [Laravel Homestead](https://laravel.com/docs/5.6/homestead) was the recommended option but I wanted support for using Bash on Windows, which Vagrant doesnt support. Setting up from scratch isn't great either cause doing that on Windows is suicidal.

Next up, XAMPP wasn't a good choice as I have existing PHP projects where the PHP version isn't supported by Laravel. [Valet](https://laravel.com/docs/5.5/valet) isn't a good option either as it is macOS only, which is a big no as I develop across different platforms.

So Docker was the most viable option, I guess. Docker supports Bash on Windows, albeit hacky (ie. Running commands from bash, but the daemon is running natively on Windows) as you need to install Docker on both bash and Windows. But that is a small price to pay in my opinion. Also, I've known Docker for awhile now and I've always wanted to try it out so why not?

## Pre-built Docker Images

At first, things were looking good as there are already pre-built Docker Images for Laravel. One of the popular image is [Laradock](http://laradock.io/), with started out with Laravel but also expanded to other stacks as well.

However, after following the documentation, I couldn't see the laravel start page. Laradock bundles with MYSQL and phpmyadmin as well, and I couldn't access either of them.

Hence, I tried creating my own from scratch.

## File structure

**NOTE:** Github repo available [here](https://github.com/adwinying/docker-laravel)

```
- docker-laravel
 |- docker-compose.yml
 |- web.dockerfile
 ...
 |- [other laravel source files go here]
```

## STEP1: Configuring docker-compose

So the first thing I did was configuring a file called `docker-compose.yml`. In this file, the docker containers to be hosted and each of its configuration is listed out. In an empty directory I created the file, then entered the following:

```yaml
# docker-compose.yml

version: '2'

services:                        # list of services(containers)
  web:                           # container name
    build:                       # build options
      context: ./                # file path context
      dockerfile: web.dockerfile # path to dockerfile
    ports:                       # ports to map
      - 80:80                    # [local port]:[container port]
    volumes:                     # list of directories to map
      - ./:/var/www
    links:                       # links to other container
      - db                       # db container; hosts the db container
```

First off, the `web` container hosts the NGINX HTTP service, with Node.js and Laravel's `cli` installed and ready to use. This is done by loading up `web.dockerfile` which is created in the next step, then the relevant ports and volumes (directories) are linked between the local machine and docker container. Finally, `links` is used to link the web container with other containers, in this case the `db` container (created later) in order for laravel to communicate with the database.

## STEP2: Configuring the dockerfile

A `dockerfile` is a file that list outs the steps to build an image. A container is an instance of an image. In this case, I made a `dockerfile`named `web.dockerfile` for the `web` container:

```docker
# web.dockerfile

# Sourcing official docker image of PHP 7.1 with Apache web server
FROM php:7.1-apache

# Change DocumentRoot directory
ENV APACHE_DOCUMENT_ROOT /var/www/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf && \
    sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Install dependencies for nodejs & laravel
RUN apt-get update && apt-get install -y gnupg zlib1g-dev
RUN docker-php-ext-install zip

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash && \
	apt-get install -y nodejs

# Install composer
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer && \
    chmod +x /usr/local/bin/composer

# Install laravel globally
RUN composer global require "laravel/installer"

# Add .composer/vendor/bin to bash_profile
RUN echo export PATH='$HOME/.composer/vendor/bin:$PATH' >> ~/.bashrc && \
	echo cd .. >> ~/.bashrc
```

At the time of this writing, PHP7.2 is available but it doesn't play well during the installation of Laravel, and hence PHP7.1 was used instead.

On top of the PHP7.1 image, Node.js and Laravel, together with their dependencies are automagically installed.

## STEP3: Configuring docker-compose, Part II

Although now we have Laravel set up, we still need a database for it to store data. An instance of MYSQL is added by adding the following lines into `docker-compose.yml`:

```yaml
# docker-compose.yml

version: '2'

services:                       # list of services(containers)
  db:                           # MYSQL instance is named db
    image: mysql:5.7.21         # Using MYSQL 5.7.21
    ports:                      # Mapping ports from container to local machine
      - 3306:3306
    environment:                # Environment variables (change accordingly)
      MYSQL_ROOT_PASSWORD: root # Root password
      MYSQL_DATABASE: db        # Database name
      MYSQL_USER: homestead     # Username
      MYSQL_PASSWORD: secret    # User password
```

The MYSQL instance was spun up with the above credentials, which were injected to the container as environment variables. Then, the port 3306 of the container is then mapped to the local machine's port 3306.

## BONUS STEP: Setting up phpMyAdmin

At this point we can already start working on Laravel but, I wanted to set up phpMyAdmin to work on the MYSQL database in a easy-to-use GUI, as a bonus.

Again, going back to `docker-compose.yml`, another container `phpmyadmin` is set up by adding the following lines:

```yaml
# docker-compose.yml

services:
  phpmyadmin:                        # phpmyadmin container
    image: phpmyadmin/phpmyadmin:4.7 # Sourced from the official docker image of phpMyAdmin
    ports:                           # Mapping ports
      - 8080:80
    links:
      - db                           # Linking phpmyadmin container with db container
```

## STEP4: Putting it all together

Finally, all the docker configuration has been set in place and it's time to spin up an instance. Run following commands in a terminal window:

```bash
# Build and start up a docker instance based on docker-compose.yml
# -d to run containers in detached mode
$ docker-compose up -d

# Launch a bash shell into the web container
$ docker-compose exec web bash

# Create a new laravel project
$ laravel new
```

If everything goes well, laravel should be up and running at [http://localhost/](http://localhost/). MYSQL and phpMyAdmin should be up and running at [http://localhost:3306](http://localhost:3306/) and [http://localhost:8080](http://localhost:8080/) respectively.

## Troubleshooting

### Checking status of containers

In the project directory, run the following command:

```bash
$ docker-compose ps
```

### Remapping Ports

In `docker-compose.yml` the ports for each service can be changed. Eg: `mysql` service:

```yaml
  db:
    image: mysql:5.7.21
    ports:
      - [your_local_machine_port_here]:3306
```

### Changing the directory of DocumentRoot

In `web.dockerfile` change `ENV APACHE_DOCUMENT_ROOT /var/www/public` to the line below:

```
ENV APACHE_DOCUMENT_ROOT /path/to/new/DocumentRoot
```

### Rebuilding the containers from scratch

In the project directory, run the following command:

```bash
# --build rebuilds the containers
$ docker-compose up -d --build
```

### Permission Denied

> The stream or file "/var/www/storage/logs/laravel.log" could not be opened: failed to open stream: Permission denied

If the above message is shown while trying to access [http://localhost/](http://localhost/), run the follow commands:

```bash
# Launch a bash shell into the web container
$ docker-compose exec web bash
# Set permissions to 755 for /var/www
$ chmod -R 755 .
# Set owner of /var/www
$ chown -R www-data:www-data .
```

### Volume mounts not working with Bash on Windows

Referring to [this](https://github.com/Microsoft/WSL/issues/1854#issuecomment-291845122) Github issue, run the following commands in a terminal:

```bash
$ sudo mkdir /c
$ sudo mount --bind /mnt/c /c
$ cd /c/path/to/project
$ docker-compose up -d
```

## Future Work

* Multi-project support
* SSL support
