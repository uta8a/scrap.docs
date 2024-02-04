---
layout: book
title: 詳解セキュリティコンテスト輪読会資料#7
description: 輪読会第7回の資料
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-07-31T16:19:13+09:00
---

# 詳解セキュリティコンテスト輪読会資料#7

範囲: p176 - p188終わりまで

今回はあまり言及することないかも。

## 9.5 INSERT/UPDATE文

これも原理としてはSELECT文と同じ。Errorベース、Timeベース、その他アプリケーションロジックを利用したものがある。

## 9.6 ブラックボックスでの見つけ方

これは有用。とりあえず `'` 入れてみるとかやりがち(500が帰ってくると嬉しい)

## 追加: NoSQL問、ORMについて

NoSQL問とORM系に触れられてないので補足。

NoSQLだと過去にMongoDBやRedisが出ている。

- [graneedさんの2020年まとめ: mongoDB](https://graneed.hatenablog.com/entry/2021/08/09/115452#NoSQL-Injection)
- [graneedさんの2020年まとめ: Redis](https://graneed.hatenablog.com/entry/2021/08/09/115452#Redis%E3%81%B8SSRF%E3%81%97%E3%81%A6%E4%BB%BB%E6%84%8F%E3%81%AE%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E5%AE%9F%E8%A1%8C)

ORMを使えば大抵の文字列結合は避けられるので安心だけど、go言語のORM, GORMには仕様通りの脆弱性、 [Gormにおける「仕様通り」なSQLインジェクションの恐れのある実装についての注意喚起](https://tech.andpad.co.jp/entry/2022/02/18/140000) がある。

- [CPCTF22 Generate ORiginal Memo](https://trap.jp/post/1572/)

## メモ

Redisといえば、zer0pts ctf 2022で出題されたptr-yudaiさん作のlunatic問題 redis-lite がある。 [redis-lite](https://ptr-yudai.hatenablog.com/entry/2022/03/21/212054#redis-lite-3-solves)

WaniCTF spring 2021 にSQL Injectionの出題例があったのでホスティングの仕方が分かった [参考: wanictf Watch Animal](https://github.com/wani-hackase/wanictf21spring-writeup/tree/main/web/watch_animal)

## 雑談

SIDHが破られたらしい [Twitter](https://twitter.com/IACR_News/status/1553384444890841088)
