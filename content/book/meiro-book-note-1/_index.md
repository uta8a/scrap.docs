---
layout: book
title: 詳解セキュリティコンテスト輪読会資料#1
description: 輪読会第1回の資料
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-05-19T17:15:24+09:00
  - summary: 6.4終わりまでやったのでメモ
    date: 2022-05-19T17:50:20+09:00
  - summary: 6章終わりまでやったのでメモ
    date: 2022-05-20T09:35:03+09:00
---

# 詳解セキュリティコンテスト輪読会資料#1

## 概要

### 1章

**一言まとめ**: CTFとはなに？概要説明

### 2章

**一言まとめ**: Vagrantfileで環境構築できましたか？環境構築できていたらOK(おそらく環境構築自体はisolatedであればいいはず。VMwareでやった)

コメント: 参考リンクとして、 [公式ページ](https://ctfbook.github.io/2nd/) と [githubのリンク](https://github.com/ctfbook/2nd) を見ておけばよさそう。演習のファイルはgithubの `dist/` 以下にある。

僕のやり方: VMware Ubuntu 20.04 上で、 `dist/` 以下のファイルを触る方針

**話題**

- 過去問は初心者向けで常設、もしくは手元で動かせる過去に開催されていたCTFが良い。基本新しいものからやるべき
  - 初心者に良さそうなやつ
  - [wanictf 2021 (github)](https://github.com/wani-hackase/wanictf2021-writeup)
  - [SECCON Beginners 2021 (github)](https://github.com/SECCON/Beginners_CTF_2021)
  - [cakeCTF 2021 (github)](https://github.com/theoremoon/cakectf-2021-public)
  - [picoCTF](https://picoctf.org/)
  - [angstromCTF 2022](https://2022.angstromctf.com/)

### 3章

**一言まとめ**: Dockerの使い方 ここは見返せばいい。socatとか

**話題**

- 暗号用にz3, sage, pycryptodome, pythonの最新が入ったdevcontainer環境が欲しいですね

### 4章

**一言まとめ**: Pythonの使い方 これも後で見返せばいいパターン

知らなかったこと
 
```shell
$ python -q
# ごちゃごちゃバージョンなどのログが出ることなくスッとプロンプトが出てくる
```

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
- [ ] p.86 コード6-17 nginx (>省略)
- [ ] p.88 コード6-18 webapp (>やった)
- [ ] p.93-96 Burp Intercept/Repeater (>やった [video link 1](https://drive.google.com/file/d/1NQvetUmg3WxDFRAVBro6ZTRbi2y6INFL/view?usp=sharing) / [video link 2](https://drive.google.com/file/d/1dkgJUOvK7n3PfpfBgZ4Xoj4A4t9g8heL/view?usp=sharing))
  - Burpの導入は、Vagrantfileを見るとターミナルからできる。 [該当箇所](https://github.com/ctfbook/2nd/blob/c364a010b936eb428c70e91b656965a9b2e95bec/dist/Vagrantfile#L73-L79)
- [ ] p.97-101 Burp Intruder(>やった)
- [ ] p.103-113 SQLの実習パート(>半分くらいやった)

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
- p.88 コード6-18のwebappが動かないので動くようにした
  - これは割と些末な話なのでskipしていいかも
- p.90 Burp: [WebSecurity Academy](https://portswigger.net/web-security) がいい学習リソースだよという紹介
- p.102 decoder: 単なるencode/decodeは [CyberChef](https://gchq.github.io/CyberChef/) も便利。送信もセットで楽に行える点でBurpに強みがある。
- p.113 Webブラウザセキュリティ: [Webブラウザセキュリティ ― Webアプリケーションの安全性を支える仕組みを整理する](https://www.lambdanote.com/products/wbs) が参考になりそう。
- p.113 Webブラウザセキュリティ: ちょっと外れる話題だけど、Shadow DOM Closedとchrome extensionの話題と、prototype pollutionによりclosedは回避できるのでDOMにセキュアな情報は置いてはいけないという話

## メモ

- CTFホスティングしてみたい。軽く雑にやるならCTFdなのかな？
- [SECCON Beginners 2022](https://www.seccon.jp/2022/seccon_beginners/content.html) 2022/6/4(土)14:00JST～2022/6/5(日)14:00JST がありますね！
