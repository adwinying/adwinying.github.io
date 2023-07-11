---
theme: ../theme
title: PHPのモテ期、再び来たのか？
info: PHPはまだオワコンじゃないよー
event: Webエンジニアゆる飲み会＠池袋【第4回】
event_url: https://crewbit.connpass.com/event/287551/
layout: section
---

# PHPのモテ期、<br>再び来たのか？

https://iAdw.in/talks/2023-07-14

<!--
今日は[title]についてお話したいと思います

背景ですが、自分英語第一言語なので情報収集も英語メインでやっています

英語圏Twitterで面白い現象が起きたのでみんなに共有したいと思います
-->

---
src: ../slides/profile_ja.md
---

---
layout: section
---

# PHPが最もつかわている<br>サーバーサイド言語ですが

<!--
早速本題に入りますが
-->

---
layout: section
---

# PHPいつもネタ言語にされる

<!--
いまだにPHP7前の黒歴史がまだまだ印象に残られていますね
-->

---
layout: section
---

# でも、<br>そのPHPがまた注目される？

<!--
そうです、あの不人気のPHPが流行っています
-->

---
layout: section
---

# きっかけ

<!--
なんと。。
-->

---
layout: iframe
url: https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components
scale: 0.5
---



<!--
なんと、Reactです。

React はCSR、つまりクライアント側で描画を行なっていますが

それがGoogleなど検索サイトに不利なことがあってSSRが登場されています

SSRがクライアント側で描画するだけではなくサーバ側もやることで検索エンジンがサイトの内容が解読できます

つまり、  
CSR = クライアントのみ
SSR = サーバ＋クライアント
RSC = ??

RSCはサーバで実行した結果をよりシームレスに使える

サーバ処理をクライアントで実行する訳にはいかないのでサーバのみのことになります

こちらの機能ですが、開発者が直接使う機能ではなく各フレームワークを導入しなければなりません

そこで。。
-->

---
layout: iframe
url: https://nextjs.org/blog/next-13-4
scale: 0.5
---



<!--
React最も人気フレームワーク、Next.jsが今年5月にRSCをリリースしました

これがきっかけで、PHPが話題になっています
-->

---
layout: section
---

# ReactとPHPって<br>どういう関係なの？

<!--
皆さんが疑問に思うかもしれませんが、

ReactはJSで、PHPじゃないんだけど

一体どういう関係があるの？

と思うかもしれませんが、、
-->

---
layout: two-cols
class: p-3
---

## RSC

```tsx {all|2-3|6-13|none|all}
export default async function App() {
  const usersReq = await fetch('/users');
  const users = await usersReq.json();

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  )
}
```

::right::

## PHP

```php
<?php
  $usersJson = file_get_contents('/users');
  $users = json_decode($usersJson);
?>

<main>
  <h1>Users</h1>
  <ul>
    <?php foreach ($users as $user) { ?>
      <li><?= $user->name ?></li>
    <?php } ?>
  </ul>
</main>


```

<!--
まずコードを見てみましょうー

[コード説明]

大体同じ処理の流れですね

そうかと言っても実際にいろんな違いがあるんですがそれは置いといて

あの時の反応を少し見ていきましょう
-->

---
layout: two-cols
---

<div class="mt-50 mr-6 text-right">

# "RSCはただのPHP"

</div>

::right::

<Tweet id="1658662026997125120" scale="0.7" />

<!--
ただのPHPじゃん

こう言ったコメントでJSとPHPのコミュニティがぶつかり合ってて

JS開発者がPHPの世界に曝け出した
-->

---
layout: two-cols
---

<div class="mt-50 mr-6 text-right">

### "Reactが発表した新機能なのに<br>みんなPHP・Laravelについて<br>勉強している"

</div>

::right::

<Tweet id="1656202220331999233" class="mt-20" />

<!--
結果として、、

[ツイート説明]

JS開発者たちはどんな評価されていますでしょうか？
-->

---
layout: two-cols
---

<div class="mt-45 mr-6 text-right">

### "新しく作ったLaravelプロジェクトは<br>自分で作ったアプリよりいい"

  <div class="mt-1">
    <simple-icons-youtube />
    <a href="https://www.youtube.com/watch?v=Spwv0RbITmE">
      Laravel First Impressions<br>From A JavaScript Dev
    </a>
  </div>
</div>

::right::

<Tweet id="1655722864400642048" class="mt-14" />

<!--
JS開発者が実際Laravelを試すことを動画してみてこういう感想でした:

[ツイート説明]

すごく高評価みたいですね
-->

---
layout: two-cols
---

<div class="mt-50 mr-6 text-right">

# "NuxtをやめてLarvelにしようか"

</div>

::right::

<Tweet id="1656893717100511235" scale="0.75" />

<!--
こんな好評価を受けてもう一人が  

[title]

「JS開発者がLaravelが少しでもいい可能性について信じがたいことが面白い現象である」
-->

---
layout: section
---

# 結局、PHPは<br>またクールになったか？

<!--
[title]ということですが

残念ながら

その後新しい出したJSフレームワークに注目が移動されてまたPHPが落ち着いてめでたしめでたしー

少くなくてもPHPの印象が良くなったのかとそう信じたいです
-->

---
layout: section
---

# 最後に

<!--
最後なんですが
-->

---
layout: section
---

# PHPは永遠にネタ言語のままかもしれないが、、

---
layout: two-cols
---

<div class="mt-50 mr-6 text-right">

# PHPには夢がある！

</div>

::right::

<Tweet id="1534178479201259520" scale="0.8" />

<!--
このかっこいランボーの持ち主がなんとLaravel創造者Taylorさんです

PHPでGAFAに入ろうとしては難しいことかもしれないですが

いい商品を提供すれば誰でもPHPで稼げると思います
-->

---
layout: center
class: text-center
---

# オマケ

<Tweet id="1560020999378292736" />

<!--
オマケですが

Laravel開発者しか分からないネタです

アメリカで特別なナンバープレートが作れるらしくて

Taylorさんが「Facade」にしましたw
-->

---
src: ../slides/end.md
---
