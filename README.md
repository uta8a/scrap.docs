# scrap.docs.uta8a.net

雑多で一時的なメモをpublish

```
pnpm run dev
```

# 記事を書くフロー

- [workflow dispatch > Add docs](https://github.com/uta8a/scrap.docs/actions/workflows/generate.yaml) から `title` と `description` を入力してRun workflowを押す
- devServerを手元で立ち上げる `pnpm run dev`
- ページへ行って右上の `Edit this page` を押す
- VS Codeへのリンクを開き、記事を書く
- publish前にmdxのdescriptionをチェックする

基本的に日毎に書いて、切り出せそうならその部分を切り出してmdxのリンクを日毎ページに貼っておく運用をする。

## メモ

- image pathは `../../../assets/img/` から始めるようにして、画像は全記事通して `<number>.ext` の形で管理
  - 配置は `src/assets/img/`
