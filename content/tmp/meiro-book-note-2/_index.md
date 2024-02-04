---
layout: book
title: 詳解セキュリティコンテスト輪読会資料#2
description: 輪読会第2回の資料
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-05-20T15:59:17+09:00
  - summary: 分割して3回でやる分を別に移行
    date: 2022-05-29T06:03:30+09:00
  - summary: ちょっと書き足した
    date: 2022-05-29T06:26:05+09:00
  - summary: FLOCとToken認証書き足した
    date: 2022-05-29T07:23:45+09:00
  - summary: simple clickerについて書き足した
    date: 2022-06-06T18:17:00+09:00
  - summary: HTTP Range Requestsについて書き足した
    date: 2022-06-13T05:56:07+09:00
---

# 詳解セキュリティコンテスト輪読会資料#2

5章から、6.3, p.83まで

## 概要

### 5章

**一言まとめ**: CTFのweb問の一般構造

**話題**

- これweb問の構造全パターン網羅するように作問していくと力がつくと思う。作問するときに一般構造を頭に入れながらやりたい。
  - トピック別に作問してみて、Webが終わったら振り返って構造のどれに当てはまるか意識したい。

### 6章

**一言まとめ**: HTTP、Webサイトを構成する要素、Webクライアントとリクエストの送り方

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
  - [FLOCについてちょっとメモしてきた](#ref-1)
- p.51 Cookieによるステート管理: CookieとHTTP認証(Authorization)の違い
  - [CookieとToken認証メモ](#ref-2)
- p.53 HTTPとHTTPS: パケットキャプチャしたことある？TLS周りだとTLS CVE-2020-13777 Challengeをいつか理解したい
  - [求む！TLS1.3の再接続を完全に理解した方(Challenge CVE-2020-13777)](https://jovi0608.hatenablog.com/entry/2020/06/13/104905)
  - [解答者のrepo](https://github.com/prprhyt/PoC_TLS1_3_CVE-2020-13777)
  - [GnuTLSの脆弱性でTLS1.3の再接続を理解する(Challenge CVE-2020-13777)](https://jovi0608.hatenablog.com/entry/2020/07/03/131719)
  - この本がTLS/SSL理解によいらしい(積んでる)が、新版が出る噂があるので新版発売を待ってもいいかも [プロフェッショナルSSL/TLS](https://www.lambdanote.com/products/tls)
- p.73 devtoolsのコンソール: コンソールのjsデバッガ使ったことないので調べると、難読化されたjsのgame cheat問で使える時がありそう？
  - [kusuwadaさんのwriteup](https://tech.kusuwada.com/entry/2020/04/05/132308#section1) ちょっと近いけど、wasm関連ならメモリチートになってjsのbreakpointとか使わないかも
  - [はまやんさんのまとめ](https://blog.hamayanhamayan.com/entry/2021/12/22/000156) が体系的でよい

## メモ

- CSS Injectionはp.152にあるのでその時触れたらよさそう。
- XSSで出てくると思うけど、credentialをブラウザのどこに格納すべきかという話(XSSの時に触れたらいいかな)
  - [アクセストークンをWebWorkerで扱う](https://lealog.hateblo.jp/entry/2021/06/09/134854) この記事内にあるAuth0のリンクが参考になる
- XXEはp.217であるのでその時触れたらよさそう。
- Web問のクライアントの取り扱いに関して簡単な問題を作ってみた。 [単純なCTFの問題作問: Simple Clicker](https://scrap.docs.uta8a.net/misc/web-chall-simple-clicker/)
- SECCON ctf4bに [HTTP Range Requests](https://qiita.com/task4233/items/9b4f7bcf52cc87a9c7ad#web-83pt-gallery156-solves) 出ましたね

### <a name="ref-1"></a>FLOCメモ

FLOCはサードパーティCookieに代わる広告関連のブラウザAPI。FLOCはトライアル期間が2021/7/14で終了。また現在FLOCはTopics APIに代わった。

- [FLoCとは何ですか？ - web.dev](https://web.dev/i18n/ja/floc/)
  - 広告に用いられるCookieの追跡やデバイスのフィンガープリントの手法はプライバシーに影響するので、プライバシーの保護と適切な広告の選択を両立する仕組みとしてFLOCがある。
  - コホートという概念に基づいていることは分かったが複雑なので理解を一旦諦めた
- [プライバシー サンドボックスの新しい Topics API について - Google Japan blog](https://japan.googleblog.com/2022/01/topics-api.html)
  - ブラウザが閲覧履歴に基づいて関心の高い項目を選択。この選択はクライアントデバイスのみで行われる。広告主にはその項目が共有される。

### <a name="ref-2"></a>CookieとToken認証メモ

- [JWTを認証用トークンに使う時に調べたこと](https://christina04.hatenablog.com/entry/2016/06/07/123000)
  - この記事がcookie/tokenやjws/jweやcsrf/xssなど様々な違いを説明しててよかった。
- [JWT・Cookieそれぞれの認証方式のメリデメ比較](https://qiita.com/doyaaaaaken/items/02357c2ebca994160804)
  - これもTokenベースについて言及ある
- 僕がHTTP認証(Authorization)と書いているのは正しくはTokenベースの認証。認証フローは同じだけど、Tokenベースは認証したという事実をサーバ側でもたない点が異なる。そのためリクエスト毎にTokenを送る(認証に成功したという事実を送る)
