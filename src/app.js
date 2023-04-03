const express = require('express')
const app = express()
const taskRoute = require('./routes/tasks')
const connectDB = require('./mongoose-connect')
const port = 8080
const url = 'mongodb://test:pass@mongo:27017/' // DB接続URL

// json形式を利用することを明示する
app.use(express.json())
/**
 * ルーティング設計
 * 第一引数にエンドポイントの共通部分を指定
 * 第２引数にルーターファイルを指定
 */
app.use("/api/v1/tasks", taskRoute)

/**
 * DB接続用の関数
 */
const start = async (url) => {
  try {
    await connectDB(url)

  } catch (error) {
    console.log(error)
  }
}

// データベースと接続開始
start(url)

//8080番ポートでサーバーを待ちの状態にする。サーバー起動ログを出力する
app.listen(port, () => console.log(`サーバー起動中 ポート番号：${port}`))