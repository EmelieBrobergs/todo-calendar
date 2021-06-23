window.addEventListener('load', main);

async function main () {
    // load todos from local storage()

    // initialize allt
    initTodo();
    await initCalendar();
    initToday();
}
