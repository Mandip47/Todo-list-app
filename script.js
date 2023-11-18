'use strict';

console.log('hello');
const searchBox = document.querySelector('.inputselect');
const searchForm = document.querySelector('.formselect');
const todoItemContainer = document.querySelector('.js-todo-list');
const todoItem = document.querySelector('.todo-item');
const input = document.querySelector(".inputselect");
const themeToggleBtn = document.getElementById("themeToggleBtn");
 const body = document.body;

let theme = body.getAttribute("data-theme");

const controller ={
  _todos:[],

  toggleTheme() {
    
    body.setAttribute("data-theme", theme === "light" ? "dark" : "light");
    
    theme = body.getAttribute("data-theme");
  
    localStorage.setItem('theme', theme);
    
  },
  
  init() {
    this._loadTodos();
    this._displayTodos();
    this._controlTodo();
    console.log(this._todos);
    
    if(localStorage.getItem('theme') !== theme) 
      this.toggleTheme();
    
  },

  _loadTodos() {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      this._todos = JSON.parse(storedTodos);
    }
  },
  
  _displayTodos() {
    this._todos.forEach((todo) => {
      this._displayTodo(todo);
    });
    
  },
  
  _saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this._todos));
  },
  
  _addTodos(text){
    const todo = {
      id: Date.now(),
      text,
      completed: false
    };
    
    this._todos.push(todo);
    this._displayTodo(todo);
    this._saveTodos();
  },
  
  _displayTodo(todo){
   const html = `
      <li class="todo-item ${todo.completed ? 'done' : ''}" data-key="${todo.id}">
    <input id="${todo.id}"  type="checkbox"/>
    <label for "${todo.id}"  class="tick js-tick ${todo.id}" ></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
        <button class="delete-todo js-delete-todo">
            <svg fill="var(--svgcolor)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
        </button>
        </li>
    `;
    todoItemContainer.insertAdjacentHTML('beforeend',html);
  },
  
  _controlTodo(){
    todoItemContainer.addEventListener('click', (e)=>{
      const el = e.target;
      const elCl = el.closest(".todo-item");
      const key = +elCl.dataset.key
      const selectedEl = this._todos.find(todo => todo.id === key );
      
      // console.log(el);
      if(el.classList.contains("js-tick")){
        // console.log(this);
        elCl.classList.toggle("done");
        
       selectedEl.completed =  elCl.classList.contains("done") ? true : false;
        this._saveTodos();
        }
      
      if(el.classList.contains("js-delete-todo")){
        const selectedElIndex = this._todos.findIndex(todo => todo.id === key);
        console.log(selectedElIndex);
        this._todos.splice(selectedElIndex,1);
        elCl.remove();
        this._saveTodos();
      }
    });
  },
};

searchForm.addEventListener('submit', function(e){
  e.preventDefault();
  
  controller._addTodos(input.value);
  input.value = '';
});

// Event listener for button click to toggle theme


controller.init();
themeToggleBtn.addEventListener("click", controller.toggleTheme);



