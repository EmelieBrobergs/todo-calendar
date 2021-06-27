var storedDate;
var storedTodos = [];

function initTodo() {
	getTodoFromLocalStorage();
}

function initCalendarPicker(initialDate) {
    // Calendar picker: Format date and store date info in Todo
    document.querySelector('#date_calendar').innerHTML = "";
    $('#date_calendar').calendar({
        monthFirst: false,
        inline: true,
        type: 'date',
        minDate: new Date(),
        initialDate: initialDate || new Date(),
        formatter: {
            date: function(date, settings) {
                date.setHours(0, 0, 0, 0);
                storedDate = date;
            }
        }
    });
}

//Function to Hide Popup
function div_hide() {
    document.getElementById('modal').style.display = 'none';
}

//adds item to list
function saveTodoItem(event, todoItem) {
    event.preventDefault();

    var inputValue = document.getElementById('myInput').value;

	if (inputValue === '') {
		alert('You must write something!');
	} else if (todoItem) {
        // edit
        todoItem.text = inputValue;
        todoItem.date = storedDate;
    } else {
        // new
		storeCreatedTodos(inputValue);
    }
    renderTodos(storedTodos);
    loadCalendar();
    saveTodoToLocalStorage();

	//Erase input field
	document.getElementById('myInput').value = '';
}

//Create editbutton for every listitem
function createEditButton(todoItem) {
    const span = document.createElement('button');
    span.innerHTML = '<i class="far fa-edit padding8"></i>'
    span.addEventListener('click', (e) => showEditTodoForm(e, todoItem));
    span.classList.add('pointer');
    span.classList.add('icon-span-edit-button');
    return span;
}

//Create deletebutton for everylistitem
function createDeleteButton(todoItem) {
    const span = document.createElement('button');
    span.innerHTML= '<i class="far fa-trash-alt padding8"></i>';
    span.addEventListener('click', () => deleteTodo(todoItem));
    span.classList.add('icon-span-delete-button');
    span.classList.add('pointer')
    return span;
}

//Deletes todo
function deleteTodo(todoItem) {
	storedTodos.splice(storedTodos.indexOf(todoItem), 1);
	saveTodoToLocalStorage();
	renderTodos(storedTodos);
	loadCalendar();
}

//Opens a popup to edit a todo
function showEditTodoForm(event, todoItem) {
    const modal = document.getElementById('modal')
    modal.style.display = 'block';
    
    // Fill in editing todo values
    if (todoItem) {
        const input = modal.querySelector('input');
        input.value = todoItem.text;
    }
    
    initCalendarPicker(todoItem?.date)

    // Hook up the save event
    const saveTodoButton = modal.querySelector('#submit');
    saveTodoButton.onclick = (e) => saveTodoItem(e, todoItem);
}

// Store TODOs
function storeCreatedTodos(todoText) {
    var todoItem = { date: storedDate, text: todoText };
    storedTodos.push(todoItem);
}

// Save to local Storage
function saveTodoToLocalStorage() {
    var stringifyTodos = JSON.stringify(storedTodos);
    localStorage.setItem('todos', stringifyTodos);
}

// Get from locale Storage
function getTodoFromLocalStorage() {
    var stringifyTodos = localStorage.getItem('todos');
    if (!stringifyTodos) {
        storedTodos = [];
    } else {
        storedTodos = JSON.parse(stringifyTodos);
        for (const todo of storedTodos) {
        let todoUtcDate = new Date(todo.date);
		let todoLocaleDateString = todoUtcDate.toLocaleDateString();
        var date = new Date(todoLocaleDateString);
        date.setHours(0, 0, 0, 0);
        todo.date = date;
        }
    renderTodos(storedTodos);
    }
}

// Render the todoItems
function renderTodos(todosToRender) {
    resetTodos();

    todosToRender.forEach((todoItem) => {
        var li = document.createElement('li');
        var span = document.createElement('span');
        li.classList.add('todo-list-item');
        li.appendChild(span).innerText = todoItem.text;
        document.getElementById('todoList').appendChild(li);
        li.append(createEditButton(todoItem));
        li.append(createDeleteButton(todoItem));
    });
}

function resetTodos() {
    document.querySelectorAll('.todo-list-item').forEach((e) => e.parentNode.removeChild(e));
}


/**
 * 
 * @param {Date} selectedDate 
 * @returns {Array}
 */
function loadTodos(selectedDate) {
	let tempTodos = [];
	for (item of storedTodos) {
		if (item.date.valueOf() == selectedDate.valueOf()) {
			tempTodos.push(item);
		}
	}
	return tempTodos;
}

function appendSelectedDateInfo(selectedDate) {
	var li = document.createElement('li');
	li.classList.add('todo-list-item');
	li.innerText = 'Todos för: \n' + selectedDate.toLocaleDateString();
	document.getElementById('todoList').insertBefore(li, document.getElementById('todoList').firstChild);
	li.append(createResetButton());
}

//Create deletebutton for every listitem
function createResetButton() {
	const span = document.createElement('span');
    span.innerHTML = '<i class="far fa-window-close padding8"></i>';
	span.addEventListener('click', () => renderTodos(storedTodos));
	span.classList.add('icon-span-delete-button');
    span.classList.add('pointer');
	return span;
}