// NOTE: Responseformat from API used in code (https://sholiday.faboul.se/dagar/v2.1/)
// var response = {
//     cachetid,
//     version,
//     uri,
//     startdatum,
//     slutdatum,
//     dagar: {
//         datum,
//         veckodag,
//         arbetsfridag,
//         röddag,
//         vecka,
//         dagivecka,
//         namnsdag [],
//         flaggdag,
//         helgdag,
//         dagförearbetsfrihelgdag,
//     }
// };

const todos = []

var date = new Date();
var month = date.getMonth();
var year = date.getUTCFullYear();
var day = date.getDay();
var gridElement;
var jsonDataFromApiSholiday;


async function initCalendar() {
    await callApiSholiday();
    loadCalendar();
    setSelectedMonthYear();
}

async function callApiSholiday() {
    var apiResponse = await fetch('https://sholiday.faboul.se/dagar/v2.1/' + year + '/' + getMonthIndexAsString(), {
        method: 'GET'
    });
    jsonDataFromApiSholiday = await apiResponse.json();
}

function loadCalendar() { 
    resetCalendar();
    let daysOfMonth = createDateArrayOfMonth();

    let firstDay = true;
    gridElement = document.getElementById('grid');
    //loop through all dates of the requested month
    for (var day of daysOfMonth) {
        //places the first day of the month on the correct day of the week by adding empty div
        if (firstDay) {
            appendCreatedEmptyDivTag(day.getDay());
            firstDay = false;
        }

        //create div and adding elements
        var div = document.createElement('div');
        div.classList.add('grid-item');
        div.classList.add('calendar-item'); //revised name off css-tag 'date'

        //redday
        if (jsonDataFromApiSholiday.dagar[daysOfMonth.indexOf(day)]['röd dag'] === 'Ja')
        {
            div.classList.add('holiday-color');
        }
        
        //date of day
        var p = document.createElement('p');
        p.innerText = day.getDate();
        div.append(p);
        
        //add holiday text
        if (jsonDataFromApiSholiday.dagar[daysOfMonth.indexOf(day)].helgdag) {
            div.append(createHolidayPtag(jsonDataFromApiSholiday.dagar[daysOfMonth.indexOf(day)].helgdag));
        }

        //add todo number
        let countedTodos = countTodosForOneDay(day);
        if (countedTodos) {
            div.append(createCountedTodosPtag(countedTodos));
        }

        //adding div to grid
        gridElement.append(div); 
    } 
}

function resetCalendar() {
    document
      .querySelectorAll(".calendar-item")
      .forEach((e) => e.parentNode.removeChild(e));
}

//month number: 0-11
function nextMonth() {
    if (month === 11) {
        month = -1;
        year++;
    }
    month++;
    initCalendar();
}

function prevMonth() {
    if (month === 0) {
        month = 12;
        year--;
    }
    month--;
    initCalendar();
}

/**
 * 
 * @returns {Date[]}
 */
function createDateArrayOfMonth() {
    let fisrtDayOfMonth = new Date(year, month, 1);
    let lastDayOfMonth = new Date(year, month + 1, 0);
    let daysOfMonth = [];
    for (var d = fisrtDayOfMonth; d <= lastDayOfMonth; d.setDate(d.getDate() + 1)) {
        daysOfMonth.push(new Date(d))        
    }
    return daysOfMonth;
}


/**
 * Calculate the startpoint for the first day of the month 
 * @param {Number} dayOfWeek 
 */
function appendCreatedEmptyDivTag(dayOfWeek) {  
    if (dayOfWeek === 0) dayOfWeek = 7;
    for (let index = 0; index < (dayOfWeek - 1); index++) {
        var emptyDiv = document.createElement('div');
        emptyDiv.classList.add('calendar-item');
        gridElement.append(emptyDiv);    
    }
}

/**
 * 
 * @param {Number} countedTodos 
 * @returns {HTMLParagraphElement}
 */
function createCountedTodosPtag(countedTodos) {
    var todos = document.createElement('p');
    todos.classList.add('todo-number');
    todos.innerText = countedTodos;
    return todos;
}

/**
 * 
 * @param {Text} helgdag 
 * @returns {HTMLParagraphElement}
 */
function createHolidayPtag(helgdag) {
    var holiday = document.createElement('p');
    holiday.innerText = helgdag;
    return holiday;
}

/**
 * 
 * @param {Date} inputDate 
 * @returns {Number}
 */
function countTodosForOneDay(inputDate) {
    let countedTodos = loadTodos(inputDate);
    return countedTodos.length;
}

/**
 * Format month corret for API call
 * @returns {Text}
 */
function getMonthIndexAsString() {
    switch (month) {
        case 0: return '01';
        case 1: return '02';
        case 2: return '03';
        case 3: return '04';
        case 4: return '05';
        case 5: return '06';
        case 6: return '07';
        case 7: return '08';
        case 8: return '09';
        case 9: return '10';
        case 10: return '11';
        case 11: return '12';
    }
}


function setSelectedMonthYear() {
    let yearTag = document.getElementById('year');
    yearTag.innerText = year;

    let monthNameTag = document.getElementById('month-name');
    monthNameTag.innerText = getMonthName();
}

/**
 * 
 * @returns {Text}
 */
function getMonthName() {
	switch (month) {
		case 0:
			return 'Januari';
		case 1:
			return 'Februari';
		case 2:
			return 'Mars';
		case 3:
			return 'April';
		case 4:
			return 'Maj';
		case 5:
			return 'Juni';
		case 6:
			return 'Juli';
		case 7:
			return 'Augusti';
		case 8:
			return 'September';
		case 9:
			return 'Oktober';
		case 10:
			return 'November';
		case 11:
			return 'December';
	}
}
