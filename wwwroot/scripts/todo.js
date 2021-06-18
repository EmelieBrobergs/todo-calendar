var storedTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

var storedDate;
//var storedTodos = [];

function initTodo() {
	initCalendarPicker();
	addEventListeners();
	getTodoFromLocalStorage();
}

function addEventListeners() {
	var createTodoButton = document.getElementById('submit');
	createTodoButton.addEventListener('click', addNewTodoItem);
}

function initCalendarPicker() {
	// Calendar picker: Format date and store date info in Todo
	$('#date_calendar').calendar({
		monthFirst: false,
		type: 'date',
		formatter: {
			date: function(date, settings) {
				date.setHours(0, 0, 0, 0);
				storedDate = date;
			}
		}
	});
}
//Function To Display Popup
function div_show() {
	document.getElementById('abc').style.display = 'block';
	//TODO: Skapa css klass för block
}
//Function to Hide Popup
function div_hide() {
	document.getElementById('abc').style.display = 'none';
	//TODO: Skapa css klass
}

//adds item to list
function addNewTodoItem(event) {
	event.preventDefault();

	var li = document.createElement('li');
	var inputValue = document.getElementById('myInput').value;

	//TODO: kolla att datum är valt

	if (inputValue === '') {
		alert('You must write something!');
	} else {
		var t = document.createTextNode(inputValue); //flyttat ned
		li.appendChild(t); // flyttat ned
		document.getElementById('todoList').appendChild(li);
		storeCreatedTodos(inputValue); //TODO--Denna ska lagra todo-datan
	}
	//Create deletebutton for everylistitem
	const span = document.createElement('span');
	span.innerText = '\u{1F5D1}';
	span.addEventListener('click', () => deleteTodo());
	span.classList.add('icon-span-delete-button');
	li.append(span);

	//Create editbutton for everylistitem
	const span2 = document.createElement('span');
	span2.innerText = '\u{1F58B}';
	span2.addEventListener('click', () => editTodo());
	span2.classList.add('icon-span-edit-button');
	li.append(span2);
}

//Tömmer skrivfältet
document.getElementById('myInput').value = '';

function deleteTodo() {
	var close = document.getElementsByClassName('icon-span-delete-button');
	var i;
	for (i = 0; i < close.length; i++) {
		close[i].onclick = function () {
			var div = this.parentElement;
			div.style.display = 'none';
		};
	}
}

//TODO: ändra denna funktion så den uppdaterar rätt todo
//i arrayen för nu lägger den bara till nya toditems
function editTodo() {
	var edit = document.getElementsByClassName('icon-span-delete-button');
	var i;
	for (i = 0; i < edit.length; i++) {
		edit[i].onclick = div_show();
	}
}

// Lagra todos
function storeCreatedTodos(todoText) {
	var todoItem = { date: storedDate, text: todoText };
	storedTodos.push(todoItem);
	//TODO: anropa funktion som rendera om kalender
	reset();
	loadCalendar(year, month);
	saveTodoToLocalStorage();
}

function saveTodoToLocalStorage() {
	var stringifyTodos = JSON.stringify(storedTodos);
	localStorage.setItem('todos', stringifyTodos);
}

function getTodoFromLocalStorage() {
	var stringifyTodos = localStorage.getItem('todos');
	storedTodos = JSON.parse(stringifyTodos);
	if (!storedTodos) {
		storedTodos = [];
	}
}

//anropas bla. från calendar.js för att hämta antal Todos / datum (yyyy-m-d)
function loadTodos(selectedDate) {
	let tempTodos = [];
	for (item of storedTodos) {
		if (item.date.valueOf() == selectedDate.valueOf()) {
			tempTodos.push(item);
		}
	}
	return tempTodos;
}
