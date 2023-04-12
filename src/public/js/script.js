// axiosの利用にimportステートメントは不要

// タスクを挿入するDOMを取得する
const tasksDOM = document.getElementById('tasks')

// フォームのDOMを取得する
const formDOM = document.getElementById('task-form')

// テキストボックスのDOMを取得する
const inputTask = document.getElementById('task-input')

// /api/v1/tasksから全タスクを取得する
const showTasks = async () => {
  try {
    // 全タスクの取得
    const tasks = await axios.get('/api/v1/tasks')
    // 取得したタスクをを出力する
    const allTasks = tasks.data.map((task) => {
      const { completed, name, _id } = task
      return `
      <div class="single-task">
        <h5><span><i class="fa-regular fa-circle-check ${completed ? '' : 'none'}"></i></span>${name}</h5>
        <div class="task-links">
          <!-- 編集リンク -->
          <a href="#" class="edit-link"><i class="fa-solid fa-pen-to-square"></i></a>

          <!-- 削除リンク -->
          <button type="button" class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
      `
    }).join('')

    // 上記で生成したhtmlを挿入する
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    console.log(error);
  }

}

// 初回表示時に実行する
showTasks()


// タスクを新規追加する
// formのsubmitイベントを定義する
formDOM.addEventListener('submit', async (event) => {
  // APIを叩ければ良いので、デフォルトの動作をキャンセルする
  event.preventDefault()
  // POSTするdataを用意する
  const data = {
    // nameは、データスキーマ構造の名前
    name: inputTask.value
  }
  // 入力されたタスクをjson形式でエンドポイントに投げる
  const createTask = await axios.post('/api/v1/tasks', data)

  // post後テキストボックスの中身を空にする
  inputTask.value = ''
  // 追加処理が終了したらshowTaskを実行する
  showTasks()
})