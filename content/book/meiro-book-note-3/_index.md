---
layout: book
title: 詳解セキュリティコンテスト輪読会資料#3
description: 輪読会第3回の資料
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-05-29T05:56:53+09:00
---

# 詳解セキュリティコンテスト輪読会資料#3

## 概要

### 6章

**一言まとめ**: Webサーバ、Burp、データベース、CORSなどのブラウザセキュリティ

#### 確認事項

手を動かすポイント(ここでやった人いるか & 詰まった人いるか確認)

- [ ] p.86 コード6-17 nginx (>省略)
- [ ] p.88 コード6-18 webapp (>やった)
- [ ] p.93-96 Burp Intercept/Repeater (>やった [video link 1](https://drive.google.com/file/d/1NQvetUmg3WxDFRAVBro6ZTRbi2y6INFL/view?usp=sharing) / [video link 2](https://drive.google.com/file/d/1dkgJUOvK7n3PfpfBgZ4Xoj4A4t9g8heL/view?usp=sharing))
  - Burpの導入は、Vagrantfileを見るとターミナルからできる。 [該当箇所](https://github.com/ctfbook/2nd/blob/c364a010b936eb428c70e91b656965a9b2e95bec/dist/Vagrantfile#L73-L79)
- [ ] p.97-101 Burp Intruder(>やった)
- [ ] p.103-113 SQLの実習パート(>半分くらいやった)

#### 話題

- p.88 コード6-18のwebappが動かないので動くようにした
  - これは割と些末な話なのでskipしていいかも
- p.90 Burp: [WebSecurity Academy](https://portswigger.net/web-security) がいい学習リソースだよという紹介
- p.102 decoder: 単なるencode/decodeは [CyberChef](https://gchq.github.io/CyberChef/) も便利。送信もセットで楽に行える点でBurpに強みがある。
- p.113 Webブラウザセキュリティ: [Webブラウザセキュリティ ― Webアプリケーションの安全性を支える仕組みを整理する](https://www.lambdanote.com/products/wbs) が参考になりそう。
- p.113 Webブラウザセキュリティ: ちょっと外れる話題だけど、Shadow DOM Closedとchrome extensionの話題と、prototype pollutionによりclosedは回避できるのでDOMにセキュアな情報は置いてはいけないという話

## メモ

