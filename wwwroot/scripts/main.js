window.addEventListener('load', main);

async function main () {
    initTodo();
    await initCalendar();
    initToday();
}
