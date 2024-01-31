let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

function displayCalendarOnMain() {
    let main = document.getElementById("calendarInterface");
    document.getElementById("calendarInterface").innerHTML = "";    
    let content = "";

    let addedDays = 0;
    let previousDaysInMonth = new Date(year, month, 0).getDate() + 1;
    let previousFirstDay = previousDaysInMonth - new Date(year, month, 0).getDay();
    let currentDayInMonth = new Date(year, month + 1, 0).getDate();
    let currentfirstDay = 1;
    let currentDay = new Date();
    let futureDaysInMonth = 42;

    for (let i = 0; i < days.length; i++) {
        content += `<div class="calendar__days"> ${days[i]} </div>`;
    }

    for (let i = previousFirstDay; i < previousDaysInMonth; i++) {
        content += `<div class='calendar__other'> ${i} </div>`;
        addedDays++;
    }

    for (let i = currentfirstDay; i <= currentDayInMonth; i++) {
        let currentDate = new Date(year, month, i);

        if (i == currentDay.getDate() && month == currentDay.getMonth() && year == currentDay.getFullYear()) {
            content += `<div class='calendar__current'> ${i} ${displayTasksinCalendar(currentDate)}</div>`;
            addedDays++;
        }

        else {
            content += `<div class='calendar__date'> ${i} ${displayTasksinCalendar(currentDate)} </div>`;
            addedDays++;   
        }
    }
    
    futureDaysInMonth -= addedDays;

    for (let i = 1; i <= futureDaysInMonth; i++) {
        content += `<div class='calendar__other'> ${i} </div>`;
    }

    main.innerHTML = content;
    document.getElementById("plannerDayText").innerHTML = `${months[month]} ${year}`;
}

function displayTasksinCalendar(date) { 
    let content = "";
    content += "<div class='calendar__task'>"

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].getDueDate().toString() == date.toString()) {
            content += `<div class="calendar__name" style="background-color: ${tasks[i].getPlannerColor()}"> ${tasks[i].getName()} </div>`
        }
    }

    content += "</div>"

    return content; 
}

function goToPreviousMonth() {
    if (month <= 0) {
        month = 11; 
        year--;
    }

    else {
        month--;
    }

    displayCalendarOnMain();

    document.getElementById("plannerDayText").innerHTML = `${months[month]} ${year}`;
}

function goToFollowingMonth() {
    if (month >= 11) {
        month = 0;
        year++;
    }
    
    else {
        month++;
    }
    
    displayCalendarOnMain();
    document.getElementById("plannerDayText").innerHTML = `${months[month]} ${year}`;
}