---
layout: algorithm
title: BFS
description: BFS(幅優先探索)とは、グラフ探索アルゴリズムの一つで、探索開始地点に近い距離の頂点から順にQueueに詰めて訪問していくアルゴリズムである。
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-05-01T05:49:59+09:00
  - summary: グリッド金のwriteup追加
    date: 2022-05-02T14:50:02+09:00
---

# BFS

## 概要

BFS(幅優先探索)とは、グラフ探索アルゴリズムの一つで、探索開始地点に近い距離の頂点から順にQueueに詰めて訪問していくアルゴリズムである。

## 詳細

疑似コードを以下に示す。

```clike
# Type Notation
Vertex
Edge
Graph = (Vertex, Edge)
Queue
```

```clike
BFS(g: Graph, source: Vertex):
  Initialize queue: Queue # 次に訪問する頂点を決定するキュー。sourceのみ入れておく。
  while queue is not empty:
    v: Vertex = dequeue from queue # 最初の要素をvに詰める
    for v' in connected with g[v]:
      if v' is not visited:
        # 新規に訪問する頂点に対し処理を行う
        enqueue v' to queue # queueに新規に訪問する頂点を詰める
```

計算量は $O(\vert V \vert + \vert E \vert)$ である。
なぜなら、各頂点はキューに高々一度enqueue/dequeueされるので $O(\vert V \vert)$, 各辺は一度だけ探索されるので $O(\vert E \vert)$ となるからである。

## メモ

DFS(深さ優先探索)とセットで語られることが多い。両者の違いは [文献1](#ref-1) の 1-5. DFS と BFS との比較 が詳しい。

## 関連する問題

- 第三回 アルゴリズム実技検定 G - グリッド金移動: [問題](https://atcoder.jp/contests/past202005-open/tasks/past202005_g) / [writeup](https://math.docs.uta8a.net/writeup/grid-gold/)

## 参考文献

- 文献1: <a name="ref-1"></a> drken, BFS (幅優先探索) 超入門！ 〜 キューを鮮やかに使いこなす 〜, qiita
  - 1-2. BFS の実装 を参考に疑似コードを書いた
  - 1-4. BFS の計算量 を参考に計算量を導出した

## 関連項目

- 01-bfs
- dfs

## 外部リンク

- 文献1: [drken, BFS (幅優先探索) 超入門！ 〜 キューを鮮やかに使いこなす 〜, qiita](https://qiita.com/drken/items/996d80bcae64649a6580)

### TODO

- アルゴリズムイントロダクションを読んでおく
  - 探索が全て網羅することの証明を追加できるかも