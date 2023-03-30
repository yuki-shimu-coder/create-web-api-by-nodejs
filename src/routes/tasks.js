// ルーターファイル
const express = require('express')
const router = express.Router()

// 全タスクの取得
router.get('/', (req, res) => {
  res.send('タスクを全て取得しました')
})

// 特定のタスクの取得
router.get('/:id', (req, res) => {
  res.send('ある特定のタスクを取得しました')
})

// 特定のタスクの更新
router.patch('/:id', (req, res) => {
  res.send('ある特定のタスクを更新しました')
})

// 特定のタスクを削除
router.delete('/:id', (req, res) => {
  res.send('ある特定のタスクを削除しました')
})

// タスクの追加
router.post('/', (req, res) => {
  res.send('タスクを新規作成しました')
})

// ほかファイルでも読み込めるようにexport
module.exports = router