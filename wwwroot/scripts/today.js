
const now = new Date();

function today() {
	const dateInfo = getDateInfo(now);
	const aside = document.querySelector('.welcome-container');

	const monthH5 = document.getElementById('date-string');
	monthH5.innerText = dateInfo.dateString;
	
	const timeH5 = document.getElementById('time-stamp');
	timeH5.innerText = dateInfo.timeStamp;

	const weekdayH5 = document.getElementById('weekday-name');
	weekdayH5.innerText = dateInfo.weekdayName;

	// const timeP = document.createElement('p');
	// timeP.innerText = dateInfo.timeStamp;
	// aside.append(timeP);
}

/**
 * Return formated info from a date object
 * @param {Date} date
 * @returns {DateInfo}
 */
function getDateInfo(date) {
	const dateString  = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate()//getMonthString(date);
	const weekdayName = getWeekdayString(date);
	const timeStamp = now.getHours() + ':' + now.getMinutes();

	return { dateString, weekdayName, timeStamp };
}

/**
 * Return the month for a given date in the specified language
 * @param {Date} date
 * @param {String} language
 * @returns {String}
 */
function getMonthString(date, language) { //döp om funktionen "getMonthName"
	// TODO: Use languange...
	const monthIndex = date.getMonth();
	switch (monthIndex) {
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

/** @typedef { { dateString: String, weekdayName: String, timeStamp: String } } DateInfo */
