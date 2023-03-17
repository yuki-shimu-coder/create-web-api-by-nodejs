// 参考にさせていただきました:https://reffect.co.jp/node-js/first-time-express-js
const dayjs = require('dayjs');

console.log('Hello nodemon');
console.log(dayjs('2023-03-12').format('YYYY年M月D日'));


const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))