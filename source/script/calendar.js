window.addEventListener("load", function() {
    let taskTextInput = document.getElementById("taskTextInput");
    let taskButtonAdd = document.getElementById("taskAddInput");
    let plannerTextInput = document.getElementById("plannerTextInput");
    let plannerButtonAdd = document.getElementById("plannerAddInput");

    taskTextInput.addEventListener("keydown", function(event) {
        if (event.key == "Enter") { 
            addTask();
            toggleMode();
        }
    }); 

    taskButtonAdd.addEventListener("click", function() {
        addTask();
        toggleMode();
    }); 

    plannerTextInput.addEventListener("keydown", function(event) {
        if (event.key == "Enter") { 
            addPlanner();
            toggleMode();
        }
    }); 

    plannerButtonAdd.addEventListener("click", function() {
        addPlanner();
        toggleMode();
    }); 
});

function toggleMode() {
    let selectedMode = document.querySelector("input[name='Mode']:checked").value;

    let taskContainer = document.getElementById("taskContainer");
    let plannerContainer = document.getElementById("plannerContainer");
    let calendarContainer = document.getElementById("calendarContainer");

    if (selectedMode == 'Task') {
        taskContainer.setAttribute('class', 'main main--reveal')
        plannerContainer.setAttribute('class', 'main main--hide');
        calendarContainer.setAttribute('class', 'main main--hide');
        
        displayTasksOnMain();
    }
    
    if (selectedMode == 'Planner') {
        taskContainer.setAttribute('class', 'main main--hide');
        plannerContainer.setAttribute('class', 'main main--reveal');
        calendarContainer.setAttribute('class', 'main main--hide');

        displayPlannersOnMain();
        displayPlannersOnSidebar();
    }

    if (selectedMode == 'Calendar') {
        displayCalendarOnMain(displayedYear, displayedMonth);
        taskContainer.setAttribute('class', 'main main--hide');
        plannerContainer.setAttribute('class', 'main main--hide');
        calendarContainer.setAttribute('class', 'main main--reveal');
    }
}

let date = new Date();
var displayedYear = date.getFullYear();
var displayedMonth = date.getMonth();
var displayedDate = date.getDate();

var totalDaysOnCalendar = 42;  

// This function creates a calendar on the main interface. 
function displayCalendarOnMain(year, month) {
    let content = ``;
    totalDaysOnCalendar = 42; 

    // This function creates the days in the week such as 'Monday'.
    content = createDaysInWeek();

    // This function creates the days leading up to the new month. 
    content += createDaysBeforeNewMonth(year, month);

    // This function creates the days in the month.
    content += createDaysForNewMonth(year, month);
    
    // This function creates the days after the month. 
    content += createDaysAfterNewMonth(year, month);

    // This code changes the text of the input and title to match the current date that is displayed on the calendar. 
    document.getElementById("calendarTitle").innerHTML = `Calendar - ${months[month]} ${year}`;

    // This part clears the calendar interface so that new information can be placed on the interface. 
    document.getElementById("calendarInterface").innerHTML = ``;
    document.getElementById("calendarInterface").innerHTML = content;
}

// This loops through and displays each day of the week such as 'Sunday'. 
function createDaysInWeek() {
    let content = ``;

    for (let day of days) { 
        content += `<div class='calendar__days'> ${day} </div>`; 
    }

    return content;
}

// This function creates the days leading up to the start of the month by looping from the first day of the calendar to the last day of the previous month.
function createDaysBeforeNewMonth(year, month) {
    let content = ``;
    let lastDayOfPreviousMonth = new Date(year, month, 0).getDate();
    let firstDayOfTheCalendar = lastDayOfPreviousMonth - new Date(year, month, 0).getDay() + 1;
    
    if (month - 1 == -1) {
        month = 11;
        year--; 
    }

    else {
        month--;
    }

    for (let day = firstDayOfTheCalendar; day <= lastDayOfPreviousMonth; day++) {
        content += `<div class='calendar__other' onclick='displayCalendarInformation(${year}, ${month}, ${day})'onclick='displayCalendarInformation(${year}, ${month}, ${day})'> ${day} ${showTasksOnDate(year, month, day)} </div>`;
        totalDaysOnCalendar--;
    }

    return content;
}

