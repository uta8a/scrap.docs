---
layout: writeup
title: G - グリッド金移動 - 第3回アルゴリズム実技検定
description: BFSを用いる問題。ボードの広さが無限なので迂回が可能であることに注意。 
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-05-02T14:30:23+09:00
---

# G - グリッド金移動 - 第3回アルゴリズム実技検定

## 概要

BFSを用いる問題。ボードの広さが無限なので迂回が可能であることに注意。 

## 詳細

### 問題概要

[問題リンク - AtCoder](https://atcoder.jp/contests/past202005-open/tasks/past202005_g)

無限に広がる二次元平面上を、将棋の金の動きで移動する。障害物のあるマスには移動できない。ゴール $(X,Y)$ に到達する最小の移動回数を求めよ。

### 解法

BFSを用いる。 $X,Y$ の存在する範囲が $400 \times 400$ だが、この範囲の外を迂回することができるので $X,Y$ の正と負の方向、4方向に余分な空間をとっておく必要がある。

### 実装

まず座標が負になりうるので配列のインデックスに使いづらいので余分込みで `+202` する。
キューの初期化は `VecDeque<(usize, usize)>` で行い、最初の地点を入れる。
金の動きをした先の座標に対し行うcheckは盤面の外に出ていないか、と未訪問であるか、の2点。

Rustでの実装 [提出リンク](https://atcoder.jp/contests/past202005-open/submissions/31393071)

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

use std::collections::VecDeque;

fn main() {
    input! {
      n: usize,
      x: i64,
      y: i64,
      xy: [[i64;2];n]
    }
    let mut board = vec![vec![-1; 405]; 405];
    for exy in xy {
        let ex = (exy[0] + 202) as usize; // 2 - 402 (401個)
        let ey = (exy[1] + 202) as usize; // 2 - 402
        board[ex][ey] = 0;
    }
    // board[ex][ey] == 0 -> 障害物あり
    // board[ex][ey] == -1 -> 未訪問
    let gx = (x + 202) as usize;
    let gy = (y + 202) as usize;
    let mut q: VecDeque<(usize, usize)> = VecDeque::new();
    q.push_back((202, 202));
    board[202][202] = 0;
    while !q.is_empty() {
        match q.pop_front() {
            Some((x, y)) => {
                if (x, y) == (gx, gy) {
                    println!("{}", board[gx][gy]);
                    return;
                }
                for &(dx, dy) in &[(1, 1), (0, 1), (-1, 1), (1, 0), (-1, 0), (0, -1)] {
                    let nx = x as i32 + dx;
                    let ny = y as i32 + dy;
                    if nx < 0 || 404 < nx || ny < 0 || 404 < ny {
                        continue;
                    }
                    if board[nx as usize][ny as usize] == -1 {
                        board[nx as usize][ny as usize] = board[x][y] + 1;
                        q.push_back((nx as usize, ny as usize));
                    }
                }
            }
            None => break,
        }
    }
    println!("-1");
}
```

## メモ

- 大回りで外側を迂回する時はスタート地点より下や左側もありうるので、 `+200` だとうまくいかない。また、ゴール付近での大回りもあるので `0-400` より大きい側にも余分に回れるようにしておく必要がある。

## 外部リンク

- [グリッド金移動 [第三回 アルゴリズム実技検定 G] - はまやんはまやんはまやん](https://blog.hamayanhamayan.com/entry/2020/06/06/230814)
  - はまやんさんの解説。外側を大回りするところで詰まっていた時に参考にした
- [RustでBFSする -  Takanori Ishibashi Medium'](https://11takanori.medium.com/rust%E3%81%A7bfs%E3%81%99%E3%82%8B-aefeec6e368a)
  - RustでのBFSのやり方、VecDeque周りを参考にした
