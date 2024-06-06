document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoDate = document.getElementById('todo-date');
  const todoList = document.getElementById('todo-list');
  const levelDisplay = document.getElementById('level');
  const todoTime = document.getElementById('todo-time')
  
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  let level = parseInt(localStorage.getItem('level')) || 1;

  levelDisplay.textContent = level;

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const task = todoInput.value;
      const date = todoDate.value;
      const time = todoTime.value;
      if (task === '' || date === time ==='') return;

      const todo = { task, date, time, completed: false };
      todos.push(todo);
      saveTodos();
      addTask(todo);
      todoInput.value = '';
      todoDate.value = '';
      todoTime.value = '';
  });

  function addTask(todo) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = `${todo.task}, ${todo.date}, ${todo.time}`;
      span.classList.add('task-info');
      if (todo.completed) {
          span.style.textDecoration = 'line-through';
      }

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.className = 'edit';
      editButton.addEventListener('click', () => editTask(li, todo));

      const completeButton = document.createElement('button');
      completeButton.textContent = 'Complete';
      completeButton.className = 'complete';
      completeButton.addEventListener('click', () => toggleCompleteTask(li, todo));

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete';
      deleteButton.addEventListener('click', () => deleteTask(li, todo));

      li.appendChild(span);
      li.appendChild(editButton);
      li.appendChild(completeButton);
      li.appendChild(deleteButton);

      todoList.appendChild(li);
  }

  function editTask(li, todo) {
      const newTask = prompt('Edit your task:', todo.task);
      const newDate = prompt('Edit the date:', todo.date);
      const newTime = prompt('Edit the time', todo.time)
      if (newTask !== null && newDate !== null) {
          todo.task = newTask;
          todo.date = newDate;
          todo.time = newTime;
          saveTodos();
          li.querySelector('span').textContent = `${newTask} - ${newDate} - ${newTime}`;
      }
  }

  function toggleCompleteTask(li, todo) {
      todo.completed = !todo.completed;
      saveTodos();
      li.querySelector('span').style.textDecoration = todo.completed ? 'line-through' : 'none';
      if (todo.completed) {
          updateLevel(1); 
      } else {
          updateLevel(-1); 
      }
  }

  function deleteTask(li, todo) {
      todos = todos.filter(t => t !== todo);
      saveTodos();
      todoList.removeChild(li);
  }

  function saveTodos() {
      localStorage.setItem('todos', JSON.stringify(todos));
  }

  function loadTodos() {
      todos.forEach(todo => addTask(todo));
  }

  function updateLevel(amount) {
      level += amount;
      if (level < 1) {
          level = 1;
      }
      levelDisplay.textContent = level;
      localStorage.setItem('level', level);
  }

  loadTodos();
});
