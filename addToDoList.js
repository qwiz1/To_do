let requestURL = 'https://solo-todo-app.herokuapp.com/tasks';
let xhr = new XMLHttpRequest();
xhr.open('get', requestURL);
xhr.onload = function(){
    let taskResponse = JSON.parse(this.responseText);
    console.log(taskResponse);
    let checkboxList = document.getElementById("checkbox-list");
    // let checkboxStatus = document.getElementById("myCheck");
    
    for (task of taskResponse){
        let checked = '';
         if (task.done){
             checked = 'checked'
         }
        let listItem = `<li class='list-items'><input type='checkbox' id='myCheck' ${checked}>${task.name}<button class='delete-btn button is-dark is-small' id='delete-item'>Delete</button></li>`;
        checkboxList.innerHTML += listItem;
       
    }
    
}
xhr.send();






let btnPlusTodo = document.getElementById("btnPlusTodo");
btnPlusTodo.addEventListener("click", function(){
    
    let checkboxList = document.getElementById("checkbox-list"); 
    let newText = document.getElementById("new-text").value;
    let listItem = `<li class='list-items'><input type='checkbox'>${newText}<button class='delete-btn button is-dark is-small' id='delete-item'>Delete</button></li>`;
    checkboxList.innerHTML += listItem;
    console.log(newText)

    let xhrPost = new XMLHttpRequest();
    let jsonText = JSON.stringify({name: newText});
    xhrPost.open('post', requestURL);
    xhrPost.setRequestHeader('content-type', 'application/json');
    xhrPost.onreadystatechange = function(){
        if(xhrPost.readyState == XMLHttpRequest.DONE && xhrPost.status == 200) console.log("ok");
    }
    xhrPost.send(jsonText);
})



