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

    // タスクがないときは'タスクがありません'を表示する
    if (tasks.data.length < 1) {
      tasksDOM.innerHTML = 'タスクがありません'
      return 
    }

    // 取得したタスクをを出力する
    const allTasks = tasks.data.map((task) => {
      const { completed, name, _id } = task
      return `
      <div class="single-task" data-id="${_id}">
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

    // ここで削除ボタンに対するイベントリスナーを設定する（htmlの挿入後にDOMを取得できる）
    tasksDOM.querySelectorAll('.delete-btn').forEach(deleteBtn => {
      deleteBtn.addEventListener('click', async (event) => {
        // クリックされた要素から見て、クラス名が.single-taskの祖先要素を取得。その祖先要素に設定されているdata-idを取得。
        const taskId = event.target.closest('.single-task').dataset.id;
        try {
          await axios.delete(`/api/v1/tasks/${taskId}`);
          showTasks();
        } catch (error) {
          console.log(error);
        }
      });
    });

  } catch (error) {
    console.log(error);
  }

}

// 初回表示時に実行する
showTasks()


// タスクを新規追加する(formのsubmitイベント着火時に実行)
formDOM.addEventListener('submit', async (event) => {
  // APIを叩ければ良いので、デフォルトの動作をキャンセルする
  event.preventDefault()
  // POSTするdataを用意する
  const data = {
    // nameは、データスキーマ構造の名前
    name: inputTask.value
  }
  try {
    // 入力されたタスクをjson形式でエンドポイントに投げる
    await axios.post('/api/v1/tasks', data)
    // post後テキストボックスの中身を空にする
    inputTask.value = ''
    // 追加処理が終了したらshowTaskを実行する
    showTasks()
  } catch (error) {
    console.log(error);
  }
})