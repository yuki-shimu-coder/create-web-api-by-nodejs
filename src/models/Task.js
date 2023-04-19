// modelファイル
// 各スキーマは MongoDB コレクションにマップされ、そのコレクション内のドキュメントの形状を定義します。
const mongoose = require('mongoose')
const { Schema } = mongoose;

const TaskSchema = new Schema({
  // タスク名を管理する
  name: {
    type: String,
    required: [true, 'タスク名を入力してください'],    //name は必須入力
    trim: true,                                   //空白を削除してくれる（トリミング）
    maxlength: [20, 'タスク名は20文字以内で入力してください。']
  },
  // タスクの完了状況を管理する(初期値は完了していないのでfalse)
  completed: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model('Task', TaskSchema)