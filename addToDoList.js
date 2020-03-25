
let requestURL = 'https://solo-todo-app.herokuapp.com/tasks';

function getReq(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', requestURL);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send()
    xhr.onload = function(){
        let resp = JSON.parse(xhr.responseText);
        console.log(resp);
        resp.forEach(function(task){
            let someItem = document.getElementById('checkbox-list');
            let newLi = `<li class='list-items' id='li-item${task.id}'>
                            <input type='checkbox' id='myCheck'>${task.name}
                            <button class='delete-btn button is-dark is-small' id='delete-item'>Delete</button>
                        </li>`;
            someItem.innerHTML += newLi;
        });
        
        let delBtn = document.querySelectorAll('ul button');
        delBtn.forEach(elem => {
            elem.addEventListener('click', function(){
                let liAndButton = elem.closest(`li`);
                    console.log(liAndButton ,' deleted');
                liAndButton.remove();
            })
        })       
    }
}
getReq();



function postReq(x){
    let xhrPost = new XMLHttpRequest();
    let noLong = JSON.stringify(x);
        xhrPost.open('POST', requestURL);
        xhrPost.setRequestHeader('content-type', 'application/json');
        xhrPost.send(noLong);
}


let btnPlusTodo = document.getElementById("btnPlusTodo");
btnPlusTodo.addEventListener("click", function(){
    let inpSectionText = document.querySelector('#new-text').value;
    let textObj = {name: inpSectionText}
    postReq(textObj);
})
