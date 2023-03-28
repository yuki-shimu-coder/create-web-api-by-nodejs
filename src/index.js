// 参考にさせていただきました:https://reffect.co.jp/node-js/first-time-express-js
const dayjs = require('dayjs');

console.log('Hello nodemon');
console.log(dayjs(new Date()).format('YYYY年M月D日'));


const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => res.send('Hello World!'))

//8080番ポートでサーバーを待ちの状態にする。
//またサーバーが起動したことがわかるようにログを出力する
app.listen(port, () => console.log(`サーバー起動中 ポート番号：${port}`))