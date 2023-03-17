# create-web-api-by-nodejs

node.jsでwebAPIを作ってみる

## はじめに
以下のツールを事前にインストールしてください。

- Docker


## ディレクトリ構成
- data/db
  MongoDBのデータが消えないように保存しておくディレクトリ  
-src
  公開ディレクトリ
- .env
  DBのユーザー情報等を記述するファイル

## 開発の手順

サンプル：laravel-projectディレクトリ内で、.envファイルを作成してください

```
  サンプル：cp .env.example .env  
```



## 注意事項
コンテナへのアクセス

```
docker compose exec app /bin/sh
```

コンテナの起動で network app-network declared as external, but could not be found が表示されたら以下コマンドで、docker networkを作成しておく

```
docker network create app-network
```