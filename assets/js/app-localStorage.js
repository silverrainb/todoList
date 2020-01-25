// check off to `completed` specific todos by clicking
// when an `li` is clicked inside the `ul`
$("ul").on('click', 'li', function(){
    $(this).toggleClass('completed')
})

function isTaskItem(x, todoText) {
    console.log("x is", x.task)
    console.log("text is", todoText)
    return x.task === todoText.toString().trim()
}

// DELETE TODO: click on X to delete Todo
$("ul").on('click', 'span', function(event){
    //spans' parent, li
    // assign task elem and remove any white space in the todo text
    let taskElem = $(this).parent()[0].innerText.trim()
    $(this).parent().fadeOut(500, function(event){
        // when fade out is done, remove entire li
        $(this).remove()
        let idx = savedTodos.findIndex(x => isTaskItem(x, taskElem))
        savedTodos.splice(idx,1)
        localStorage.setItem("todos", JSON.stringify(savedTodos))
    })
    event.stopPropagation()
})

// When trashcan is clicked, fade effect
$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle()
})

// RETRIEVE TODO: retrieve from localStorage if none, create an array []
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
// for every items in the saved Todos
for (let i = 0; i < savedTodos.length; i++) {
    // apppend pre-existing todos to ul
    $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + savedTodos[i].task + "</li>")
    // add boolean property `completed`
    savedTodos[i].completed = savedTodos[i].completed ? true : false;
    // if completed
    if (savedTodos[i].completed) {
        // line-through the text
        savedTodos[i].style.textDecoration = "line-through";
        // remove from the local storage
        localStorage.removeItem(savedTodos[i]);
    }
}

// ADD A NEW TODO
$("input[type='text']").keypress(function(event){
    // Press enter to add todos
    if(event.which === 13){
        // grab new todo text from input
        let todoText = $(this).val()
        // then clear input box
        $(this).val("");
        // create new li and append it to ul
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
        // add the todo object into savedtodos array
        savedTodos.push({ task: todoText, completed: false });
        // save to localStorage
        localStorage.setItem("todos", JSON.stringify(savedTodos));
    }
})