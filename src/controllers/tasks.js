// 各ルートに対応したメソッドを定義するファイル
const Task = require('../models/Task')

// 全タスクの取得
const getAllTasks = async (req, res) => {
  try {
    const allTask = await Task.find({})
    res.status(200).json(allTask)
  } catch (error) {
    res.status(500).json(err)
  }
}

// 特定のタスクの取得
const getSingleTask = (req, res) => {
  res.send('ある特定のタスクを取得しました')
}

// 特定のタスクの更新
const updateTask = (req, res) => {
  res.send('ある特定のタスクを更新しました')
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
    res.status(500).json(err)
  }
}

module.exports = { getAllTasks, getSingleTask, updateTask, deleteTask, createTask }