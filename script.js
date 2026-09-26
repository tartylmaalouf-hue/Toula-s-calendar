function updateCalendar() {
    const now = new Date();
    const day = now.getDate();
    const monthNames = ["january", "february", "march", "april", "may",
        "june", "july", "august", "september", "october", "november", "december"];
    
    const month = monthNames[now.getMonth()];

    document.getElementById('day').textContent = day;
    document.getElementById('month').textContent = month;

}

updateCalendar();

const calendar = document.getElementById('calendar');
function handleCalendarClick(){
    window.API.openSchedule(); // Call the exposed function from preload.js
}

calendar.addEventListener('click', handleCalendarClick);
