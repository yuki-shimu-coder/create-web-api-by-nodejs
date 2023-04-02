// ルーターファイル
const express = require('express')
const router = express.Router()
const { getAllTasks, getSingleTask, updateTask, deleteTask, insertTask } = require('../controllers/tasks')

// 全タスクの取得
router.get('/', getAllTasks)

// 特定のタスクの取得
router.get('/:id', getSingleTask)

// 特定のタスクの更新
router.patch('/:id', updateTask)

// 特定のタスクを削除
router.delete('/:id', deleteTask)

// タスクの追加
router.post('/', insertTask)

// ほかファイルでも読み込めるようにexport
module.exports = router