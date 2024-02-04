---
layout: book
title: 詳解セキュリティコンテスト輪読会資料#13
description: 輪読会13回の資料
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-09-24T18:50:36+09:00
  - summary: TODO多いけど一通り埋めた
    date: 2022-10-01T16:55:09+09:00
  - summary: 修正
    date: 2022-10-16T15:02:50+09:00
---

# 詳解セキュリティコンテスト輪読会資料#13

範囲: p.281 - p.294

## パディングオラクル攻撃がなぜうまくいくのかわからない

Youtube: [【koba789】復号が成功したか失敗したかだけで暗号文を改ざん、復号する【kurenaif】](https://youtu.be/RlcyBBLVnDo) をみた。
3hあるので概要書く

- AES-256-CBCで、暗号文を送ると復号してエラー2種類もしくはエラーでないの合計3種類の値が返される。ここから与えられた暗号文の復号ができるか？という問い
- PKCS#7パディングの性質から、末尾が `0x01` の時に本来のパディングを無視して末尾の `0x01` だけをパディングとして解釈する [-> 動画リンク](https://youtu.be/RlcyBBLVnDo?t=1332)
- あとは解説&実装という感じで実装メイン
- [kurenaif/padding_oracle_training](https://github.com/kurenaif/padding_oracle_training) を見て解いてみると良さそう。
- TODO: padding oracle trainingやってみた

blog: [Padding Oracle Attack 分かりやすく解説したい](https://partender810.hatenablog.com/entry/2021/06/08/225105) も読んでみる
概要

- (TODO)

## S-DESで学ぶLinear Cryptanalysis / Differencial Cryptanalysis

(TODO: S-DESやAESの構造を知らないとできないので)

## 素数判定

[素数判定](https://ja.wikipedia.org/wiki/%E7%B4%A0%E6%95%B0%E5%88%A4%E5%AE%9A)はRSA暗号で生成した数が素数であることを判定する時に有用。

- 決定的素数判定法
  - 試し割り、AKS素数判定法など
- 確率的素数判定法
  - フェルマーテスト、ミラーラビン素数判定法など

## Shorのアルゴリズム

(TODO: 量子コンピュータを学んでから)