// This section gets the amount of days in a month and loops through each day to display them on the calendar.
function createDaysForNewMonth(year, month) {
    let content = ``;
    let currentAmountOfDays = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= currentAmountOfDays; day++) {
        if (day == displayedDate && month == displayedMonth && year == displayedYear) {
            content += `<div class='calendar__current' onclick='displayCalendarInformation(${year}, ${month}, ${day})'> ${day} ${showTasksOnDate(year, month, day)} </div>`
        }

        else {
            content += `<div class='calendar__date' onclick='displayCalendarInformation(${year}, ${month}, ${day})'> ${day} ${showTasksOnDate(year, month, day)} </div>`
        }

        totalDaysOnCalendar--;
    }

    return content;
}

function createDaysAfterNewMonth(year, month) {
    let content = ``;

    if (month + 1 >= 12) {
        month = 0;
        year++; 
    }

    else {
        month++;
    }

    for (let day = 1; day <= totalDaysOnCalendar; day++) {
        content += `<div class='calendar__other' onclick='displayCalendarInformation(${year}, ${month}, ${day})'> ${day} ${showTasksOnDate(year, month, day)} </div>`
    }

    return content;
}

function showTasksOnDate(year, month, day) {
    let content = ``;
    let currentDate = new Date(year, month, day, 0, 0, 0);
    let revealedTasks = 0;
    let hiddenTasks = 0;

    content += `<div class="calendar__task">`;

    for (let i = 0; i < tasks.length; i++) {
        let taskDueDate = tasks[i].getDueDate(); 

        if (taskDueDate.toDateString() == currentDate.toDateString()) {
            revealedTasks++;

            if (revealedTasks <= 2) {
                content += `<div class="calendar__name" style="background-color: ${tasks[i].getPlannerColor()}"> ${tasks[i].getName()} </div>`;
            }

            else {
                hiddenTasks++; 
            }
        }
    }

    if (revealedTasks > 2) {
        content += `<div class="calendar__name"> ${hiddenTasks} more tasks. </div>`;
    }

    content += `</div>`;

    return content; 
}

function goToPreviousMonth() {
    if (displayedMonth <= 0) {
        displayedMonth = 11; 
        displayedYear--;
    }

    else {
        displayedMonth--;
    }

    displayCalendarOnMain(displayedYear, displayedMonth);
}

function goToFollowingMonth() {
    if (displayedMonth >= 11) {
        displayedMonth = 0;
        displayedYear++;
    }
    
    else {
        displayedMonth++;
    }

    displayCalendarOnMain(displayedYear, displayedMonth);
}

var currentDay;

// function displayCalendarInformation(year, month, day) {
//     let content = '';

//     if (currentDay == day) {
//         currentDay = '';
//         hideInformation('calendarInformation');
//     }

//     else {

//         currentDay = day;
//         revealInformation('calendarInformation');

//         for (let i = 0; i < tasks.length; i++) {
//             let currentDate = new Date(year, month, day, 0, 0, 0);
//             let taskDueDate = tasks[i].getDueDate(); 

//             if (taskDueDate.toDateString() == currentDate.toDateString()) {
//                 content += createTaskDisplay(i);
//             }    
//         }

//         document.getElementById('calendarInformation').innerHTML = '';
//         document.getElementById('calendarInformation').innerHTML = content;
//     }
// }

function revealInformation(container) {
    document.getElementById(container).setAttribute('class', 'main__information main__information--reveal');
}

function hideInformation(container) {
    document.getElementById(container).setAttribute('class', 'main__information main__information--hide');
}

toggleMode();