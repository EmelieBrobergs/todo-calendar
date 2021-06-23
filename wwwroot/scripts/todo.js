
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
    document.getElementById('abc').style.display = 'none';
    //TODO: Skapa css klass
}

//adds item to list
function saveTodoItem(event, todoItem) {
    event.preventDefault();

    //var li = document.createElement('li');
    var inputValue = document.getElementById('myInput').value;

    //TODO: kolla att datum är valt
    console.log(event, todoItem);

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

	//Tömmer skrivfältet
	document.getElementById('myInput').value = '';
    // todo: dölj modalen
}

//Create editbutton for everylistitem
function createEditButton(todoItem) {
    const span2 = document.createElement('button');
    span2.textContent = '\u{1F58B}';
    //span2.innerText = '\u{1F58B}';
    span2.addEventListener('click', (e) => showEditTodoForm(e, todoItem));
    span2.classList.add('icon-span-edit-button');
    return span2;
}

//Create deletebutton for everylistitem
function createDeleteButton(todoItem) {
    const span = document.createElement('button');
    span.innerText = '\u{1F5D1}';
    span.addEventListener('click', () => deleteTodo(todoItem));
    span.classList.add('icon-span-delete-button');
    return span;
}

function createSaveButton() {
    const span3 = document.createElement('button');
    span3.textContent = 'save';
    span3.addEventListener('click', () => saveTodoToLocalStorage());
    span3.classList.add('icon-span-edit-button');
    return span3;
}

//Tömmer skrivfältet

function deleteTodo(todoItem) {
	storedTodos.splice(storedTodos.indexOf(todoItem), 1);
	saveTodoToLocalStorage();
	renderTodos(storedTodos);
	loadCalendar();
}

//TODO: ändra denna funktion så den uppdaterar rätt todo
//i arrayen för nu lägger den bara till nya toditems
function showEditTodoForm(event, todoItem) {
    const modal = document.getElementById('abc')
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

// Lagra todos
function storeCreatedTodos(todoText) {
    var todoItem = { date: storedDate, text: todoText };
    storedTodos.push(todoItem);
}

function saveTodoToLocalStorage() {
    var stringifyTodos = JSON.stringify(storedTodos);
    localStorage.setItem('todos', stringifyTodos);
}

function getTodoFromLocalStorage() {
    var stringifyTodos = localStorage.getItem('todos');
    if (!stringifyTodos) {
        storedTodos = [];
    } else {
        storedTodos = JSON.parse(stringifyTodos);
        for (const todo of storedTodos) {
        todo.date = new Date(todo.date);
        }
    renderTodos(storedTodos);
    }
}

function renderTodos(todosToRender) {
    resetTodos();

    todosToRender.forEach((todoItem) => {
        var li = document.createElement('li');
        var span = document.createElement('span');
        li.classList.add('todo-list-item');
        //li.innerText = todoItem.text;
        li.appendChild(span).innerText = todoItem.text;  //NOTE: problem för annan kod
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

//Create deletebutton for everylistitem
function createResetButton() {
	const span = document.createElement('span');
	span.innerText = '\u{2716}';
	span.addEventListener('click', () => renderTodos(storedTodos));
	span.classList.add('icon-span-delete-button');
	return span;
}