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
}
