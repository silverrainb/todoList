// check off specific todos by clicking
// when an `li` is clicked inside the `ul`
$("ul").on('click', 'li', function(){
    // run this code
    $(this).toggleClass('completed')
})

//click on X to delete Todo
$("ul").on('click', 'span', function(event){
    //spans' parent, li
    $(this).parent().fadeOut(500, function(){
        // when fade out is done, remove entire li
        $(this).remove()
        localStorage.removeItem($(this))
    })
    // stop event bubbling up to continue
    event.stopPropagation()
})

// When trashcan is clicked, fade effect
$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle()
})

// write input
$("input[type='text']").keypress(function(event){
    // Press enter to add todos
    if(event.which === 13){
        // grab new todo text from input
        let todoText = $(this).val()
        // then clear input box
        $(this).val("");
        // create new li and append it to ul
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
    }
})