---
layout: book
title: 詳解セキュリティコンテスト輪読会資料#9
description: 輪読会第9回の資料
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-08-14T18:18:33+09:00
  - summary: 完成
    date: 2022-08-14T18:36:11+09:00
---

# 詳解セキュリティコンテスト輪読会資料#9

範囲: p.205 - p.226 Blind XXE手前まで

SSRFはwebアプリの中身から任意の場所へHTTPリクエストが飛ばせるやつ

SSRFの例のdocker-composeは立ち上げに時間が思ったよりもかかった。

内部サーバのRedisへlibcurlがサポートするgopherやfileを利用してファイル取得面白い

# 問題

SECCONの出題歴を調べた

Milk, Milk Revenge hakatashiさん作(TSGのリーダー) https://tech.kusuwada.com/entry/2020/11/02/061455#section3

SECCON2018のGhostKingdomもSSRFかな？と思ったらちょっと違った

# パーサとSSRF

11.6 終わりにのblackhatのリンク URLパーサーの不備とSSRF https://www.blackhat.com/docs/us-17/thursday/us-17-Tsai-A-New-Era-Of-SSRF-Exploiting-URL-Parser-In-Trending-Programming-Languages.pdf

youtube版もあった https://www.youtube.com/watch?v=R9pJ2YCXoJQ

Youtubeのタイトルが Make SSRF Great Again なの、時代を感じる

もりたこさんによるOrange氏のこの発表を理解するブログもあった https://blog.ssrf.in/post/nodejs-unicode-encoding-and-ssrf/

JSの内部表現がUTF-16なの知らなかった。サロゲートペアで分離されて解釈されると、`..` をpathモジュールでは検知できないがhttpモジュールでは検知されてディレクトリトラバーサルが発火するという仕組み。

# XXE

過去問: TokyoWesterns CTF 2019 j2x2j https://st98.github.io/diary/posts/2019-09-14-tokyowesterns-ctf-5th-2019.html#j2x2j-web-59

あんまりXXE見たことないかも(経験が少ないだけだと思うが)

PHPとXMLなども含めて触れたい

pharとか触れたい
