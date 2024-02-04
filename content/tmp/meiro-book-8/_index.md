---
layout: misc
title: 第8回詳解セキュリティコンテスト輪読会の記録
description: 輪読会の記録。
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-08-09T09:54:31+09:00
  - summary: 完成
    date: 2022-08-09T10:12:01+09:00
---

# 第8回詳解セキュリティコンテスト輪読会の記録

今回は p.189 - p.203 が範囲。内容はSSTI。dockerでスッと環境が立ち上がるのであまり詰まりポイントや疑問ポイントがなかった。

## 10章

## MRO Method Resolution Order

Pythonのメソッド呼び出しは親を探しに行く。解決の仕方は C3線型化というアルゴリズムが使われている。 [参考: 論文から学ぶC3 Linearization](https://zenn.dev/shinsa82/articles/c3-linearization)

## hitchhike

p.197の `python3 globals-example.py` の結果を見るとファイル名も入っていることが分かる( `codes/SSTI/globals-example.py` の部分)

この挙動を一部題材とした問題がSECCON ctf4b 2022で出題されている [参考: `ctf4b_2022_satoki_writeups`](https://github.com/satoki/ctf4b_2022_satoki_writeups/tree/master/misc/hitchhike4b)

今回の挙動とは関係ないが、PythonのPAGER関連でhitchhike4bの元ネタになったhitchhikeという問題がSECCON CTF 2021で出題されている [参考: hitchhike](https://ptr-yudai.hatenablog.com/entry/2021/12/19/232158#Misc-227pts-hitchhike)

## 参考になりそう

[CTFのWebセキュリティにおけるSSTIまとめ](https://blog.hamayanhamayan.com/entry/2021/12/15/225142) はまやんさんいつもありがとうございますという気持ちに

特に話題になった点

- flaskでconfigに環境変数を仕込んでgolfができる [参考: SSTI golf](https://nanimokangaeteinai.hateblo.jp/entry/2022/07/21/200947#Web-100-SSTI-Golf-223-solves)
  - `config.update(key = value)` でconfig にデータを永続化できる
- 最近はGoが多い気がする？
- Client-Side Template Injectionの話
  - どうやってエスケープしたらいいのだろう？実務ではフレームワークを使うので[DOMPurify](https://github.com/cure53/DOMPurify)みたいなのを使ってXSS対策をする機会はまず訪れない。
  - `_dangerouslysetinnerhtml` がReactでは有名。zennのCLIもこれ使ってMarkdownの内容を出力していたはずなので、[Zennで見つけたXSSとmarkdown-it](https://zenn.dev/ooooooo_q/articles/zenn_and_markdown_it) が刺さったのかな？(本番環境で dangerously... を使っているかは不明)
- flaskってエスケープどうやるの
  - `render_template` も `render_template_string` もXSS対策のエスケープをデフォルトで行うが、 `{{ }}` に関しては何もしないので普通にレンダリングされてしまう。これをやめたい時はどうすれば...？(分からなかったので未解決)
  
## curlのオプション

なんと `vvv` オプションがある [参考: StackOverflow](https://stackoverflow.com/questions/24402473/what-is-meaning-of-vvv-option-in-curl-request)