window.onload =()=>{
  console.log("executing client side scripts is working")
  const primaryNavigation = document.querySelector(".primary-navigation"); 
  const mobileToggler = document.querySelector(".mobile-nav-toggler"); 
  mobileToggler ? mobileToggler.addEventListener("click", ()=>{
    const visibility = primaryNavigation.getAttribute("data-visible"); 
    const icon = mobileToggler.getAttribute("data-icon"); 
    switch(visibility){
      case "false":
        primaryNavigation.setAttribute("data-visible", true); 
        break; 
      case "true":
        primaryNavigation.setAttribute("data-visible", false); 
    } 
    switch(icon){
      case "menu":
        mobileToggler.setAttribute("data-icon", "close"); 
        break; 
      case "close": 
          mobileToggler.setAttribute("data-icon", "menu"); 
    }
  }): console.log("mobile toggler is empty "); 
  const addTodo = document.querySelector(".container form input[type='submit']"); 
  const todoContainer = document.querySelector(".todo-container"); 
  const inputContent = document.querySelector(".container form input[type='text']"); 
  console.log("printing addTodo"); 
  addTodo.addEventListener("click", (event)=>{
    let todoItem = document.createElement('div'); 
    let button = document.createElement("button"); 
    button.textContent = "delete"; 
    button.addEventListener("click", (event)=>{
      console.log('delete button is being pressed'); 
      executeDelete(inputContent.value, todoItem); 
    }); 
    let text = document.createElement('span'); 
    text.textContent = inputContent.value; 
    todoItem.appendChild(text); 
    todoItem.appendChild(button); 
    todoItem.className = "todo-item"; 
    todoContainer.appendChild(todoItem); 
    console.log(todoItem); 
  }); 
  console.log(addTodo); 
  console.log(todoContainer); 
}
function executeDelete(value, todoItem){
  const reqRes = new XMLHttpRequest(); 
  reqRes.open("POST", "deleteTodo"); 
  reqRes.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
  reqRes.send("Dtodo="+value); 
  todoItem.style.display = "none"; 
}
