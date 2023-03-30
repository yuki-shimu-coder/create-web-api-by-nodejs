const express = require('express')
const app = express()
const taskRoute = require('./routes/tasks')
const port = 8080


/**
 * ルーティング設計
 * 第一引数にエンドポイントの共通部分を指定
 * 第２引数にルーターファイルを指定
 */
app.use("/api/v1/tasks", taskRoute)

//8080番ポートでサーバーを待ちの状態にする。サーバー起動ログを出力する
app.listen(port, () => console.log(`サーバー起動中 ポート番号：${port}`))