var storedDate;
//var storedTodos = [];

function initTodo() {
	getTodoFromLocalStorage();
	initCalendarPicker();
	addEventListeners();
	//resetTodos();
	renderTodos();
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

//Removes list-item
var close = document.getElementsByClassName('close');
var i;
for (i = 0; i < close.length; i++) {
	close[i].onclick = function () {
		div.style.display = 'none';
	};
}

//adds item to list
function newElement(event) {
	event.preventDefault();
	var li = document.createElement('li');
	var inputValue = document.getElementById('myInput').value;

	//TODO: kolla att datum är valt

	if (inputValue === '') {
		alert('You must write something!');
	} else {
		// var t = document.createTextNode(inputValue); //flyttat ned
		// li.appendChild(t);// flyttat ned
		// document.getElementById('todoList').appendChild(li);

		storeCreatedTodos(inputValue); //TODO--Denna ska lagra todo-datan
		renderTodos();
	}
	document.getElementById('myInput').value = '';

	var span = document.createElement('span');
	var txt = document.createTextNode('\u{1F5D1}');
	span.className = 'close';
	span.appendChild(txt);
	li.appendChild(span);

	for (i = 0; i < close.length; i++) {
		close[i].onclick = function () {
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
function storeCreatedTodos(todoText) {
	var todoItem = { date: storedDate, text: todoText };
	storedTodos.push(todoItem);
	resetCalendar();
	loadCalendar(year, month);
	saveTodoToLocalStorage();
}

function saveTodoToLocalStorage() {
	//console.trace('Hej')
	var stringifyTodos = JSON.stringify(storedTodos);
	localStorage.setItem('todos', stringifyTodos);
}

function getTodoFromLocalStorage() {
	var stringifyTodos = localStorage.getItem('todos');
	//console.log(stringifyTodos)
	if(!stringifyTodos) {
		storedTodos = [];
	}
	else{
		storedTodos = JSON.parse(stringifyTodos);

	}
}

function renderTodos() {
	 resetTodos();
	storedTodos.forEach(todoItem => {
		var li = document.createElement('li');
		li.classList.add('todo-list-item');
		li.innerText = todoItem.text;
		document.getElementById('todoList').appendChild(li);
		//TODO: Anropa funktion för att lägga till knappar
		
	});
}

function resetTodos() {
    document
      .querySelectorAll('.todo-list-item')
      .forEach((e) => e.parentNode.removeChild(e));
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
	
