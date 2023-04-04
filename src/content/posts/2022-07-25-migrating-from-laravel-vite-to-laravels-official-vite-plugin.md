---
draft: false
date: 2022-07-25T10:43:00.000+09:00
tags:
- tutorial
- laravel
- vite
thumbnail:
title: Migrating from laravel-vite to Laravel's Official Vite Plugin
excerpt: Outlined the steps to migrate to Laravel's official vite plugin.
slug: migrating-from-laravel-vite-to-laravels-official-vite-plugin

---
I love how fast vite is and adopted vite into my Laravel projects using [laravel-vite](https://laravel-vite.dev/). About a month ago, Laravel announced that vite will replace Laravel Mix to be the [default frontend asset bundler](https://laravel-news.com/vite-is-the-default-frontend-asset-bundler-for-laravel-applications "default frontend asset builder"). I decided to migrate to the official plugin and try it out.

Overall, I find the official plugin provides a much better experience. The official plugin has a more seamless configuration, where the configs are all done in `vite.config.ts`, removing the need for a separate `config/vite.php` file (perhaps due to some Laravel Magic&trade; baked in). Hence, I highly recommend migrating to the official plugin if you have an hour or two to spare.

## How to migrate to the official plugin

### Step 1: Remove old packages

First, we need to remove the laravel-vite package as well as configs.

```bash
$ composer remove innocenzi/laravel-vite
$ npm rm laravel-vite
$ rm config/vite.php
```

### Step 2: Upgrade Laravel

On the backend, the official vite plugin is baked into Laravel v9.19 onwards so you'll need to upgrade if your Laravel version is older:

```bash
$ composer require laravel/framework:^9.19.0
```

Additionally, if you're upgrade from v8 and below you should follow the [upgrade guide](https://laravel.com/docs/9.x/upgrade) as well.

### Step 3: Install laravel-vite-plugin NPM integration

On the frontend, you'll need to install the `laravel-vite-plugin` package:

```bash
$ npm install --save-dev laravel-vite-plugin
```

### Step 4: Upgrade existing packages

In my case, my version of vite was too old so I had to upgrade vite:

```bash
$ npm install --save-dev vite@latest
```

While I'm at it, I upgraded vue as well.

```bash
$ npm install --save-dev vue@latest @vitejs/plugin-vue@latest @vue/compiler-sfc@latest
```

If you're using [Inertia.js](https://inertiajs.com), you'll need at least v0.6.3 of the `laravel-inertia` package as well:

```bash
$ composer require inertiajs/inertia-laravel:^0.6.3
```

### Step 5: Update configs

In `vite.config.ts`, we import `defineConfig` from vite instead of `laravel-vite`:

```diff
- import { defineConfig } from 'laravel-vite'
+ import { defineConfig } from 'vite'
```
Code: vite.config.ts

We then move the custom configs into `defineConfig`:

```diff
- export default defineConfig()
-   .withPlugin(vue)
-   .merge({
-     resolve: {
-       alias: {
-         '@': path.resolve(__dirname, '/resources'),
-       },
-     },
-   })
+ export default defineConfig({
+   resolve: {
+     alias: {
+       '@': '/resources',
+     },
+   },
+ })
```
Code: vite.config.ts

Then finally we add the laravel and vue plugins:

```diff
+ import laravel from 'laravel-vite-plugin'

  export default defineConfig({
+   plugins: [
+     laravel([
+       // list all entry points here
+       'resources/css/app.css',
+       'resources/js/app.ts',
+     ]),
+
+     vue({
+       template: {
+         transformAssetUrls: {
+           base: null,
+           includeAbsolute: false,
+         },
+       },
+     }),
+   ],

    resolve: {
      alias: {
        '@': '/resources',
      },
    },
  })
```
Code: vite.config.ts

### Step 6: Update `@vite` directive in blade files

In the blade files where you used the `@vite` directive, you'll need to additionally define the entry point for the blade file:

```diff
- @vite
+ @vite('resources/js/app.ts')
```

If you have multiple entry points:

```diff
- @vite
+ @vite(['resources/js/app.ts', 'resources/css/app.css'])
```

### Step 7: Update asset paths

With the official vite plugin, there are two ways to use static assets. With `laravel-vite`, it is likely that you imported the asset and let vite bundle the assets at build time. However, the official plugin also supports using assets from the `/public` directory, allowing Laravel to serve the asset instead. This can be achieved by specifying an absolute path instead of a relative one:

```html
<!-- This asset is not handled by Vite and will not be included in the build -->
<img src="/taylor.png">
 
<!-- This asset will be re-written, versioned, and bundled by Vite -->
<img src="../../images/abigail.png">
```

More details on this can be found [in the docs](https://laravel.com/docs/9.x/vite#url-processing).

### [Optional] Step 8: Configure remote access

If you need to access the dev environment from another machine, you'll need to specify the server host and port. Laravel will then use these values to load the JS files from HTML.

```diff
  export default defineConfig({
+   server: {
+     host: '192.168.1.5',
+     port: 3005,
+   },
+
    plugins: [
      laravel([
```
Code: vite.config.ts

```html
<!-- This is what will be injected when you load the page via the browser -->
<script type="module" src="http://192.168.1.5:3005/resources/js/app.ts"></script>
<script type="module" src="http://192.168.1.5:3005/@vite/client"></script>
```

Personally, I use `.env` to change these values instead:

```diff
  export default defineConfig({
+   server: {
+     host: process.env.VITE_HOST,
+     port: parseInt(process.env.VITE_PORT ?? 3000, 10),
+   },
+
    plugins: [
      laravel([
```
Code: vite.config.ts

At this point, vite has not load the environmental values so import.meta&#8203;.env does not work. Instead, I use `env-cmd` to load up the environmental values beforehand:

```bash
$ npm install --save-dev env-cmd
```

```diff
   "scripts": {
-    "dev": "vite",
+    "dev": "env-cmd vite",
```
Code: package.json
