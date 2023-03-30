# create-web-api-by-nodejs

node.js で webAPI を作ってみる

## はじめに

以下のツールを事前にインストールしてください。

- Docker

## ディレクトリ構成

- data/db
  MongoDB のデータが消えないように保存しておくディレクトリ  
- src 公開ディレクトリ
  - routes ルーターファイルを配置するディレクトリ
- .env
  DB のユーザー情報等を記述するファイル


<!-- これ不要な気がする、なぜなら上記コマンドで接続と認証が住んでいると思われるから -->
<!-- - ユーザー認証
  db.auth("admin","password");
  mongoコマンドを上記の通り実行したあと、mongoシェルの中で認証を行う。 -->
<!-- 
- example テーブルの操作可能ユーザー
  - user: user1
  - pwd: password -->

## 開発の手順

### .env ファイルを作成

サンプル：laravel-project ディレクトリ内で、.env ファイルを作成してください

```
  サンプル：cp .env.example .env
```

### 必要なパッケージのインストール

```
docker compose up -d
docker exec -it -u 0 container1 bash
npm install
```

- sudo できない Docker コンテナを、root でシェル操作するには
  - docker exec -it -u 0 <コンテナ名>
  - ２回目以降、npm の操作が可能
  - https://qiita.com/tabimoba/items/c5467432d1a635f9ce5b

### mongoDB にテストデータを用意する

#### mongoDB のコンテナにアクセスする

```
docker compose exec mongo bash
```

#### mongoDB コンテナで、ターミナルからユーザー ID/パスワードを指定して MongoDB に接続する

```
mongo -u test
```

- [Enter password: ]とターミナルに表示されるので、pass を入力して Enter

  - .env ファイルの[MONGO_INITDB_ROOT_PASSWORD]の値を入力する

- 接続に成功した場合以下のようなメッセージがターミナルに表示される
  connecting to: mongodb://127.0.0.1:27017/ ....
  Implicit session: session { "id" : UUID("....") }
  MongoDB server version: 4.2.5

#### DB を作成する

- use example;
  存在しない DB を指定すると DB が作成される。ここでは example というデータベースを作成している。

- db と入力すると、現在利用している DB が表示される。

- show dbs と入力すると、DB 一覧が表示される。

<!-- #### データベース「example」を操作するユーザーを追加する。 不要？ -->

#### テスト用のコレクションを追加する

```
db.createCollection('persons');
```

#### テスト用のデータ（ドキュメント）を追加する

```
db.persons.insert({"name": "hanako", "age": 12});
```

#### nodejs のコンテナにアクセスする

```
docker compose exec app bash
```

#### nodejs コンテナ内でターミナルより connect.js を実行する

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

- 環境構築の大枠を参考にさせていただきました
  - https://www.usagi1975.com/202005161352/

- Docker 公式 MongoDB にパスワードを設定する方法

  - https://blog.bagooon.com/?p=1670

- MongoDB ユーザー認証設定は必ずしましょう

  - https://qiita.com/h6591/items/68a1ec445391be451d0d

- 接続文字列の URI 形式

  - https://www.mongodb.com/docs/drivers/

- MongoDB NodeJS ドライバー

  - https://www.npmjs.com/package/mongodb npm 公式
  - https://kennejs.com/entry/nodejs-mongodb MongoDB Node.JS Driver の紹介記事

- MongoDB データ操作
  - https://www.wakuwakubank.com/posts/784-server-mongodb-introduction/#index_id13

### Web サーバーの起動方法

#### nodejs のコンテナにアクセスする

```
docker compose exec app bash
```

#### nodejs コンテナ内でターミナルより index.js を実行する(package.json の scripts > dev を参照)

```
npm run dev
```

## 注意事項

### docker-compose で「network undefined」が表示される場合

コンテナの起動で network app-network declared as external, but could not be found が表示されたら以下コマンドで、docker network を作成しておく

```
docker network create app-network
```
