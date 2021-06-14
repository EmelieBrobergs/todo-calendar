window.addEventListener('load', todo, newElement);

function todo() {
	$('#standard_calendar').calendar();
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
function newElement() {
	var li = document.createElement('li');
	var inputValue = document.getElementById('myInput').value;
	var t = document.createTextNode(inputValue);
	li.appendChild(t);

	if (inputValue === '') {
		alert('You must write something!');
	} else {
		document.getElementById('todoList').appendChild(li);
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
