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

## 好きな問題: TSGCTF2019 OMEGA の解説と中国剰余定理

僕は当時解けませんでした。
[問題repository](https://github.com/tsg-ut/tsgctf/tree/master/crypto/omega)

`problem.rb`

```ruby
require_relative 'params'

def to_complex(x)
  a, b = x
  w = Math::E ** Complex(0, Math::PI*2.0/3.0)
  a + b*w
end

def sub(x, y)
  a, b = x
  c, d = y
  [a-c, b-d]
end

def mul(x, y)
  a, b = x
  c, d = y
  [a*c - b*d, a*d + b*c - b*d]
end

def div(x, y)
  xc, yc = to_complex(x), to_complex(y)
  a, b = (xc / yc).rect
  [(a + b/Math.sqrt(3)).round, (b*2.0/Math.sqrt(3)).round]
end

def mod(x, y)
  # many times...
  100.times do
    k = div(x, y)
    x = sub(x, mul(k, y))
  end
  x
end

def norm(x)
  a, b = x
  a*a + b*b - a*b
end

flag = "TSGCTF{XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}"
msg  = [flag[0,flag.size/2], flag[flag.size/2,flag.size]].map {|text| text.unpack("H*")[0].hex}
modulos = MODULOS

res = modulos.map do |m|
  [mod(msg, m), m]
end

puts 'MODULOS = %p' % [modulos]
puts 'PROBLEM = %p' % [res]
```

`params.rb`

```ruby
MODULOS = [[404287, 873970], [636327, 576420], [338156, 891120], [492879, 529526], [713147, 662709], [993025, 655962], [175379, 419045], [563351, 899507], [542103, 840562], [166864, 951865], [838219, 258645], [480223, 854215], [501143, 184397], [772065, 140479], [236644, 810087], [161194, 189147], [16555, 527922], [310980, 636755], [253315, 757357], [766680, 848857]]
PROBLEM = [[[27524, 160977], [404287, 873970]], [[325486, 117503], [636327, 576420]], [[-299791, -375867], [338156, 891120]], [[-129656, -190359], [492879, 529526]], [[203809, -36629], [713147, 662709]], [[-774345, -129438], [993025, 655962]], [[-34825, 113838], [175379, 419045]], [[36654, 244380], [563351, 899507]], [[242760, -28048], [542103, 840562]], [[104230, 294180], [166864, 951865]], [[49817, -208346], [838219, 258645]], [[14923, 288894], [480223, 854215]], [[100017, 96567], [501143, 184397]], [[172757, 22647], [772065, 140479]], [[74229, 261518], [236644, 810087]], [[-27715, -76038], [161194, 189147]], [[116245, -82633], [16555, 527922]], [[368302, 365778], [310980, 636755]], [[43295, -101755], [253315, 757357]], [[238152, 235140], [766680, 848857]]]
```

**問題を紹介したい理由**: 中国剰余定理は、詳解セキュリティコンテストでは「整数とその剰余」に関するものとして紹介されていた。実際は一般に(単位元を持つ)環とそのイデアルに拡張できる。TSGCTF2019 OMEGAはその環としてアイゼンシュタイン整数環を用いていて、中国剰余定理の数学的背景を知る上で面白いかなと思って持ってきました。

**問題概要**: 
$x = a+b\cdot \omega$, ただし$a,b\in\mathbb{Z}, \omega = e^{i\cdot \frac{2}{3}\pi}$ なる $x$ を扱う。引き算(sub)、掛け算(mul)、割り算(div)と、絶対値(norm)が与えられている。MODULOSという複数の値に対してmod演算として定義されている関数があり、このmod関数の出力から元のmsgを復元することが目標になる。

**解法**: このような $x$ を集めたものはアイゼンシュタイン整数環になる。この環での演算が四則演算に対応している。足し算を書く(add)
続いて、(TODO)

> TODO: mod演算が妥当なことを示し、道具として使う関数たちの妥当性確認してからCRTに持ち込む

参考リンク

- [中国剰余定理 定理の一般化 wikipedia](https://ja.wikipedia.org/wiki/%E4%B8%AD%E5%9B%BD%E3%81%AE%E5%89%B0%E4%BD%99%E5%AE%9A%E7%90%86#.E5.AE.9A.E7.90.86.E3.81.AE.E4.B8.80.E8.88.AC.E5.8C.96)
- [アイゼンシュタイン整数 wikipedia](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%82%A4%E3%82%BC%E3%83%B3%E3%82%B7%E3%83%A5%E3%82%BF%E3%82%A4%E3%83%B3%E6%95%B4%E6%95%B0)

## 離散対数問題に対するアプローチ

TODO: BSGS, pollard-pho
