
let requestURL = 'https://solo-todo-app.herokuapp.com/tasks';

function loadAndDisplayTasks() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', requestURL);

    xhr.onload = function () {
        let allTasks = JSON.parse(xhr.responseText);
        allTasks.forEach(displayTask);    
    }
    xhr.send();
}
loadAndDisplayTasks();

function removeTask(taskId) {
    let deleteRequest = new XMLHttpRequest();
    deleteRequest.onload = function () {
        let taskListItem = document.getElementById(`li-item${taskId}`);
        taskListItem.remove();
    }
    deleteRequest.open('DELETE', requestURL + `/${taskId}`);
    deleteRequest.send();
}

function addTask(taskName) {
    let taskObject = { name: taskName };
    let addTaskRequest = new XMLHttpRequest();
    let jsonTask = JSON.stringify(taskObject);
    addTaskRequest.open('POST', requestURL);
    addTaskRequest.setRequestHeader('content-type', 'application/json');
    addTaskRequest.onload = function () {
        let taskResponse = JSON.parse(addTaskRequest.responseText);
        displayTask(taskResponse);
        console.log(taskResponse);
    }
    addTaskRequest.send(jsonTask);
}


let btnPlusTodo = document.getElementById("btnPlusTodo");
btnPlusTodo.addEventListener("click", function () {
    let input = document.getElementById('new-text');
    addTask(input.value);
    input.value = '';
})


function displayTask(task) {
    let someItem = document.getElementById('checkbox-list');
    let newLi = `<li class='list-items'  id='li-item${task.id}'>
                    <input type='checkbox' ${task.done ? 'checked' : ''} id='myCheck' onclick='changeState(${task.id})'><label>${task.name}</label>
                    <button class='delete-btn button is-dark is-small' id='delete-item' onclick='removeTask(${task.id})'>Delete</button>
                </li>`;
    someItem.innerHTML += newLi;
};

function changeState(taskId){
    let isDone = document.querySelector(`#li-item${taskId} input`).checked;
    
    let updateRequst = new XMLHttpRequest();
    updateRequst.open('POST' , requestURL+ `/${taskId}`);
    updateRequst.setRequestHeader('content-type', 'application/json');
    updateRequst.send(JSON.stringify({done: isDone}));

    // ${task.done ? 'task-done':''}
    //let item = document.getElementById(`li-item${taskId}`)
    
    //if (isDone){
    //     item.classList.add('task-done');
    // }else{
    //     item.classList.remove('task-done');
    // }
}

