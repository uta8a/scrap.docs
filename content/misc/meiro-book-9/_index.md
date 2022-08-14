---
layout: misc
title: 第9回詳解セキュリティコンテスト輪読会の記録
description: 輪読会の記録。
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-08-14T18:37:43+09:00
  - summary: 完成
    date: 2022-08-14T20:48:19+09:00
  - summary: 話題を追記
    date: 2022-08-14T21:02:30+09:00
---

# 第9回詳解セキュリティコンテスト輪読会の記録

範囲: p.205 - p.226 Blind XXE手前まで

## redisについて

redis使ったことないという話になった。redisはインメモリ型のkey-value storeで、PubSubで使われていたりするみたい。 [PubSub/Redisを用いたGoによるスケーラブルなworkerの構築と運用](https://engineering.mercari.com/blog/entry/20211216-09550a386d/)

RDBが物理ディスクなので処理速度が遅く上限に達しやすいのに対して、インメモリ型のRedisは速いという特徴がある。ただ、Redisの方が信頼性は低いので個人情報に関係ないものやキャッシュとしての利用が多いイメージがある。

## gopherプロトコルが使えるとき

なぜgopherプロトコルを使うのか？利点は？→gopherプロトコルはMySQLとの通信にも使えたりと、任意の通信が改行付きでできてすごい汎用性が高い。

- 参考: [extract0r - web - medium](https://ctftime.org/writeup/8525) SQLと通信
- 参考: [ISITDTU CTF 2018 - Friss](https://graneed.hatenablog.com/entry/2018/07/29/043001) SQLと通信パート
- 参考: [SSRF基礎](https://speakerdeck.com/hasegawayosuke/ssrfji-chu?slide=16) gopherプロトコルは改行が使えるのが強い。また、リクエストヘッダー付きリクエストもgopherなら可能

gopherプロトコルはリアルワールドでバグバウンティで使うシーンがありそう

## Orangeさんの発表

パーサとSSRFに関するOrange Tsuiさんの発表

- 参考: [blackhatの発表](https://www.blackhat.com/docs/us-17/thursday/us-17-Tsai-A-New-Era-Of-SSRF-Exploiting-URL-Parser-In-Trending-Programming-Languages.pdf)
- 参考: [Youtube](https://www.youtube.com/watch?v=R9pJ2YCXoJQ)
- 参考: [ode.js における http モジュールでの Unicode の扱いと SSRF について](https://blog.ssrf.in/post/nodejs-unicode-encoding-and-ssrf/) もりたこさんのブログ。分かりやすく解説されている。

JSの内部表現がUTF-16で、サロゲートペアで分離されて解釈されると、 `..` をpathモジュールでは検知できないがhttpモジュールでは検知されてディレクトリトラバーサルが発火するという仕組み。

## サロゲートペア

絵文字でiPhoneがクラッシュするバグがかつてあったなど、サロゲートペア関連は色々おかしな挙動をする

- 参考: [たった1文字でiPhoneをクラッシュさせるバグ発覚、無限再起動ループの危険もあり](https://gigazine.net/news/20180216-iphone-crush-letter/) 2018年
- 参考: [Host/Split](https://i.blackhat.com/USA-19/Thursday/us-19-Birch-HostSplit-Exploitable-Antipatterns-In-Unicode-Normalization-wp.pdf)

## XXE

lxmlモジュールの設定でDTDによる外部実体参照をしなければXXEは起きないので対策になる。どのくらい外部実体参照は使われているんだろう？(不明)

`no_network=False` になっているからSSRFが成立する。ここを `True` にすればネットワークを介する攻撃は防げる。

## 問題

- [SECCON 2020 Milk, Milk Revenge (hakatashiさん作)](https://tech.kusuwada.com/entry/2020/11/02/061455#section3)
- [TokyoWesternsCTF 2019 j2x2j](https://st98.github.io/diary/posts/2019-09-14-tokyowesterns-ctf-5th-2019.html#j2x2j-web-59)

## 話題

セキュリティキャンプの話題や、DEFCONの季節なのでそういう話が出た。

- [れっくすさんのCTF Radio #0: DEF CON CTF Finals 直前企画](https://youtu.be/GM5-xJnB5iw) DEFCONに出る人たちが現地でどういう感じなのかという話をする。結構CTF以外パート(ラスベガスの話)もあって楽しく聴けて面白い
- [DEF CON LiveCTF 2022 - Day 1](https://www.youtube.com/watch?v=DCFlJWVBfkk&t=6047s) DEFCONのスピードランみたいなやつ？これにptr-yudaiさんが `./V /home/r/.bin/tw` 代表として出ている。画面も映されていて面白い。TSG LIVE! CTFでも一度ptr-yudaiさんの画面が映されたことがあった。

来週からCryptoパートに入るのでdevcontainer作った。 [uta8a/crypto.devcontainer](https://github.com/uta8a/crypto.devcontainer) 本に書いてあるツール全部入りです。4GBもあるから減らしたいですね。
