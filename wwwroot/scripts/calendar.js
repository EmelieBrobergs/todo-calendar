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
//         röddag, (OBS denna har mellanslag ?)
//         vecka,
//         dagivecka,
//         namnsdag [],
//         flaggdag,
//         helgdag,
//         dagförearbetsfrihelgdag,
//     }
// };


window.addEventListener('load', calendar);

var date = new Date();
var month = getMonthString(date);
var year = date.getUTCFullYear();
var gridElement;


function calendar() {
    callAPI(year, month);
}

function selectedMonth() {
    //TODO: 
}

//Select month and reload calendar in Aside-meny
function nextMonth() {
    if (month === 12) {
        month = 0;
        year++;
    }
    month++;
    reset();    
    callAPI(year, month);
}

function prevMonth() {
    if (month === 1) {
        month = 12;
        year--;
    }
    month--;
    reset();
    callAPI(year, month);
}

function reset() {
    document
      .querySelectorAll(".date")
      .forEach((e) => e.parentNode.removeChild(e));
}

async function callAPI (year, month) { 
    
    var response = await fetch('https://sholiday.faboul.se/dagar/v2.1/' + year + '/' + month, {
        method: 'GET'
    });
    var jsonData = await response.json();
    let firstDay = true;

    gridElement = document.getElementById('grid');
    //loop through all dates of the requested month
    for (var item of jsonData.dagar) {
        //places the first day of the month on the correct day of the week by adding empty div
        if (firstDay) {
            createSpace(parseInt(item['dag i vecka']))
            firstDay = false;
        }

        //creates the date div-box and adding elements: reddday, date, holieday
        let div = document.createElement('div');
        div.classList.add('grid-item');
        div.classList.add('date');
        var p = document.createElement('p');
        if (item['röd dag'] === 'Ja')
        {
            div.classList.add('holiday-color');
        }

        div.classList.add('date');
        p.innerText = item.datum.slice(-2);
        div.append(p);

        if (item.helgdag)
        {
            var holiday = document.createElement('p');
            holiday.innerText = item.helgdag;
            div.append(holiday);
        }

        //adding div to grid
        gridElement.append(div); 

        //Calculate the startpoint for the first day of the month 
        function createSpace(dayOfWeek) {  
            for (let index = 0; index < (dayOfWeek - 1); index++) {
                var emptyDiv = document.createElement('div');
                emptyDiv.classList.add('date');
                gridElement.append(emptyDiv);    
            }
        }
    } 
}

//month format for api call
function getMonthString(date) {
    const monthIndex = date.getMonth();
    switch (monthIndex) {
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
