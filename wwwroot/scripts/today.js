
const now = new Date();

function initToday() {
	loadTodayInfo();
}

function loadTodayInfo() {
	const dateInfo = getDateInfo(now);
	
	const monthH5 = document.getElementById('date-string');
	monthH5.innerText = dateInfo.dateString;
	
	setInterval(function(){
        renderClock();
    },60000);
	renderClock()
	
	const weekdayH5 = document.getElementById('weekday-name');
	weekdayH5.innerText = dateInfo.weekdayName;
}

/**
 * Return formated info from a date object
 * @param {Date} date
 * @returns {DateInfo}
 */
function getDateInfo(date) {
	const dateString  = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate()//getMonthString(date);
	const weekdayName = getWeekdayString(date);

	return { dateString, weekdayName };
}

/**
 * Return the weekday for a given date in swedish
 * @param {Date} date
 * @returns {String}
 */
function getWeekdayString(date) {
	const weekdayIndex = date.getDay();
	switch (weekdayIndex) {
		case 0:
			return 'Söndag';
		case 1:
			return 'Måndag';
		case 2:
			return 'Tisdag';
		case 3:
			return 'Onsdag';
		case 4:
			return 'Torsdag';
		case 5:
			return 'Fredag';
		case 6:
			return 'Lördag';
	}
}

function renderClock() {
	let time = (new Date()).toString().match(/(\d\d:\d\d)/);
	const timeH5 = document.getElementById('time-stamp');
	timeH5.innerText = time[0];
}

//TODO: Plaering av denna? 
/** @typedef { { dateString: String, weekdayName: String, timeStamp: String } } DateInfo */
