let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function displayCalendarsInMain() {
    let html = "";
    let addedDays = 0;
    let daysInWeek = days.length;
    let previousDaysInMonth = new Date(year, month, 0).getDate() + 1;
    let previousFirstDay = previousDaysInMonth - new Date(year, month, 0).getDay();
    let currentDayInMonth = new Date(year, month + 1, 0).getDate();
    let currentfirstDay = 1;
    let currentDay = new Date().getDate();
    let futureDaysInMonth = 42;

    for (i = 0; i < daysInWeek; i++) {
        html += `<div class='calendar_date calendar_day'> ${days[i]} </div>`;
    }

    for (let i = previousFirstDay; i < previousDaysInMonth; i++) {
        html += `<div class='calendar_date calendar_other'> ${i} </div>`;
        addedDays++;
    }

    for (let i = currentfirstDay; i <= currentDayInMonth; i++) {
        if (i != currentDay) {
            html += `<div class='calendar_date'> ${i} </div>`;
            addedDays++;
        }

        else {
            html += `<div class='calendar_date calendar_current'> ${i} </div>`;
            addedDays++;
        }
    }
    
    futureDaysInMonth -= addedDays;

    for (let i = 1; i <= futureDaysInMonth; i++) {
        html += `<div class='calendar_date calendar_other'> ${i} </div>`;
    }

    document.getElementById("taskList").setAttribute('class', 'task calendar');
    document.getElementById("date").innerHTML = `${months[month]} ${year}`;
    document.getElementById("taskList").innerHTML = html;
}

function goToPreviousMonth() {
    if (month <= 0) {
        month = 11; 
        year--;
    }

    else {
        month--;
    }

    displayCalendarsInMain();

    var currentDate = new Date(year, month);
    document.getElementById("date").innerHTML = `${months[month]} ${year}`;
}

function goToFollowingMonth() {
    if (month >= 11) {
        month = 0;
        year++;
    }
    
    else {
        month++;
    }
    
    displayCalendarsInMain();
    var currentDate = new Date(year, month);
    document.getElementById("date").innerHTML = `${months[month]} ${year}`;
}

function daysInMonth(year, month) {
    console.log(`${year} / ${month}`);
    return new Date(year, month, 0).getDate(); 
}