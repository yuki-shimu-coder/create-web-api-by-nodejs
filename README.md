# create-web-api-by-nodejs

node.jsでwebAPIを作ってみる

## はじめに
以下のツールを事前にインストールしてください。

- Docker


## ディレクトリ構成

- docker
このディレクトリ以下にそれぞれのコンテナについて定義を記述しています。
  - db
    MongoDBコンテナについて定義
  - node
    node.jsコンテナについて定義

- .env
  DBのユーザー情報等を記述するファイル
- db-data
  MongoDBのデータが消えないように保存しておくディレクトリ  
- /www/htlm/app
  公開ディレクトリ



