---
draft: false
date: 2022-12-06T11:21:27.000+09:00
tags:
- typescript
- tutorial
title: How to Get Started with Typescript
slug: how-to-get-started-with-typescript
excerpt: No idea how to make the leap to Typescript? Read on.

---

So you've gone through countless Typescript tutorials and you want a taste of that type safety, but you still don't know how to start using it. Here are some tips to help you get started.

## Tip 1: Use a template

Configuring Typescript from scratch can be difficult, even for experienced developers. Using a template can provide you with a set of sane defaults to help you get started with Typescript without the need to deal with unfamiliar configs. Many frameworks offer Typescript templates, so you don't need to worry about configuring Typescript from scratch.

## Tip 2: Use strict mode

[Strict mode](https://www.typescriptlang.org/tsconfig#strict), as the name suggests will enforce a stricter set of rules. It might seem scary at first, but strict mode will ensure that your code is guaranteed to be type-safe and following Typescript best practices. To enable strict mode, all you need to do is to ensure `strict: true` is somewhere in your `tsconfig.json`.

## Tip 3: Write Javascript by default

Don't feel the need to define types just for the sake of it. Typescript is smart enough to infer types based on your code, so only define types when (a) Typescript is screaming errors at you or (b) when you need to reuse types in multiple places.

## Tip 4: Define your types close to your code

Try to avoid define types in a separate `types.ts` file. Instead, it's better to define them near the code where they'll be used. This way, you can easily look up the type definitions when reviewing your code.
