---
draft: false
date: 2023-04-28T18:48:11.000+09:00
tags:
- javascript
- typescript
- eslint
- prettier
thumbnail:
title: The Correct Way to Install Prettier
slug: the-correct-way-to-install-prettier
excerpt: "Hint: It's with ESLint."

---

Assuming you're using ESLint in your project, here's how you setup prettier in a project.

1. Install the required packages:

```bash
$ npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

2. Add this to your ESLint config:

```json
{
  "extends": [
    "plugin:prettier/recommended" // add this line as the last entry
  ]
}
```

And you're done! Whenever you run ESLint, prettier will now kick in and format your code.

## Why install prettier as a ESLint plugin?

You may wonder why you should use prettier via ESLint. Here are some reasons:

### Coexisting with ESLint without fighting

Turns out some ESLint rules do conflict with prettier. To overcome this, you'll need to install the prettier ESLint plugin. If you're going to install the plugin, using prettier through ESLint requires no extra configuration.

### Easier integration with editors

In order to use prettier directly on your editor of choice, most likely you'll need to use a plugin. The same applies to ESLint as well. If you use prettier via ESLint, you don't need to install a separate plugin for prettier.

### Performance issues?

Some may point out that using prettier via ESLint may hurt performace. That may be the case, but personally I think linting/formatting doesn't need to be super performant as it's typically run outside of your editing workflow.
