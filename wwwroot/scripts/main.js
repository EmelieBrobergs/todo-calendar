window.addEventListener('load', main);

async function main () {
    // load todos from local storage()

    // initialize allt
    initTodo();
    await initCalendar();
    initToday();
    addEventListeners();
}

function addEventListeners() {
	var createTodoButton = document.getElementById('submit');
	createTodoButton.addEventListener('click', addNewTodoItem);

    var gridItem = document.getElementsByClassName('grid-item');
    for (var iterator of gridItem) {
        iterator.addEventListener('click', filterTodoList(iterator.getElementsByTagName('p')));
    }
    //gridItem.addEventListener('click', addNewTodoItem);
    // filterTodoList(
    //     function () {
    //         alert($(this).text());
    //     }));
}
