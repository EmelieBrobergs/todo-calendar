var storeDate;
var storedTodos = [];

function initTodo() {
	initCalendarPicker();
	addEventListeners();
}

function addEventListeners() {
	var createTodoButton = document.getElementById('submit');
	createTodoButton.addEventListener('click', newElement);
}

function initCalendarPicker() {
	// Calendar picker: Format date and store date info in Todo
	$('#date_calendar').calendar({
	monthFirst: false,
	type: 'date',
	formatter: {
		date: function (date, settings) {
		if (!date) return '';
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		storeDate = year + '-' + month + '-' + day;
		return storeDate;
		}
	}
	});
}
//Function To Display Popup
function div_show() {
	document.getElementById('abc').style.display = 'block';
}
//Function to Hide Popup
function div_hide() {
	document.getElementById('abc').style.display = 'none';
}

//Removes list-item
var close = document.getElementsByClassName('close');
var i;
for (i = 0; i < close.length; i++) {
	close[i].onclick = function() {
		div.style.display = 'none';
	};
}

//adds item to list
function newElement(event) {
	event.preventDefault();
	var li = document.createElement('li');
	var inputValue = document.getElementById('myInput').value;
	
	if (inputValue === '') {
		alert('You must write something!');
	} else {
		var t = document.createTextNode(inputValue);
		li.appendChild(t);
		document.getElementById('todoList').appendChild(li);
		storeCreatedTodos(storeDate, t); //TODO--Denna ska lagra todo-datan
	}
	document.getElementById('myInput').value = '';

	var span = document.createElement('span');
	var txt = document.createTextNode('\u{1F5D1}');
	span.className = 'close';
	span.appendChild(txt);
	li.appendChild(span);

	for (i = 0; i < close.length; i++) {
		close[i].onclick = function() {
			var div = this.parentElement;
			div.style.display = 'none';
		};
	}

	var span2 = document.createElement('span');
	var txt2 = document.createTextNode('\u{1F58B}');
	span.className = 'edit';
	span2.appendChild(txt2);
	li.appendChild(span2);
}

// Lagra todos
function storeCreatedTodos(storeDate, todoText) {
	var todoItem = {date: storeDate, text: todoText};
	storedTodos.push(todoItem);
	//TODO rendera om kalender
	console.log(storedTodos);
}

//anropas bla. från calendar.js för att hämta antal Todos / datum
function loadTodos(selectedDate) {
	let tempTodos = [];
	for (item of storedTodos) {
		if (item.date == selectedDate) {
			tempTodos.push(item);
		}
	}
	return tempTodos;
}
