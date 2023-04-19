// axiosの利用にimportステートメントは不要

// タスクを挿入するDOMを取得する
const tasksDOM = document.getElementById('tasks')

// フォームのDOMを取得する
const formDOM = document.getElementById('task-form')

// テキストボックスのDOMを取得する
const inputTaskDOM = document.getElementById('task-input')

// メッセージ表示DOMを取得する
const formAlertDOM = document.getElementById('form-alert')

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
        <div class="edit-wrapper">
          <input type="text" value="${name}" class="task-edit" />
          <input type="checkbox" class="task-condition" ${completed ? 'checked' : ''}>
          <button class="update-btn">更新</button>
          <button class="edit-close-btn">閉じる</button>
          <h5><span><i class="fa-regular fa-circle-check ${completed ? '' : 'none'}"></i></span>${name}</h5>
          <div class="task-links">
            <!-- 編集リンク -->
            <button type="button" class="edit-link"><i class="fa-solid fa-pen-to-square"></i></button>

            <!-- 削除リンク -->
            <button type="button" class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
        <div class="update-alert u-mgt-20"></div>
      </div>
      `
    }).join('')

    // 上記で生成したhtmlを挿入する
    tasksDOM.innerHTML = allTasks

    // ここで削除ボタンに対するイベントリスナーを設定する（htmlの挿入後にDOMを取得できる）
    tasksDOM.querySelectorAll('.delete-btn').forEach(deleteBtn => {
      deleteBtn.addEventListener('click', async (event) => {
        // 削除時にフォームメッセージを削除
        formAlertDOM.innerHTML = ''
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

    // 編集ボタンに対するイベントリスナーを設定する（htmlの挿入後にDOMを取得できる）
    tasksDOM.querySelectorAll('.edit-link').forEach(editLink => {
      editLink.addEventListener('click', (event) => {
        // 編集時にフォームメッセージを削除
        formAlertDOM.innerHTML = ''
        // タスク編集を表示
        const singleTaskDOM = event.target.closest('.single-task')
        singleTaskDOM.querySelector('.task-edit').classList.add('edit')
        singleTaskDOM.querySelector('.task-condition').classList.add('edit')
        singleTaskDOM.querySelector('.update-btn').classList.add('edit')
        singleTaskDOM.querySelector('.edit-close-btn').classList.add('edit')
      });
    });

    // 閉じるボタンのイベントリスナーを設定する
    tasksDOM.querySelectorAll('.edit-close-btn').forEach(editBtn => {
      editBtn.addEventListener('click', (event) => {
        const singleTaskDOM = event.target.closest('.single-task')
        // タスク編集を非表示
        singleTaskDOM.querySelector('.task-edit').classList.remove('edit')
        singleTaskDOM.querySelector('.task-condition').classList.remove('edit')
        singleTaskDOM.querySelector('.update-btn').classList.remove('edit')
        singleTaskDOM.querySelector('.edit-close-btn').classList.remove('edit')
      })
    })

    // 更新ボタンのイベントリスナーを設定する
    tasksDOM.querySelectorAll('.update-btn').forEach(updateBtn => {
      updateBtn.addEventListener('click', async (event) => {
        // 更新時にフォームメッセージを削除
        formAlertDOM.innerHTML = ''
        // クリックされた要素から見て、クラス名が.single-taskの祖先要素を取得。
        const singleTaskDOM = event.target.closest('.single-task')
        // single-taskに設定されているdata-idを取得。
        const taskId = singleTaskDOM.dataset.id;
        const updateTaskDOM = singleTaskDOM.querySelector('.task-edit')
        const updateAlertDOM = singleTaskDOM.querySelector('.update-alert')
        const taskNameDOM = singleTaskDOM.querySelector('h5')
        const taskConditionDOM = singleTaskDOM.querySelector('.task-condition')

        // PATCH用dataを用意する
        const data = {
          // nameは、データスキーマ構造の名前
          name: updateTaskDOM.value,
          completed: taskConditionDOM.checked
        }

        try {
          // データを更新する
          await axios.patch(`/api/v1/tasks/${taskId}`, data);

          // 更新後のデータを再度取得する
          const updatedData = await axios.get(`/api/v1/tasks/${taskId}`);
          const { name, completed } = updatedData.data

          // 更新後のデータをDOMに反映させる
          taskNameDOM.innerHTML = `<span><i class="fa-regular fa-circle-check ${completed ? '' : 'none'}"></i></span>${name}`

          // タスクが正常に追加されたことをformAlertDOMで表示する
          updateAlertDOM.classList.add("text-success")
          updateAlertDOM.innerHTML = 'タスクが更新されました'

          // タスク編集を非表示
          singleTaskDOM.querySelector('.task-edit').classList.remove('edit')
          singleTaskDOM.querySelector('.task-condition').classList.remove('edit')
          singleTaskDOM.querySelector('.update-btn').classList.remove('edit')
          singleTaskDOM.querySelector('.edit-close-btn').classList.remove('edit')
          singleTaskDOM.querySelector('.task-edit').value = name

        } catch (error) {
          // エラーメッセージを取得
          const errorMsg = error.response.data.errors.name.message
          // エラーメッセージをupdateAlertDOMで表示する
          updateAlertDOM.classList.remove("text-success")
          updateAlertDOM.innerHTML = errorMsg
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
    name: inputTaskDOM.value
  }
  try {
    // 入力されたタスクをjson形式でエンドポイントに投げる
    await axios.post('/api/v1/tasks', data)
    // post後テキストボックスの中身を空にする
    inputTaskDOM.value = ''
    // タスクが正常に追加されたことをformAlertDOMで表示する
    formAlertDOM.classList.add("text-success")
    formAlertDOM.innerHTML = 'タスクが追加されました'
    // 追加処理が終了したらshowTaskを実行する
    showTasks()
  } catch (error) {
    console.log(error);
    // エラーメッセージを取得
    const errorMsg = error.response.data.errors.name.message
    // エラーメッセージをformAlertDOMで表示する
    formAlertDOM.classList.remove("text-success")
    formAlertDOM.innerHTML = errorMsg
  }
})