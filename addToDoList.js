
let btnPlusTodo = document.getElementById("btnPlusTodo");

btnPlusTodo.addEventListener("click", function(){
    let checkboxList = document.getElementById("checkbox-list"); 
    let newText = document.getElementById("new-text").value;
    let listItem = `<li class='list-items'><input type='checkbox'>${newText}<button class='button is-dark is-small' id='delete-item'>Delete</button></li>`;
    checkboxList.innerHTML += listItem;
})

