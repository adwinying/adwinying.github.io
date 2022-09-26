---
draft: false
date: 2022-09-24T13:24:55.000+09:00
tags:
- servers
- cloudflare
- cloudflare-proxy
- caddy
- https
thumbnail: ''
title: Getting Cloudflare Proxy to Play Nice with Caddy
excerpt: Avoid getting infinite redirects when using Cloudflare Proxy.
slug: getting-cloudflare-proxy-to-play-nice-with-caddy

---

I wanted to enable Cloudflare proxy on a site that was behind [Caddy](https://caddyserver.com/) for some DDoS protection on the site. As I enable the proxy via Cloudflare's DNS settings, the site could no longer be accessed, with the browser showing a __too many redirects__ error.

Seems like this is a [well known issue](https://caddy.community/t/infinite-redirection/3230/5), and here are the things that you should do if you want to enable Cloudflare's proxy and Caddy's HTTPS features at the same time.

## How do I fix this?

There's a few things you'll need to do to enable both Cloudflare's proxy and Caddy's HTTPS:

### 1: Use DNS challenge when issuing HTTPS certificates

In Caddy, you can use DNS challenge instead by using a DNS provider plugin. The [forums/wiki](https://caddy.community/t/how-to-use-dns-provider-modules-in-caddy-2/8148) explains on  how to install and use the plugin.

For me, I decide to issue a wildcard certificate separately with [acme.sh](https://github.com/acmesh-official/acme.sh) and import the certs to Caddy. Here is how I configure it in my `Caddyfile`:

```
*.example.org {
  tls /path/to/certs/fullchain.cer /path/to/certs/*.example.org.key
}
```
Code: Caddyfile config

### 2: Enable strict SSL encryption on Cloudflare

In your Cloudflare dashboard under __SSL/TLS__ > __Overview__, you can see there's 4 different modes to choose from:

![Off, Flexible, Full and Full (strict)](/uploads/cloudflare-ssl-modes.png)
Figure: Cloudflare SSL modes

Select __Full (strict)__.

Now you should be able to access your website with Cloudflare proxy and Caddy HTTPS working together.

## Why is this happening?

Cloudflare's proxy comes with HTTPS, which is not a necessary thing as Caddy enables HTTPS by default. However, there's no option to enable DDoS protection without enabling Cloudflare HTTPS. You could disable Caddy's HTTPS feature, but I want to access my sites hosted when I'm in the same network without going through Cloudflare while maintaining HTTPS.

There are two things that are preventing both from coexisting with each other:

### Cloudflare SSL Encryption Mode

Coming back to Cloudflare's SSL encryption modes:

![Off, Flexible, Full and Full (strict)](/uploads/cloudflare-ssl-modes.png)
Figure: Cloudflare SSL modes

I believe __Flexible__ mode is selected by default. That means the requests that reach Caddy is HTTP and not HTTPS. Caddy redirects to HTTPS by default, so it will always return a redirect to HTTPS response. But on the other hand, Cloudflare keeps requesting a non-HTTPS page, and hence the infinite redirect loop. By selecting __Full (strict)__ or __Full__, Cloudflare would send HTTPS requests to Caddy instead of HTTP, avoiding infinite redirects.

### Let's Encrypt HTTPS Challenge

In order to obtain a HTTPS certificate, you'll need to prove that you actually own the server that you want to generate certificates for. This is done via completing a challenge that is issued by Let's Encrypt. There are three types of challenges, HTTP, TLS-ALPN and DNS.

By default, Caddy uses the HTTP challenge. For the HTTP Challenge, Let's Encrypt will set up a page on your server and tries to access that said page from their servers. However, if you set Cloudflare SSL mode to __Full (strict)__, the HTTP challenge will fail. This is because Cloudflare would return an error as the HTTPS certificate has not been issued, creating a chicken and egg situation.

The workaround is to use the DNS challenge instead, where Let's Encrypt would add a DNS entry on the domain you want to issue HTTPS certificates for and verify the entry exists before issuing a certificate.

[The Caddy docs](https://caddyserver.com/docs/automatic-https#acme-challenges) explains, in detail regarding the various HTTPS challenges available in Let's Encrypt.
