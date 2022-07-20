---
layout: misc
title: 第5回詳解セキュリティコンテスト輪読会のメモ
description: 輪読会の記録。僕は休んだのでメモだけ書きます
draft: false
changelog:
  - summary: 見出し作成
    date: 2022-07-21T06:44:15+09:00
  - summary: 記事完成
    date: 2022-07-21T07:03:07+09:00
---

# 第5回詳解セキュリティコンテスト輪読会のメモ

p.141 - p.155が範囲。内容としてはXSSのCSPパート

僕は休んだので他の人が撮ってくれたメモを書いてます。

## 現実のwebサービスにはどの程度CSPが設定されている？

GitHub

```text
default-src 'none'; base-uri 'self'; block-all-mixed-content; child-src github.com/assets-cdn/worker/ gist.github.com/assets-cdn/worker/; connect-src 'self' uploads.github.com objects-origin.githubusercontent.com www.githubstatus.com collector.github.com raw.githubusercontent.com api.github.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com cdn.optimizely.com logx.optimizely.com/v1/events *.actions.githubusercontent.com wss://*.actions.githubusercontent.com online.visualstudio.com/api/v1/locations github-production-repository-image-32fea6.s3.amazonaws.com github-production-release-asset-2e65be.s3.amazonaws.com insights.github.com wss://alive.github.com; font-src github.githubassets.com; form-action 'self' github.com gist.github.com objects-origin.githubusercontent.com; frame-ancestors 'none'; frame-src render.githubusercontent.com viewscreen.githubusercontent.com notebooks.githubusercontent.com; img-src 'self' data: github.githubassets.com identicons.github.com github-cloud.s3.amazonaws.com secured-user-images.githubusercontent.com/ github-production-user-asset-6210df.s3.amazonaws.com *.githubusercontent.com; manifest-src 'self'; media-src github.com user-images.githubusercontent.com/; script-src github.githubassets.com; style-src 'unsafe-inline' github.githubassets.com; worker-src github.com/assets-cdn/worker/ gist.github.com/assets-cdn/worker/
```

QiitaにはCSP見当たらない

## strict-dynamic

innerHTMLを操作するのは良いが、内容によってはだめ

## Script Gadget

[CSP(コンテンツセキュリティポリシー)について調べてみた](https://techblog.securesky-tech.com/entry/2020/05/21/)

CTFのpwnのガジェットと似ている

## DOM Clobbering

類題 [ctf4b 2020 Somen](https://tikicn.hatenablog.com/entry/2020/05/24/140117)
