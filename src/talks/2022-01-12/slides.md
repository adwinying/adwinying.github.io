---
theme: ../theme
title: 最近・これからのWEBトレンド
info: 2022年に流行りそうなものいくつ紹介します。
event: 2022年1月レバテックLT会議
layout: section
---

# 最近・これからの<br>WEBトレンド

https://iAdw.in/talks/2022-01-12

<!--
明けましておめでとうございます🎍

新年なので新しいものを挑戦してはいいかと思ってまして

（前のLTとのネタが被ったかもしれないが。。。）
-->

---
src: ../slides/profile_ja.md
---

---

# 予めご了承ください🙇

- フロントエンド中心
- なるべく技術面を話さない
- 個人の偏見MAX

<!--
フロントエンド中心：バックエンドいろんな言語・ライブラリーがあるため

なるべく技術面を話さない：営業の方の考慮・簡単な紹介したい→詳しくは検索してみてください

個人の偏見：時間も限られているので一部のものしか取り上げられる＋あくまで自分が観察したトレンドなので。。
-->

---
layout: section
---

# 1/6: モダンなブラウザ機能 🕶

---

# モダンといえば。。

<img src="/ie11_logo.png" alt="IE11 logo" class="mt-34">

<!--
IE11💕
-->

---

# IEサポート

<img src="/ie11_eol.png" alt="IE11 EOL" class="mt-10 mx-auto">

<!--
6月15日 一般Win10終了

→ Edge IE Mode

2029年以降完全終了。。。

終わんないですね。
-->

---

# 期待できる新機能

### ネイティブなESインポート

<div class="w-1/3 mb-8">
```ts
import react from "react";
```
</div>

- フロントバンドルすることが不要
- コードスプリティング無料で付いている
- 爆速で開発
  - 立ち上げる時間短縮
  - HMR: 編集した内容が一瞬で反映

<div class="flex justify-around mt-10">
  <a href="https://www.snowpack.dev/" class="!border-none">
    <img src="/snowpack_logo.png" alt="Snowpack">
  </a>

  <a href="https://vitejs.dev/" class="!border-none">
    <img src="/vite_logo.png" alt="Vite">
  </a>
</div>

---

# 期待できる新機能

### CSS グリッド

<div class="-mt-4" />

https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout

<img src="/css_grid.png" alt="CSS Grid Layout" class="mt-20">

---

# 期待できる新機能

### CSS アスペクト比

<div class="-mt-4" />

https://developer.mozilla.org/ja/docs/Web/CSS/aspect-ratio

---
layout: section
---

# 2/6: ダークモード 🌘

---
layout: center
---

<img src="/dark_mode_macos.png" alt="macOS Dark Mode guide">

<!--
MacOS Mojave・Windows 10からダークモードの対応
-->

---

# メディアクエリー

<div class="w-2/5">
```css
@media (prefers-color-scheme: dark) {
  body {
    background: #333;
    color: white;
  }
}

@media (prefers-color-scheme: light) {
  body {
    background: white;
    color: #555;
  }
}
```
</div>

<img src="/google_homepage.png" alt="Google Homepage" class="abs-br m-8">

---

# トグルボタンで切り替え

<div class="w-2/5">

### HTML

```html
<body data-theme=”dark”>...</body>
```

<div class="mt-4" />

### CSS

```css
body[data-theme=”dark”] {
  background: #333;
  color: white;
}

body[data-theme=”light”] {
  background: white;
  color: #555;
}

```
</div>

<img src="/docker_docs.png" alt="Docker Docs" class="abs-br m-8">

---
layout: section
---

# 3/6: マイクロフロントエンド

---
layout: center
---

<img src="/micro_frontends.png" alt="Micro Frontends layout" class="m-8">

<div class="text-center">

https://micro-frontends-japanese.org/

</div>

---

# 実現する方法

<ul>
  <li>
    Web Components

