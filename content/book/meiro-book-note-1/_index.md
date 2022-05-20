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
  - summary: 第一回は4章終わりまでなので分割
    date: 2022-05-20T16:01:00+09:00
---

# 詳解セキュリティコンテスト輪読会資料#1

## 概要

### 1章

**一言まとめ**: CTFとはなに？概要説明

### 2章

**一言まとめ**: 環境構築できましたか？環境構築できていたらOK(おそらく環境構築自体はisolatedであればいいはず。VMwareでやった)

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

## メモ

- CTFホスティングしてみたい。軽く雑にやるならCTFdなのかな？
- [SECCON Beginners 2022](https://www.seccon.jp/2022/seccon_beginners/content.html) 2022/6/4(土)14:00JST～2022/6/5(日)14:00JST がありますね！
- CTFプレイヤーと法律のパートは大事なので取り上げておきたい。参考になるリンク探しておきたいな
  - [Web開発者はもっと「安全なウェブサイトの作り方」を読むべき](https://blog.flatt.tech/entry/anzenna_website_no_tsukurikata#%E8%A8%BA%E6%96%AD%E8%A1%8C%E7%82%BA%E3%82%92%E8%A1%8C%E3%81%86%E3%81%A8%E3%81%8D%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9) 結局他人のサービスに攻撃と判断される行為を働かないということが大事。
  - [不正アクセス禁止法改正Q&A (pdf)](https://www.npa.go.jp/cyber/legislation/pdf/6_QA.pdf) これまだ分かりやすい方
  - [サイバーセキュリティ研究におけるグレーゾーン](https://www.iwsec.org/mws/2018/20181024/1_css2018-hojo.pdf) これの脆弱性発見・無断公開のパートは日本でもそうなので言及しておきたい。
  - まとめると、何をやってはいけないのか？は明確にできる。これはセーフという行為は分からない。
    - アウト1: 他人のサービスへの攻撃
    - アウト2: (ものによっては)インターネット接続下での実験 → とじられたネットワーク環境で行うべき実験がある。パケットキャプチャは自身の管理するネットワーク外でオープンに行ってはいけないとか。
    - アウト3: マルウェアの所持 → 所持や作成で捕まるので気をつけて。個人的には権威ある機関の元でやると安心派です(教授の元で、とか) ハニーポットはどうなんでしょうか？
    - アウト4: 知識の公開 → これ注意。現存する脆弱性についてブログに書くとアウト。Wizard Bible事件の影響で、本来アウトではない情報でも広く人の目に触れる形での知識共有は危ないという認識になっている気がする。CTFのWriteupが数年前削除されまくった話とか。現在はwriteup書くことが復活してきた雰囲気もあるけど、お気持ち領域なので慎重に、という意見です。(特にReal World関連の知識)