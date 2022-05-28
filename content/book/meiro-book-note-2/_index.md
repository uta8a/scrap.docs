---
layout: book
title: 詳解セキュリティコンテスト輪読会資料#2
description: 輪読会第2回の資料
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-05-20T15:59:17+09:00
  - summary: 分割して3回でやる分を別に移行
---

# 詳解セキュリティコンテスト輪読会資料#2

5章から、6.3, p.83まで

## 概要

### 5章

**一言まとめ**: CTFのweb問の一般構造

**話題**

- これweb問の構造全パターン網羅するように作問していくと力がつくと思う。作問するときに一般構造を頭に入れながらやりたい。

### 6章

こっから本番

Todoとして調べておきたいことはNotionにメモした。

**確認事項**

手を動かすポイント(ここでやった人いるか & 詰まった人いるか確認)

- [ ] p.56-59 html,css (>省略)
- [ ] p.60-69 js,XML (>省略)
- [ ] p.70 コード6-8 request-inspect-app.py [github link](https://github.com/ctfbook/2nd/blob/main/dist/files/web/02_basics/request-inspect-app.py) (>やった)
- [ ] p.79 コード6-9 xmlhttprequest.js (>やった)
- [ ] p.80-81 コード6-10~6-16 python requestの使い方 (>10,13のみやった)

**話題**

- p.51 Cookieによるステート管理: Cookieは廃止される？FLOCの話出す
- p.51 Cookieによるステート管理: CookieとHTTP認証(Authorization)の違い
- p.53 HTTPとHTTPS: パケットキャプチャしたことある？TLS周りだとTLS CVE-2020-13777 Challengeをいつか理解したい
  - [求む！TLS1.3の再接続を完全に理解した方(Challenge CVE-2020-13777)](https://jovi0608.hatenablog.com/entry/2020/06/13/104905)
  - [解答者のrepo](https://github.com/prprhyt/PoC_TLS1_3_CVE-2020-13777)
  - [GnuTLSの脆弱性でTLS1.3の再接続を理解する(Challenge CVE-2020-13777)](https://jovi0608.hatenablog.com/entry/2020/07/03/131719)
  - この本がTLS/SSL理解によいらしい(積んでる)が、新版が出る噂があるので新版発売を待ってもいいかも [プロフェッショナルSSL/TLS](https://www.lambdanote.com/products/tls)
- p.73 devtoolsのコンソール: コンソールのjsデバッガ使ったことないので調べると、難読化されたjsのgame cheat問で使える時がありそう？
  - [kusuwadaさんのwriteup](https://tech.kusuwada.com/entry/2020/04/05/132308#section1) ちょっと近いけど、wasm関連ならメモリチートになってjsのbreakpointとか使わないかも
  - [はまやんさんのまとめ](https://blog.hamayanhamayan.com/entry/2021/12/22/000156) が体系的でよい

## メモ

