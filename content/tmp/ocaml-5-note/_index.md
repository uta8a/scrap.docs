---
layout: misc
title: OCaml 5.0.0 について調べてみたメモ書き
description: OCaml 5.0.0 からすごくなるらしいのでメモ
draft: true
changelog:
  - summary: 見出し作成
    date: 2022-12-05T11:24:05+09:00
  - summary: 紹介部分まで書いた
    date: 2022-12-05T11:47:54+09:00
---

# OCaml 5.0.0 について調べてみたメモ書き

これはスライドで発表する下書きとして書いてます。

## 目次

- OCaml 5.0.0 の紹介
- 歴史: 以前からMultiCore Ocamlというものがある
- 身近な話との接点: ECMAScriptで議論が立っていた、React Fiberの仕組みとの関連
- いくつかの疑問の解消
  - マルチコア関連
    - マルチコアになると現状のOCamlでは何が困るのか？言語処理系が対応することとは
    - 他の新しい言語(Go, Rust)ではマルチコア対応の仕組みはどうなっているのか？
  - Algebraic Effects関連
    - そもそもどういうものなのか。仕組みと、できること
    - Reactとの関係は？Overreactedの復習と記事の理解
- まとめ
  - 今後勉強すると良さそうな資料

## OCaml 5.0.0 の紹介

InfoQの [OCaml 5、マルチコアサポートを導入へ](https://www.infoq.com/jp/news/2021/11/ocaml-5-multicore/) を読んで、OCamlがversion 5から大きく変わることを知りました。また、友人から「Algebraic EffectsがOCamlに入る並行・並列処理に関係しているらしい」と聞きました。Algebraic Effectsは Overreacted の [我々向けの Algebraic Effects 入門](https://overreacted.io/ja/algebraic-effects-for-the-rest-of-us/) で全く分からんが面白そうだと興味を持っていたので、この機会に再度理解チャレンジをします。

まず現在のOCamlの状況についてお話しします。GitHubのreleaseを見る限り、5.0.0-beta2 が最新のようです。[Changes](https://github.com/ocaml/ocaml/blob/5.0.0-beta2/Changes) を見ると変更点が分かりそうですが結構分量が多くて読めていません。

## 歴史: 以前からMultiCore Ocamlというものがある

## 身近な話との接点: ECMAScript, React Fiber

## いくつかの疑問の解消

## マルチコア関連

## Algebraic Effects関連

## まとめ

## 参考文献
