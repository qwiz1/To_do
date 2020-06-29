const requestURL = 'https://solo-todo-app.herokuapp.com/tasks';


const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoDivItem = document.querySelector('todo');
const todoList = document.querySelector('#todo-list');


todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', removeTodo);

todoList.addEventListener('click', todoCompleted)



function loadAndDisplayTasks(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', requestURL);
    xhr.onload = () =>{
        const allTasks = JSON.parse(xhr.responseText)
        // console.log(allTasks);
        
        allTasks.forEach(displayTask);
    }
    xhr.send()
}
loadAndDisplayTasks();


function displayTask(todo){

    const todoDiv = document.createElement('div'); 
    const listElem = document.createElement('li');
    const spanElem = document.createElement('span');
    const deleteBtn = document.createElement('button');


    const spanTimeCreated = document.createElement('span');          

    const checkBtn = document.createElement('button');


//------need to create a normal time display format-----------------------------------------
    const timeCreatedAt = new Date(todo.createdAt);
    const rightFormat = timeCreatedAt; 
    spanTimeCreated.innerText = `Time of creation: ${rightFormat}`;
    spanTimeCreated.classList.add('time-span')

    todoDiv.classList.add('todo');
    todoDiv.id = `${todo.id}`;

    listElem.classList.add('todo-item', 'list-items');                                                                 

    spanElem.classList.add('todoName'); // rename!
    spanElem.innerText = todo.name;
    spanElem.id = `done-${todo.done}`

    checkBtn.classList.add('button', 'is-dark', 'is-small');
    checkBtn.id = 'check-btn'
    checkBtn.innerHTML = '&#10003;';
   

    deleteBtn.classList.add('button', 'is-dark', 'is-small');
    deleteBtn.id = 'delete-todo';
    deleteBtn.innerText = 'Delete';
    
    

    todoDiv.appendChild(listElem);
    listElem.appendChild(spanElem);
    
    
    //===========================================
    listElem.appendChild(checkBtn);
    //===========================================
    listElem.appendChild(deleteBtn);
    todoList.appendChild(todoDiv);

    todoDiv.appendChild(spanTimeCreated);
}

function addTodo(event){
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    const taskName = todoInput.value;
    const todoObj = {name: taskName}

        xhr.open('POST', requestURL);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.onload = () => {
            const todoJSON = JSON.parse(xhr.responseText);
            console.log(todoJSON);
            displayTask(todoJSON);
        }
        xhr.send(JSON.stringify(todoObj));
    
    
    todoInput.value = '';
}

function removeTodo(event){
    const xhr = new XMLHttpRequest();
    if (event.target.id === 'delete-todo'){
        const parentItem = event.target.parentElement;
        const todoId = parentItem.parentElement.id;
        // console.log(todoId);
        
        xhr.open('DELETE', requestURL + `/${todoId}`);
        xhr.onload = () =>{
            const deletedObj = JSON.parse(xhr.responseText);
            console.log(deletedObj);
        }
        xhr.send()

        parentItem.parentElement.remove();
    } 
}


// need to change!!!!!
function todoCompleted(event){
    
    if (event.target.id === 'check-btn'){

        const li = event.target.parentElement; 

        const todoId = li.parentElement.id;

        const xhr = new XMLHttpRequest();

        xhr.open('POST', requestURL + `/${todoId}`);
        xhr.setRequestHeader('content-type', 'application/json');
        
/*
 it would be fun to put this 
 in a separate function
 */
        
        
        
        if (li.childNodes[0].id === 'done-false'){
            const status = li.childNodes[0].id = 'done-true';
            const statusArr = status.split('-');
            
            const statusObj = { done: statusArr[1]};

            xhr.send(JSON.stringify(statusObj));
        }else{
            const status = li.childNodes[0].id = 'done-false';
            const statusArr = status.split('-');
          
            const statusObj = { done: statusArr[1]};

            xhr.send(JSON.stringify(statusObj));
        }

    
    }
}