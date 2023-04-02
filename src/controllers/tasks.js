// 各ルートに対応したメソッドを定義する

// 全タスクの取得
const getAllTasks = (req, res) => {
  res.send('タスクを全て取得しました')
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
const insertTask = (req, res) => {
  res.send('タスクを新規作成しました')
}

module.exports = { getAllTasks, getSingleTask, updateTask, deleteTask, insertTask }