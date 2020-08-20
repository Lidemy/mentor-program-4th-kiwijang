/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
document.addEventListener('DOMContentLoaded', () => {
  const todoList = [];

  function Todo(content) {
    this.complete = false;
    this.content = content ? content.trim() : '';
    this.createTime = new Date().toLocaleString();
  }
  Todo.prototype = {
    create(todo) {
      todoList.push(todo);
    },
    delete(idx) {
      todoList.splice(idx, 1);
    },
    update(idx, completeBool) {
      const originObj = todoList[idx];
      originObj.complete = completeBool;
      todoList.splice(idx, 1, originObj);
    },
  };
  function refresh() {
    if (document.querySelector('.tab__all').classList.contains('active')) {
      reloadTodoList('all');
    } else {
      reloadTodoList('complete');
    }
  }

  function createTodo() {
    const todoContent = document.querySelector('#create__input').value;
    if (todoContent.trim() === '') {
      window.alert('請輸入內容!');
      return;
    }
    // 新增
    const newTodo = new Todo(escapeHtml(todoContent));
    newTodo.create(newTodo);
    document.querySelector('#create__input').value = '';
    refresh();
  }
  document.querySelector('#create__input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      createTodo();
    }
  });
  document.querySelector('.create__btn').addEventListener('click', () => {
    createTodo();
  });

  document.querySelector('.list').addEventListener('click', (e) => {
    const idx = e.target.getAttribute('data-idx');
    const myTodo = new Todo();
    // 刪除
    if (idx) {
      if (window.confirm('確定刪除?')) {
        myTodo.delete(e.target.getAttribute('data-idx'));
        refresh();
      }
    }
    // checked upd
    const updIdx = e.target.getAttribute('data-updIdx');
    // 因為先捕獲到了沒有 checked 的元素會壞掉，所以要判斷有沒有 checked 有才是該元素
    if (e.target.checked === true || e.target.checked === false) {
      myTodo.update(updIdx, e.target.checked);
      refresh();
    }
  });

  function reloadTodoList(statusStr) {
    document.querySelector('.list').innerHTML = '';
    if ((statusStr === 'all' && todoList.length === 0)
      || (todoList.filter((x) => x.complete === true).length === 0 && statusStr === 'complete')) {
      document.querySelector('.list').innerHTML = '<p class="empty">沒有東西呢 (*’ｰ’*)</p>';
      return;
    }
    for (let i = 0; i < todoList.length; i += 1) {
      const todos = `
      <div class="list__todoitem">
        <label class="labelwrap">
          <input data-updIdx="${i}" 
          type="checkbox" 
          name="todoitem-chkbox" 
          id="list__todoitem__todoitem-chkbox" 
          ${todoList[i].complete ? 'checked' : ''}/>
          <span class="icon"></span>
          <div class="line-through">
            <span class="time">${todoList[i].createTime}</span>
            <span id="list__todoitem__todoitem-content">${todoList[i].content}</span>
          </div>
          <button class="list__todoitem__deletebtn" data-idx="${i}">刪除</button>
        </label>
      </div>`;
      // 重整-未完成
      if (statusStr === 'all') {
        document.querySelector('.list').innerHTML += todos;
      }
      // 重整-已完成
      if (statusStr === 'complete' && todoList[i].complete === true) {
        document.querySelector('.list').innerHTML += todos;
      }
    }
  }

  // tab
  document.querySelector('.tab__all').addEventListener('click', (e) => {
    document.querySelector('.tab__strike').classList.remove('active');
    e.currentTarget.classList.add('active');
    reloadTodoList('all');
  });
  document.querySelector('.tab__strike').addEventListener('click', (e) => {
    document.querySelector('.tab__all').classList.remove('active');
    e.currentTarget.classList.add('active');
    reloadTodoList('complete');
  });

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
