/**
 * APIサーバー起動練習用ファイル
 */

// 参考にさせていただきました:https://reffect.co.jp/node-js/first-time-express-js
const dayjs = require('dayjs')

console.log('Hello nodemon')
console.log(dayjs(new Date()).format('YYYY年M月D日'))


const express = require('express')
const app = express()
const port = 8080

// json形式を利用することを明示する
app.use(express.json())

// 検証用疑似データを用意
const customers = [
  { title: "小林", id: 1 },
  { title: "田中", id: 2 },
  { title: "鈴木", id: 3 },
  { title: "佐々木", id: 4 },
  { title: "金井", id: 5 },
]

// get
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/api/customers', (req, res) => res.send(customers))


// post
app.post('/api/customers', (req, res) => {
  const customer = {
    title: req.body.title,
    id: customers.length + 1
  }
  customers.push(customer);
  res.send(customer);
})

// putメソッド　お客様情報の更新
app.put('/api/customers/:id', (req, res) => {
  console.log('更新処理開始');
  const customer = customers.find((c) => {
    // req.params.idは:idを指す。文字列型で渡ってくるので、int型にパースしている。
    return c.id === parseInt(req.params.id)
  })
  // 任意のidで取得したcustomerのtitleを変更する
  customer.title = req.body.title
  res.send(customer)
  console.log('更新処理終了');
})

// deleteメソッド　お客様情報の削除
app.delete('/api/customers/:id', (req, res) => {
  console.log('削除処理開始');
  const customer = customers.find((c) => {
    // req.params.idは:idを指す。文字列型で渡ってくるので、int型にパースしている。
    return c.id === parseInt(req.params.id)
  })

  const index = customers.indexOf(customer)
  console.log(index);

  customers.splice(index, 1)
  res.send(customer)
  console.log('削除処理終了');
})

//8080番ポートでサーバーを待ちの状態にする。
//またサーバーが起動したことがわかるようにログを出力する
app.listen(port, () => console.log(`サーバー起動中 ポート番号：${port}`))