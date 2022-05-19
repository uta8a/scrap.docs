---
layout: writeup
title: Garbage Bags Optimization - CPCTF 2022
description: ある列を部分和でまとめて全体の個数を $K$ 個以下にする時に、その最大値を最小化する問題。二分探索を用いて解く。
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-05-02T08:59:11+09:00
---

# Garbage Bags Optimization - CPCTF 2022

## 概要

ある列を部分和でまとめて全体の個数を $K$ 個以下にする時に、その最大値を最小化する問題。二分探索を用いて解く。

## 詳細

### 問題概要

$N$ 日分のゴミ袋が必要になった。容量 $S$ のゴミ袋を $K$ 個購入する。ゴミ箱 $1$ から $K$ について、以下のようにゴミを捨てる。

- $i$ 日目( $1 \leq i \leq N$ )に大きさ $A_i$ のゴミを捨てる
- ゴミ箱に溢れかえらないように順にゴミを入れる。この時、溢れるようなら次の番号のゴミ箱を選択する。
- 順に埋めていき、最後にゴミ箱が溢れないとき成功とする。

成功するような $S$ の最小値を求めよ。

制約

- $N \leq 10^5$
- $K \leq N$
- $A_i \leq 10^9$

### 解法

数列 $A$ を $K$ 個以下の区間で区切る、それぞれの区間和の値の最大のものを最小化する問題。最大値の最小化は二分探索なので、二分探索を用いる。
二分探索の範囲は $1$ 以上 $\sum A_i$ 以下なので計算量は $O(\log(\sum A_i))$ 、各イテレーションにおけるチェックはゴミを順に捨てるシミュレーションを行う。シミュレーションは日数分行うので $O(N)$ で、合わせて $O(N\log(\sum A_i))$ の計算量で行える。

### 実装

`check()` と `binsearch()` の二つの関数を実装する。 `check()` はシミュレーション、 `binsearch()` は二分探索。単調性は、ゴミ袋の容量 $S$ が大きいと適する、小さいと適さないことに注意。

Rustでの実装

```rust
macro_rules! input {
    (source = $s:expr, $($r:tt)*) => {
        let mut iter = $s.split_whitespace();
        let mut next = || { iter.next().unwrap() };
        input_inner!{next, $($r)*}
    };
    ($($r:tt)*) => {
        let stdin = std::io::stdin();
        let mut bytes = std::io::Read::bytes(std::io::BufReader::new(stdin.lock()));
        let mut next = move || -> String{
            bytes
                .by_ref()
                .map(|r|r.unwrap() as char)
                .skip_while(|c|c.is_whitespace())
                .take_while(|c|!c.is_whitespace())
                .collect()
        };
        input_inner!{next, $($r)*}
    };
}

macro_rules! input_inner {
    ($next:expr) => {};
    ($next:expr, ) => {};

    ($next:expr, $var:ident : $t:tt $($r:tt)*) => {
        let $var = read_value!($next, $t);
        input_inner!{$next $($r)*}
    };
}

macro_rules! read_value {
    ($next:expr, ( $($t:tt),* )) => {
        ( $(read_value!($next, $t)),* )
    };

    ($next:expr, [ $t:tt ; $len:expr ]) => {
        (0..$len).map(|_| read_value!($next, $t)).collect::<Vec<_>>()
    };

    ($next:expr, chars) => {
        read_value!($next, String).chars().collect::<Vec<char>>()
    };

    ($next:expr, usize1) => {
        read_value!($next, usize) - 1
    };

    ($next:expr, $t:ty) => {
        $next().parse::<$t>().expect("Parse error")
    };
}

fn check(s: i64, a: &[i64], k: usize) -> bool {
    let mut gar = 0;
    let mut cur = 1;
    for ea in a.iter() {
        if *ea > s {
            return false; // ゴミがでかい
        }
        if gar + ea > s {
            gar = *ea;
            cur += 1;
        }else{
          gar += ea;
        }
    }
    if gar <= s && cur <= k {
        return true;
    }
    false
}

fn binsearch(low: i64, high: i64, a: &[i64], k: usize) {
    if high - low <= 1 {
        println!("{}", high); // 大きいほうが適する
        return;
    }
    let mid = low + (high - low) / 2;
    if check(mid, a, k) {
        // midが適する
        binsearch(low, mid, a, k);
    } else {
        binsearch(mid, high, a, k);
    }
}

fn main() {
    input! {
      n: usize,
      k: usize,
      a: [i64; n],
    }
    let high: i64 = a.iter().sum();
    let low = 1;
    binsearch(low, high, &a, k);
}

#[cfg(test)]
mod tests {
    use crate::*;

  #[test]
  fn test_check() {
    let a = vec![3,1,3,2,3];
    let out = check(3, &a, 3);
    assert!(!out);
  }
  #[test]
  fn test_check_ok() {
    let a = vec![3,1,3,2,3];
    let out = check(5, &a, 3);
    assert!(out);
  }
}

```

## メモ

- 競技中に解けなかった。考え方は合っていてPythonによる実装を行っていたので、競技後にRustで実装し直したら通った。二分探索の最大値を大きく取り過ぎていたかも。
- Rustはテストが簡単に書けるので、解き直す時やデバッグ時は関数に分けて単体テストを書くといいかもと感じた。
- `&Vec<i64>` を引数に書いたら `&[i64]` をclippyくんに提案されて天才だなあとなった

## 外部リンク

- [「答えを決め打つ」タイプの二分探索を使いこなそう , ARMERIA hatena blog](https://betrue12.hateblo.jp/entry/2019/05/11/013403)
  - "典型パターン「最大値の最小化」"として紹介されている。