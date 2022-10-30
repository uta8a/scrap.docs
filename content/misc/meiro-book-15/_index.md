---
layout: misc
title: 第15回詳解セキュリティコンテスト輪読会の記録
description: 輪読会記録
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-10-30T21:19:37+09:00
  - summary: 完成
    date: 2022-10-30T21:28:38+09:00
---

# 第15回詳解セキュリティコンテスト輪読会の記録

範囲: p.305 - p.318

## RSA問

[TSGCTF OPQRX](https://furutsuki.hatenablog.com/entry/2019/05/05/163313#Crypto-497pts-10-Solves-OPQRX) が話題に上りました。

あと、 [elliptic-shihoさんのkatagaitai workshopの資料 pdf](http://elliptic-shiho.github.io/slide/katagaitai_winter_2018.pdf) はとても良いです。

## 開発者サイドは知っているけどセキュリティサイドはあまり知らない知識を探す

TsukuCTF2022が話題に上りました。

公開鍵のGCDが取れちゃう設定の問題で、ジャンプとしてsecret keyがあればgithub usernameが特定できるというものがありました。これは開発サイドからすると [GitHubの公式ページにも書いてあるように](https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection) 割と一般的事実なのですが馴染みのない人もいるのか、と驚きました。こういう非対称な知識差を利用した問題作ってみたいですね。
