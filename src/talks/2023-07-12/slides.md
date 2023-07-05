---
theme: ../theme
title: HTMLで書類を作りましょう
info: HTMLで作ったドキュメント、意外といいぞ。
event: 2023年7月レバテックLT会議
layout: section
---

# HTMLで書類を作りましょう

https://iAdw.in/talks/2023-07-12

---
src: ../slides/profile_levtech.md
---

---
layout: section
---

# 昔話

<!--
中1の時の話をさせて

15年前のこと

地理のレポートをワープロで作った

家にプリンタがない

コピーセンターでファイル開くと完全に変な表示になってしまいました

- 1ページに収まるものが2ページ
- 図の位置が完全に変わった

3時間を掛けて修正した

その日までの提出→ストレスしすぎて確実に寿命縮めた
-->

---
layout: section
---

# 今頃はもう<br>崩れしないだろう？

<!--
すでに15年経ったのでもう起こらないんじゃないか？

実は、そのレポートを探してみまして、実物を見つかりました

ちょっと開いて、どんな結果になっているか皆さんにお見せします！
-->

---
layout: center
---

# Microsoft Word デスクトップ版

<img src="/office_desktop.png" alt="Screenshot" class="mx-auto max-h-sm">

<!--
確かにWord 2003で作ったレポートなので最初にWordで試してみました

Office 365 のデスクトップ版ですが

なんと、作った通り崩れない！

やっぱ進展があったか。。

でも、書類はクラウド上に保存する時代だし、  
最近プライベートでOfficeはそんなに使わないので別のプログラムでも開きたいですね
-->

---
layout: center
---

# Microsoft Word WEB版

<img src="/office_web.png" alt="Screenshot" class="mx-auto max-h-sm">

<!--
そこで、クラウド版Wordで開いてみました

なんか、2ページになっちゃってます？！
-->

---
layout: center
---

# Apple Pages

<img src="/apple_pages.png" alt="Screenshot" class="mx-auto max-h-md">

<!--
諦めずに、Macbook 無料で使えるワープロ「Pages」で試してみました。

さらに酷い😢
-->

---
layout: center
---

# Google Docs

<img src="/google_docs.png" alt="Screenshot" class="mx-auto max-h-md">

<!--
Google Docs はさらにやばいですね。。
-->

---
layout: section
---

# レイアウト崩れ対策？

<!--
じゃあどう対応すればいいのでしょうか？

永遠にWordを使えばいいじゃんも思ったが、やはり縛られたくないですね
-->

---
layout: section
---

<style>
.title:has(+ .slidev-vclick-target:not(.slidev-vclick-hidden)) {
  @apply line-through
}
</style>

<h1 class="title">PDF</h1>

<div v-click class="-mt-4 text-neutral-400">
編集不可
</div>

<!--
第一候補はPDF

崩れない書類と言えばPDFですね

でもPDF化したら編集できないですね。。
-->

---
layout: section
---

<h1 class="title">Markdown</h1>

<div v-click class="-mt-4 text-neutral-400">
自由にレイアウト変更できない＋アプリによりデザインが変わる
</div>

<!--
じゃMarkdownはどうかと思ったら

シンプルな書類はいいんですが、

レイアウトを自由にできないですね

しかも使っているアプリによってデザインが変わりますね
-->

---
layout: section
---

# レイアウト崩れにくい<br>といえば？

<!--
じゃ何がいいのか？

レイアウト崩れにくいは何なんだろう？
-->

---
layout: cover
background: /browsers.jpg
---

# ウエブですよ！

<!--
皆んながご察した通り：ウエブですね！

どんなブラウザ・どんな端末でも同じく表示されます

じゃあどうやってHTMLで書類を作るの？
-->

---
layout: section
---

# Demo

<!--
これからお見せします！

1. WEBページを開く
- 自分の職歴書をHTMLで書いてみました
- ごく普通のWEBページに見えますね
- 少し工夫をしたのでスマホの幅にしても対応できます
- URLを公開しれば誰でも書類の最新バージョンが手に入れます

2. ファイル化
- やはり書類なので、URLかHTMLファイルを相手に送っても困れせちゃうのでPDFにします
- 普通のファイルと変わらないですね
- ここでお見せしたいポイントですがWEB上にないページ下部の余白です  
→ CSSルールで各部分を必ずページ一つに収めるように設定します
- 場所が足りなけれれば次のページに出力します

3. ソースコードを見せる
- 一旦WEBページに戻ります
- 今度はソースコードを見せします
- Githubに上がっています  
→ Git管理すると誰・いつ・何を修正したのか一目瞭然です
- WEBフォント  
→ ブラウザ自動でやってくれるので自由に変なフォントを使えます
- ソースコード下部の Javascript  
→ 今日の日付を自動設定で、出力する際に度々日付を修正する手間が省けます

お見せしたいことはこれで以上です
-->

---
layout: center
---

# HTMLでドキュメントを作成した方がいい

- どのブラウザ・どの端末でも表示が一緒
- 変なフォントを使っても文字化けしない
- WEBページが無料で付く
- Javascriptとでスマートドキュメント実現可能
- Gitと組み合わせてバージョン管理可能

<!--
最後に全部をまとめると  
**「HTMLドキュメントを作成した方がいい」**  
です

なぜかって言うとこちらの理由です：
-->

---
src: ../slides/end.md
---
