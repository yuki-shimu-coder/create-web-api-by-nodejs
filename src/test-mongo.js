const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

/*
MongoDBにtest/passでログインして、exampleデータベースに接続する
personsコレクションに対して、ユーザを1件追加して、
そのコレクションを全件検索する
*/

console.log("---- test connect mongodb server ---")
var url = 'mongodb://test:pass@mongo:27017/'
var db_name = 'example'
var collection_name = 'persons'

console.log(url)
console.log(db_name)
console.log(collection_name)

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

console.log(option);

MongoClient.connect(url, option, (err, client) => {
  console.log("connect!!");
  if (err != null || client == null) {
    console.log(" !! failed to connect mongo db server !! ")
    console.log(err)
  } else {
    console.log(" @@ Connected successfully to server @@ ")
    const db = client.db(db_name)
    var rec = { "name": "hanako", "age": 12 }
    db.collection(collection_name).insertOne(rec, (err, res) => {
      if (err != null) {
        console.log("err: insert")
        console.log(err)
        client.close()
      } else {
        console.log("succeeded: insert")
        db.collection(collection_name).find({}).toArray((err, result) => {
          if (err != null) {
            console.log("err: select")
            console.log(err)
            client.close()
          } else {
            console.log("succeeded: select")
            console.log(result)
            client.close()
          }
        })
      }
    })
  }
})

console.log("-- execute end --")