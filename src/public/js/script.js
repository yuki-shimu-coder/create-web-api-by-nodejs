// axiosの利用にimportステートメントは不要

// タスクを挿入するDOMを取得する
const tasksDOM = document.getElementById('tasks')


// /api/v1/tasksから全タスクを取得する
const showTasks = async () => {
  try {
    // 全タスクの取得
    const tasks = await axios.get('/api/v1/tasks')

    console.log(tasks);

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
showTasks()