https://developer.mozilla.org/ja/docs/Web/Web_Components

  </li>

  <li class="mt-12">
    WebpackのModule Federation機能

https://blog.hiroppy.me/entry/module-federation

  </li>
</ul>

---
layout: section
---

# 4/6: フロントエンド・<br>バックエンドを<br>よりシームレスにする

---

# シームレスにする戦略

- API層をなくす
- サーバで動く処理をフロント内にインポートして使用
- フロントエンドデータのステート管理をなくし、サーバに移動

---

# Blitz.js

https://blitzjs.com

<img src="/blitzjs.png" alt="Blits.js" class="mt-8">

<!--
レイルズのフルースタックJS版

メイン特徴：Zero APIデータレイヤ

Next.jsベース（これからフレームワーク依存をなくす）

Recipe：ワンコマンドでライブラリを導入
-->

---

# Remix

https://remix.run

<img src="/remix.png" alt="Remix.js" class="mt-8">

<!--
React routerチームが作ったフレームワーク

WEB基礎を重視しながらSPAでいいUXを提供したい

フロントエンドエンジにエアを騙してフルスタック開発をさせる

昔のPHP開発と似たような構成（上：サーバ側処理、下：HTML）

去年12月v1になった（安定ではなく、API固定するだけ）

現在React対応のみ（他のSPAも対応する予定らしい）
-->

---

# RedwoodJS

https://redwoodjs.com

<img src="/redwoodjs.png" alt="RedwoodJS" class="mt-8">

<!--
スタートアップ向けのフレームワーク

伝統的なライブラリーをまとめる
-->

---

# Inertia.js

https://inertiajs.com

<img src="/inertiajs.png" alt="Inertia.js" class="mt-8">

<!--
Laravel/Railsの場合はこちら

React or Vue or Svelte対応

【NEW】SSR機能
-->

---
layout: section
---

# 5/6: ビルドしたJSの量を<br>減らす

---

# JSを最低限にする

- JSを減らす＝爆速できる
- ランディングページなどスタティックパーツをHTML・CSSにビルド

---

# Astro

https://astro.build

<img src="/astro.png" alt="Astro" class="mt-8">

<!--
GatsbyなどSSGの進化版みたいな？

コンポーネント単位で明示的指定しないとJS処理が無くされて単純なHTML・CSSになる

みんな大好きなSPA（React・Vue.js）でフロントを実装する
-->

---
layout: section
---

# 6/6: WEB3.0

---
layout: center
class: text-center
---

# WEB 1.0

<img src="/abe_hiroshi.png" alt="阿部寛のHP" class="mt-8">

<!--
WEB1.0: HTML=ドキュメント

読み取り専用ページ

スクショちゃんと取れない :(
-->

---
layout: center
class: text-center
---

# WEB 2.0

<img src="/web2.png" alt="WEB2.0 Sites" class="mt-8">

<!--
誰でもコンテンツ共有することを参加できる

情報の集約

バカデカイテック企業の誕生
-->

---

# WEB 3.0

- データを分散させる
  - ユーザーが各自でデータを管理できる


- サーバの代わりにブロックチェーンに乗せる
  - Etheriumネットワークの利用


- Dapp (decentralized application)
  - フロント側の実装が今までと変わらない
  - バックエンドはスマートコントラクトを実装

---

# WEB 3.0 関連ライブラリー

<ul>
  <li class="mt-12">
    Metamask<br>
    認証・決済<br>
    <a href="https://metamask.io/">https://metamask.io/</a>
  </li>

  <li class="mt-12">
    Solidity<br>
    バックエンド実装（スマートコントラクト）<br>
    <a href="https://solidity-jp.readthedocs.io/ja/latest/">https://solidity-jp.readthedocs.io/ja/latest/</a>
  </li>
</ul>

<img src="/metamask.png" alt="Metamask Logo" class="absolute top-32 right-18">
<img src="/solidity.png" alt="Solidity Logo" class="absolute bottom-24 right-36">

---
src: ../slides/end.md
---
