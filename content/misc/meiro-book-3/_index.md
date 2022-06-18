---
layout: misc
title: 第3回詳解セキュリティコンテスト輪読会の記録
description: 輪読会の記録
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-06-19T05:03:39+09:00
  - summary: 記事完成
    date: 2022-06-19T06:01:09+09:00
---

# 第3回詳解セキュリティコンテスト輪読会の記録

今回はp.84 - p.122までが範囲で、内容としてはBurpとCSPが中心でした。

## 6章後半

### nginxの仕様上存在する、不注意で起こりうるパストラバーサル

nginxは `location` に対して置換を行う `alias` ディレクティブの仕様で、パストラバーサルが発生する alias traversal という脆弱性があります。

[CPCTF2022](https://trap.jp/post/1237/#webforbidden-2-easy) で出題歴があり、 [graneedさんの記事 - 11-1.nginxの設定不備](https://graneed.hatenablog.com/entry/2019/12/29/115100#nginx%E3%81%AE%E8%A8%AD%E5%AE%9A%E4%B8%8D%E5%82%99) も併せて読むと良い。また、Apacheでも似たようなaliasに関するパストラバーサルについての問題が出題されたことがあるそう。

### Burp Suiteの学習方法

- [TryHackMe](https://tryhackme.com/) が学習の初手としていい感じ。教材みたいに学習を進められる。
- [WebSecurityAcademy](https://portswigger.net/web-security) はBurpの開発元が出してて最近も更新されているしとても良い問題を解く形式の教材。せっかくならBurp Proの1ヶ月お試し期間を登録して、Burp Proで解いてみるのも良さそう。
  - BurpのProとCommunity Editionの違いは、Proになると機能制限がなくなる点が異なっている。(無料版だと速度が遅いのがなくなる、など)

### Burpのdecoder/encoder

通信を伴わないなら、[CyberChef](https://gchq.github.io/CyberChef/) も便利。ブロック状にencode/decode処理などを積み上げられるのが便利。

余談だけど、 [CyberChefの0dayが含まれる問題](https://blog.p6.is/writeups-for-hayyim-security-ctf-2022/) がCTFで出たことがある。

### CORSの疑問: POSTにはプリフライトリクエストなくていいのか

[CORSの原理を知って正しく使おう - 徳丸さんのyoutube](https://youtu.be/ryztmcFf01Y) で、「単純でないリクエスト(PUTなど)はプリフライトリクエストが必要だけどPOSTとかは単純なリクエストなのでいらない」という趣旨の話があり、PUTでプリフライトリクエストが必要な理由は分かったが、なぜPOSTではつけなくていいのか？ということが分からず少し調べた。

結論としては、これまでもhtmlでクロスオリジンなリクエストは発生していてセキュリティ対策されていると思われるので新たな脅威としては扱わないということなのでは？という感じ。(あまり確証が得られたわけではない)

参考
- [Why is there no preflight in CORS for POST requests with standard content-type](https://stackoverflow.com/questions/39725955/why-is-there-no-preflight-in-cors-for-post-requests-with-standard-content-type)
- [なんとなく CORS がわかる...はもう終わりにする。](https://qiita.com/att55/items/2154a8aad8bf1409db2b)
  - CORSはコルスと呼ばれているっぽい？
  - 英語圏だとコーズとかコォスと言うのかもというのも見かけた
  - 徳丸さんのYoutubeだとシーオーアールエスと読んでいる
- [CORSの仕様はなぜ複雑なのか](https://zenn.dev/qnighy/articles/6ff23c47018380)
  - CORSの歴史的な話も載っている。「preflightが不要なケース」がそれに該当しそう。

### 他にCORS関連の話題

- フォームはinputにtokenを入れて、CSRF対策とかbotの連続送信やユーザが誤送信で二重に送ってしまうのを防いだりするのが一般的。
- CORSが開発で問題になるパターン
  - localhostで別々のポートで起動しているサービス同士の通信でCORSエラーで詰まる
  - goのフレームワークEchoのmiddlewareでは `e.Use(middleware.CORS())` というようにデフォルトを使うと全てのオリジンと全てのメソッドを許可してしまう。本番環境では細かく制御する必要がありそう。
  - 認証など、一旦サービスAに飛んでからサービスBにリダイレクトして認証処理を行いサービスAに戻るタイプのやつはOAuthでありがちだけど、サービスAだけ許可してサービスBは許可してないからCORSエラーが出るとかはありそう。
  - フロントエンド開発でS3から画像取得する時にCORSエラーで困ることがある。S3側で設定をする必要がある。
- portがOriginに含まれるのはなぜ？別サブドメインで別事業者のサービスが起動はわかるけど、別ポートからの攻撃ってありうるのだろうか？(この疑問は歴史的事情の気配がするので気が向いたら調べることにした)
- ブラウザの歴史とかが大事そう。Webブラウザセキュリティが良い本なので読みたい。

## メモ

### PayloadAllTheThingsについて

[PayloadAllTheThings - SQL Injectionの項](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection) を見ると、色々なペイロードが載っていて良い。

[ctf4b textexの作問者writeup](https://github.com/satoki/ctf4b_2022_satoki_writeups/tree/3dbf741d8f408dc8e717691b25cbe7549eed85fe/web/textex#%E8%A7%A3%E6%B3%95) でもPayloadAllTheThingsが紹介されていた([LaTeX Injection](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/LaTeX%20Injection))

### WebサイトやAPIへのアクセス、どこからがまずい？

Burpなどで連続でリクエストを大量に送ることをうっかりしてしまうと、DoS判定されるかもしれない。
[岡崎市立中央図書館事件 - wikipedia](https://ja.wikipedia.org/wiki/%E5%B2%A1%E5%B4%8E%E5%B8%82%E7%AB%8B%E4%B8%AD%E5%A4%AE%E5%9B%B3%E6%9B%B8%E9%A4%A8%E4%BA%8B%E4%BB%B6) 通称Librahack事件なども考慮して、リクエストとリクエストの間には時間を空ける、リクエスト数も大量に送らない、ということに気をつけた方がいい。

CTFの問題の文脈でも、数万リクエスト送ることが想定解になることはほとんどないので、原理上大量のリクエストを発行したら解けるとしても別の想定解を疑った方がいいことが多い。

publicなAPIの一日の制限数などをみるとどこまで許されるのか参考にできるかもしれない。ただサービスごとに許容範囲は異なっていそう。

### IPAが出している「安全なウェブサイトの作り方」はいいぞ

[IPA - 安全なウェブサイトの作り方](https://www.ipa.go.jp/security/vuln/websecurity.html) に、届出の多かった脆弱性をもとにウェブサイトの開発者や運営者向けのセキュリティの資料が出ています。

CSRFってなんだろう、ということをつまみ食いで調べてみるとかでも十分役立つし、チェックリストもあるので良さそう。

[Flatt Securityからもおすすめする記事が出ています](https://blog.flatt.tech/entry/anzenna_website_no_tsukurikata)

### CakeCTF2022楽しみですね

[CakeCTF2022](https://ctftime.org/event/1683/) が9/3あたりにあるそうです。
[CakeCTF2021の問題リポジトリ](https://github.com/theoremoon/cakectf-2021-public) は公開されているので復習して本番に備えたいですね。

### ICCのAttack&Defenseのソースコードが公開

[ICC2022 A/D Services](https://github.com/CybersecNatLab/ICC2022-AD-CTF)
CTFのAttack&Defense形式のソースコードが公開されるのは珍しいと感じました。
動かせるか試したいところです

### Macでは5000番ポートが使われている

[MacをMontereyにアップデートしたらFlaskが5000番ポートで起動できなくなった](https://www.keisuke69.net/entry/2021/10/29/012608)
AirPlayのレシーバーが5000番を占有しているため。

### 標準SQLというのがある

[標準SQLとは](http://www.sql-post.biz/2019/05/02/%E6%A8%99%E6%BA%96sql/)
SQLも標準があるらしいが、強制力がないので標準だけ知っていればOKというわけでもなく、個別のSQL文法を学ぶ必要がある。

### Shadow DOM closedはセキュリティ用途ではない

[Shadow DOM の open/closed](https://developer.mozilla.org/ja/docs/Web/Web_Components/Using_shadow_DOM) はセキュリティ用途では使えない。
