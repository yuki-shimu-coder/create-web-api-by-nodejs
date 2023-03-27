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

- mongo -u test
  ユーザーIDとパスワードを指定してMongoDBに接続する
  ユーザー名とパスワード名は.envを参照してください。

- MongoDBにパスワードを設定する方法
  https://blog.bagooon.com/?p=1670

<!-- これ不要な気がする、なぜなら上記コマンドで接続と認証が住んでいると思われるから -->
<!-- - ユーザー認証
  db.auth("admin","password");
  mongoコマンドを上記の通り実行したあと、mongoシェルの中で認証を行う。 -->

- exampleテーブルの操作可能ユーザー
  - user: user1
  - pwd: password

## 開発の手順

### .envファイルを作成
サンプル：laravel-projectディレクトリ内で、.envファイルを作成してください

```
  サンプル：cp .env.example .env  
```

### mongoDBにテストデータを用意する

#### mongoDBのコンテナにアクセスする

```
docker compose exec mongo bash
```

#### mongoDBコンテナで、ターミナルからユーザーID/パスワードを指定してMongoDBに接続する

```
mongo -u test
```

- [Enter password: ]とターミナルに表示されるので、pass を入力してEnter
  - .envファイルの[MONGO_INITDB_ROOT_PASSWORD]の値を入力する

- 接続に成功した場合以下のようなメッセージがターミナルに表示される
connecting to: mongodb://127.0.0.1:27017/ ....
Implicit session: session { "id" : UUID("....") }
MongoDB server version: 4.2.5


#### DBを作成する
- use example;
存在しないDBを指定するとDBが作成される。ここではexampleというデータベースを作成している。

- db と入力すると、現在利用しているDBが表示される。

- show dbs と入力すると、DB一覧が表示される。

<!-- #### データベース「example」を操作するユーザーを追加する。 不要？ -->

#### テスト用のコレクションを追加する

```
db.createCollection('persons');
```

#### テスト用のデータ（ドキュメント）を追加する

```
db.persons.insert({"name": "hanako", "age": 12});
```

#### nodejsのコンテナにアクセスする

```
docker compose exec app bash
```

#### nodejsコンテナ内でターミナルより connect.js を実行する

```
node connect.js 
```

実行に成功した場合、以下コメントが表示される。接続が確認できたら環境構築完了。

```
Connected successfully to server
Found documents => [
  {
    _id: new ObjectId("641493575f5d1e8d2ad780bd"),
    name: 'hanako',
    age: 12
  }
]
done.
```

#### 参考サイト様

- https://www.usagi1975.com/202005161352/

- Docker公式MongoDBにパスワードを設定する方法
  - https://blog.bagooon.com/?p=1670

- MongoDB ユーザー認証設定は必ずしましょう
  - https://qiita.com/h6591/items/68a1ec445391be451d0d

- 接続文字列の URI 形式
  - https://www.mongodb.com/docs/drivers/

- MongoDB NodeJS ドライバー
  - https://www.npmjs.com/package/mongodb  npm公式
  - https://kennejs.com/entry/nodejs-mongodb  MongoDB Node.JS Driverの紹介記事

- MongoDBデータ操作
  - https://www.wakuwakubank.com/posts/784-server-mongodb-introduction/#index_id13

## 注意事項

### docker-composeで「network undefined」が表示される場合

コンテナの起動で network app-network declared as external, but could not be found が表示されたら以下コマンドで、docker networkを作成しておく

```
docker network create app-network
```