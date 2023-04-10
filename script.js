const input= document.getElementById("input-one");
const addBtn = document.getElementById("add-btn");
const firstCard = document.querySelectorAll(".card-body")[0];
const todoList = document.querySelectorAll(".list-group")[0];
const clearBtn = document.getElementById("clearButton");
const filterInput = document.getElementById("search-input");
let todo = [];

document.addEventListener("DOMContentLoaded", function() {
    getStorageForUI();
    run();
    
  
});

function run()
{
    
    addBtn.addEventListener("click" ,()=>{
        const inputText = input.value;
        if(input.value == null || input.value =="")
        {
            const createDiv = document.createElement("div");
            createDiv.classList.add('alert', 'alert-warning');
            createDiv.setAttribute('role', 'alert');
            createDiv.innerHTML="Lütfen bir Todo girin!"
            firstCard.appendChild(createDiv);
            setTimeout(()=>{
                createDiv.remove();

            },2500);
        }
        else{
        addTodoUI(inputText);
        addTodoStorage(inputText);
    }
    })

    todoList.addEventListener("click",removeTodo);
    clearBtn.addEventListener("click",clearStorage);
    filterInput.addEventListener("keyup",todoFilter);
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          addBtn.click();
        }
      });
}

function addTodoUI(newTodo)
{
    const li =document.createElement("li");
    const a = document.createElement("a");
    const i = document.createElement("i");
    li.className = "list-group-item d-flex justify-content-between mb-1 ";
    li.textContent=newTodo;
    a.className ="delete-item";
    a.href="#";
    i.className ="fa fa-remove";
    
    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);
    input.value = "";
}

function addTodoStorage(newTodo){
    if(localStorage.getItem("todo")===null){
        todo = [];
    }
    else{
        todo = JSON.parse(localStorage.getItem("todo"));
    }
    todo.push(newTodo);
    localStorage.setItem("todo",JSON.stringify(todo));
}

function getStorageForUI()
{
    if(localStorage.getItem("todo")===null){
        todo = [];
    }
    else{
        todo = JSON.parse(localStorage.getItem("todo"));
    }
    todo.forEach(function(todos){
        addTodoUI(todos);
    })
}

function removeTodo(e){
if(e.target.className==="fa fa-remove"){
    const remTodo = e.target.parentElement.parentElement;
    remTodo.remove();

    if(localStorage.getItem("todo")===null){
        todo = [];
    }
    else{
        todo = JSON.parse(localStorage.getItem("todo"));
    }
    
    todo.some(function(todos, i) {
        if(remTodo.textContent === todos) {
          todo.splice(i, 1);
          return true; // döngüyü durdur
        }
      });
    localStorage.setItem("todo",JSON.stringify(todo));
}
}

function clearStorage(){
  
    todoListForRemove = document.querySelectorAll(".list-group-item");
    todoListForRemove.forEach(function(todos){
        todos.remove();
    })
    todo = [];
    localStorage.setItem('todo',JSON.stringify(todo));
}

function todoFilter(e){
    const filterValue = e.target.value.trim().toLowerCase();
    const todoLis = document.querySelectorAll(".list-group-item")

    todoLis.forEach((todos)=>{
        if(todos.textContent.toLowerCase().trim().includes(filterValue)){
        todos.setAttribute("style","display : flex !important");
        }
        
        else{
            todos.setAttribute("style","display : none !important");
        }
    });
}

