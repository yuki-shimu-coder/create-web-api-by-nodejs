// 各ルートに対応したメソッドを定義するファイル
const Task = require('../models/Task')
const mongoose = require('mongoose')

// 全タスクの取得
const getAllTasks = async (req, res) => {
  try {
    const allTask = await Task.find({})
    res.status(200).json(allTask)
  } catch (error) {
    res.status(500).json(error)
  }
}

// 特定のタスクの取得
const getSingleTask = async (req, res) => {
  try {
    // リクエストされたidが正しい形式なのかバリデーションチェック
    if (mongoose.isValidObjectId(req.params.id)) {
      const getSingleTask = await Task.findById(req.params.id).exec()

      // 　リクエストされたidが存在しなければエラーレスポンス
      if (!getSingleTask) {
        return res.status(404).json(`_id:${req.params.id}は存在しません`);
      }
      res.status(200).json(getSingleTask)

      // 形式が正しくなければエラーレスポンス
    } else {
      console.log('タスクの取得に失敗');
      console.log(`リクエストされたid[${req.params.id}]の形式が正しくありません`);
      res.status(400).json(`リクエストされたid[${req.params.id}]の形式が正しくありません`)
    }
  } catch (error) {
    console.log("error", error)
    res.status(500).json(error)
  }
}

// 特定のタスクの更新
const updateTask = async (req, res) => {
  // アルゴリズムをここに追加する

  // UPDATEに関連するメソッドがあるか？おそらく引数はIDだと思われる。
  try {
    // リクエストされたidが正しい形式なのかバリデーションチェック
    if (mongoose.isValidObjectId(req.params.id)) {
      const updateTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        // 第3引数でオプションを設定
        {
          // 更新が適用された後のドキュメントが返却されるように設定
          new: true
        }
      ).exec()

      // 　リクエストされたidが存在しなければエラーレスポンス
      if (!updateTask) {
        return res.status(404).json(`_id:${req.params.id}は存在しません`);
      }
      res.status(200).json(updateTask)

      // 形式が正しくなければエラーレスポンス
    } else {
      console.log('タスクの更新に失敗');
      console.log(`リクエストされたid[${req.params.id}]の形式が正しくありません`);
      res.status(400).json(`リクエストされたid[${req.params.id}]の形式が正しくありません`)
    }
  } catch (error) {
    console.log("error", error)
    res.status(500).json(error)
  }
}

// 特定のタスクを削除
const deleteTask = (req, res) => {
  res.send('ある特定のタスクを削除しました')
}

// タスクの追加
const createTask = async (req, res) => {
  try {
    // createの引数はjson形式を指定するため、req.bodyを指定。
    const createTask = await Task.create(req.body)

    // res.status(200)は、HTTPレスポンスのステータスコードを200 OKに設定。
    // .json(createTask)は、createTaskオブジェクトをJSON形式に変換し、HTTPレスポンスの本文として返却。
    res.status(200).json(createTask)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = { getAllTasks, getSingleTask, updateTask, deleteTask, createTask }