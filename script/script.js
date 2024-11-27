// VARIABLES: These variables are used for the components related to the calendar. 
const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
const days = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
var totalDaysOnCalendar = 42;  

// VARIABLES: These variables are used for determining the day of the calendar.
var displayedYear = new Date().getFullYear();
var displayedMonth = new Date().getMonth();
var displayedDate = new Date().getDate();

// VARIABLES: These variables are used for the information sidebar, so that it can be toggled between different tasks or without it.
var currentTask;
var currentPlanner; 
var currentDay;

// VARIABLES: These arrays are used to store the tasks and planners that the users have. 
var tasks = [];
var planners = [];

// CLASS: When a new task is created, the task object. is created based off the template defined by the classes' constructer.
class Task { 
    constructor (name, planner, dueDate) {
        this.name = name;
        this.planner = planner;
        this.dueDate = dueDate;
    }

    // These functions below are used to get information from the task object such as the task name, or the task's planner.  
    getName() {
        return this.name;
    }

    getDueDate() { 
        return this.dueDate;
    }
    
    getPlanner() {
        return this.planner;
    }

    getPlannerName() {
        return this.planner.getName();
    }

    getPlannerColor() {
        return this.planner.getColor();
    }

    getPlannerVisiblity() {
        return this.planner.getVisiblity();
    }

    // These functions belows are used to change the information inside the task object.
    setName(name) {
        this.name = name;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    setPlanner(planner) {
        this.planner = planner;
    }
}

// CLASS: When a planner is created, the planner object follows a blueprint through the use of a constructor. 
class Planner {
    constructor (name, color) {
        this.name = name;
        this.color = color; 
        this.visiblity = true;
    }

    // These functions below are used to get information from the planner object such as the planner's colour.  
    getName() {
        return this.name;
    }
    
    getColor() {
        return this.color;
    }
    
    getVisiblity() {
        return this.visiblity;
    }

    // These functions belows are used to change the information inside the planner object.
    setName(name) {
        this.name = name;
    }

    setColor(color) {
        this.color = color; 
    }

    setVisiblity(value) {
        this.visiblity = value;
    }
}

// LOCAL STORAGE: To store all of the tasks and planners, this website uses the localStorage API. This function loads from the localStorage and uses it for the current session.
function loadFromStorage() {
    var storedPlanners = JSON.parse(localStorage.getItem(`planners`));
    var storedTasks = JSON.parse(localStorage.getItem(`tasks`));

    // If a planner does exist in the localStorage, then the website will gather the data from the storage and recreate it for the current session,
    if (storedPlanners != undefined) {
        for (let i = 0; i < storedPlanners.length; i++) {
            let newPlanner = new Planner(storedPlanners[i].name, storedPlanners[i].color);
            planners.push(newPlanner); 
        }
    }

    // If a planner does not exist, then create a new planner. 
    else {
        let newPlanner = new Planner(`Example Planner`, `#00d5ff`);
        planners.push(newPlanner); 
    }

    // If a task does exist in the localStorage, then the website will gather the data from the storage and recreate it for the current session,
    if (storedTasks != undefined) {
        for (let i = 0; i < storedTasks.length; i++) {
            let taskName = storedTasks[i].name;
            let plannerName = storedTasks[i].planner.name;
            let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 
            let chosenDueDate =  new Date(`${storedTasks[i].dueDate}`,);
            chosenDueDate.setHours(0,0,0,0);

            let newTask = new Task(taskName, chosenPlanner, chosenDueDate);
            tasks.push(newTask); 
        }
    }

    // If a task does not exist, then create a new planner. 
    else {
        let taskName = `Example Task`;
        let chosenPlanner = planners[0];
        let chosenDueDate = new Date()
        chosenDueDate.setHours(0,0,0,0);

        let newTask = new Task(taskName, chosenPlanner, chosenDueDate);
        tasks.push(newTask); 
    }
}

// LOCAL STORAGE: When a new task or planner is added, the storage is refreshed to store the new items in the task / planner arrays. 
function refreshStorage() {
    localStorage.setItem(`planners`, JSON.stringify(planners)); 
    localStorage.setItem(`tasks`, JSON.stringify(tasks)); 
}

// INFORMATION: When a information sidebar is used, the sidebar is revealed.  
function revealInformation(container) {
    document.getElementById(container).setAttribute('class', 'main__information main__information--reveal');
}

// INFORMATION: When a information sidebar is used, the sidebar is hidden.  
function hideInformation(container) {
    document.getElementById(container).setAttribute('class', 'main__information main__information--hide');
}

// MODE: This function helps to display the mode that the user want to see.
function toggleMode() {
    let selectedMode = document.querySelector("input[name='Mode']:checked").value;
    let taskContainer = document.getElementById("taskContainer");
    let plannerContainer = document.getElementById("plannerContainer");
    let calendarContainer = document.getElementById("calendarContainer");

    if (selectedMode == 'Task') {
        displayTasksOnMain();

        document.getElementById('taskPlannerInput').innerHTML = createPlannersInSelect();
        taskContainer.setAttribute('class', 'main main--reveal')
        plannerContainer.setAttribute('class', 'main main--hide');
        calendarContainer.setAttribute('class', 'main main--hide');
    }
    
    if (selectedMode == 'Planner') {
        displayPlannersOnMain();

        taskContainer.setAttribute('class', 'main main--hide');
        plannerContainer.setAttribute('class', 'main main--reveal');
        calendarContainer.setAttribute('class', 'main main--hide');
    }

    if (selectedMode == 'Calendar') {
        displayCalendarOnMain(displayedYear, displayedMonth);

        taskContainer.setAttribute('class', 'main main--hide');
        plannerContainer.setAttribute('class', 'main main--hide');
        calendarContainer.setAttribute('class', 'main main--reveal');
    }
}

// TASKS: To add a new task, this function gets the name, chosen planner and due date to see if the task can be added. If so, then a new task is added to the tasks array.
function addTask() {
    let taskName = document.getElementById(`taskTextInput`).value.trim();
    let plannerName = document.getElementById(`taskPlannerInput`).value;
    let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 
    let chosenDueDate = document.getElementById(`taskDateInput`).valueAsDate;
    let maximumInputLength = 100;

    // If the task name does not have a name, the task won't be added. 
    if (taskName == ``) {
        alert(`Empty input, type something to add a task.`);
        return;
    }

    // If the task name's word length goes past 100 words, the task won't be added. 
    if (taskName.length > maximumInputLength) {
        alert(`The length of the task's name is too long.`);
        return;
    }

    // If the planner associated with the task does not exist, the task won't be added.
    if (chosenPlanner == undefined) {
        alert(`Can't find a planner, choose a different planner.`);
        return;
    }

    // If a due date isn't chosen, the current date will be chosen as the task's due date.
    if (chosenDueDate === null) {
        chosenDueDate = new Date();
    }

    // The task is finally added into the array after it passes all of the conditions.
    let newTask = new Task(taskName, chosenPlanner, chosenDueDate);
    tasks.push(newTask);   
    
    // The localStorage is refreshed with newest version of the tasks array. The display is updated and the storage is refreshed. 
    document.getElementById(`taskTextInput`).value = ``;
    document.getElementById(`taskPlannerInput`).value = plannerName; 
    refreshStorage();
    toggleMode();
}

// TASKS: When a user edits a task, the details are gathered and are changed using the set Methods inside the Task Class. 
function editTask(index) {
    let newName = document.getElementById(`taskInformationName`).value;
    let newDueDate = document.getElementById(`taskInformationDate`).valueAsDate;
    let newPlanner = planners.find(planner => planner.getName() == document.getElementById(`taskInformationSelect`).value); 

    // The details are changed here. 
    tasks[index].setName(newName);
    tasks[index].setDueDate(newDueDate);
    tasks[index].setPlanner(newPlanner);

    // The storage and the display is refreshed. 
    refreshStorage();
    toggleMode();
}

// TASKS: When a user deletes a task, the position of the task is determined and it is removed from the array. The change is then refreshed in the localStorage.
function deleteTask(taskPosition) {
    let plannerName = tasks[taskPosition].getPlannerName();
    let deleteAudio = new Audio('files/delete.mp3');
    deleteAudio.play();

    // The task is deleted from the tasks array.
    tasks.splice(taskPosition, 1);

    // To make sure the information display updates when deleting a task, the function is called after confirming there is a information sidebar being open.
    if (currentPlanner != ``) {
        let plannerIndex = planners.findIndex(planner => planner.getName() == plannerName); 
        displayPlannerInformation(plannerIndex);
    } 

    // To make sure the information display updates when deleting a planner, the function is called after confirming there is a information sidebar being open.
    if (currentDay != ``) {
        displayCalendarInformation(displayedYear, displayedMonth, displayedDate);
    } 

    // The display is updated and the storage is refreshed.
    refreshStorage();
    toggleMode();

    // This helps to prevent multiple events from happening when clicking the delete button. 
    event.stopPropagation();
}

// TASKS: This function loops through all of the task's information and displays it on the main section of the page. 
function displayTasksOnMain() {
    let main = document.getElementById("taskInterface");
    let content = "";

    // This section loops through all of the tasks and checks to see if the planner is toggled or not, if it is, the task will be displayed on the website. 
    for (task of tasks) {
        if (task.getPlannerVisiblity() == true) {
            content += createTaskOnMain(task);
        }
    } 

    // The content created is now placed unto the website after clearing the website's content.
    main.innerHTML = "";
    main.innerHTML = content; 
}

// TASKS: This function creates a task in a user-friendly format, the content is created and returned back to the displayTasksOnMain() function, where that function to prints the content out.
function createTaskOnMain(task) {
    let formattedDate = `${days[task.getDueDate().getDay()]}, ${task.getDueDate().getDate()} ${months[task.getDueDate().getMonth()]} ${task.getDueDate().getFullYear()}`;
    let index = tasks.indexOf(task);

    return `
        <div class="task__container" onclick="displayTaskInformation(${index})">
            <div>
                <h2 class="task__title"> ${task.getName()} </h2>

                <span class="task__subtitle">
                    <div class="task__color" style="background-color: ${task.getPlannerColor()}"> </div>
                    <p> ${task.getPlannerName()}, ${formattedDate} </p>
                </span>
            </div>

            <button class="task__button" onclick="deleteTask(${index})"> </button>
        </div>
    `;
}

// TASKS: This function creates a planner in the select option for the tasks section of the website. 
function createPlannersInSelect() {
    let content = ``;

    for (let i = 0; i < planners.length; i++) {
        content += `<option> ${planners[i].getName()} </option>`;
    }

    return content; 
}

// TASKS: This function displays an sidebar that shows the tasks information. 
function displayTaskInformation(index) {
    let task = tasks[index];

    // If the current task displayed is the same as the task that is being chosen to be displayed, the sidebar will be hidden away.
    if (currentTask == task.getName()) {
        currentTask = ``;
        hideInformation(`taskInformation`);
    }

    // If the current task is different to the task chosen to be displayed, then the sidebar will pop up with the new task information. 
    else {        
        currentTask = task.getName();
        
        // This changes the value of the input to match the tasks information such as name, date or chosen planner; 
        document.getElementById(`taskInformationName`).value = task.getName();
        document.getElementById(`taskInformationDate`).valueAsDate = task.getDueDate();
        
        // This function adds all of the planners into the select inside the information sidebar. 
        document.getElementById(`taskInformationSelect`).innerHTML = createSelectInTaskInformation(task);
        
        // The edit button is added with the current task and the sidebar is revealed to the user.
        document.getElementById(`taskEdit`).setAttribute(`onclick`, `editTask(${index})`);
        revealInformation(`taskInformation`);
    }
}

// TASKS: This function adds planner options to the select element so that users can change the planner related to the task they are editing.  
function createSelectInTaskInformation(task) {
    let content = ``;

    for (let i = 0; i < planners.length; i++) {
        if (planners[i].getName() == task.getPlannerName()) {
            content += `<option selected> ${planners[i].getName()} </option>`;
        }

        else {
            content += `<option> ${planners[i].getName()} </option>`;
        }
    }

    return content; 
}

// PLANNERS: When a user adds a new planner, the details are gathered and checked to see if its all good before creating a new planner. 
function addPlanner() {
    let plannerName = document.getElementById(`plannerTextInput`).value.trim();
    let plannerColour = document.getElementById(`plannerColorInput`).value;
    let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 
    let maximumInputLength = 100;

    // If the planner's name does not have a name, the planner won't be added. 
    if (plannerName == ``) {
        alert(`Empty input, type something to add a planner.`); 
        return;  
    }

    // If the planner's word length goes past 100 words, the planner won't be added. 
    if (plannerName.length > maximumInputLength) {
        alert(`The length of the planner's name is too long.`);
        return;
    }

    // If there is no color for the planner, the planner won't be added. 
    if (plannerColour == ``) {
        alert(`Empty input, choose a color to add a planner.`);
        return;
    }

    // If the planner is already made, then the planner won't be added. 
    if (chosenPlanner != undefined) {
        alert(`Planner already exists, try a new name.`);
        return;
    }

    // After passing all of the condition, the planner is added into the array and is set into the localStorage. 
    let newPlanner = new Planner(plannerName, plannerColour);
    planners.push(newPlanner);
    refreshStorage();

    // The planner is displayed on the website and the input is cleared. 
    document.getElementById(`plannerTextInput`).value = ``;
    displayPlannersOnSidebar();
    toggleMode();
}

// PLANNERS: When a user edits a planner, the details are gathered and are changed using the set Methods inside the Planner Class. 
function editPlanner(index) {
    let newName = document.getElementById(`plannerInformationName`).value;
    let newColor = document.getElementById(`plannerInformationColor`).value;

    // The details are changed here. 
    planners[index].setName(newName);
    planners[index].setColor(newColor);

    // The storage and the display is refreshed. 
    refreshStorage();
    toggleMode();
}

// PLANNERS: When a user toggles a planner from the sidebar, this function changes the visibility of the planner and its task based on its current visibility. 
function togglePlanner(checkbox) {
    let planner = planners[checkbox.value]; 

    // If the toggle checkbox is on, then toggle the planner to be visible. 
    if (checkbox.checked == true) {
        planner.setVisiblity(true); 
    } 

    // If the toggle checkbox is off, then toggle the planner to not be visible. 
    else {
        planner.setVisiblity(false); 
    }

    // The display is then adjusted to accomdate for the change in the planners visibility. 
    toggleMode();
}

// PLANNERS: This function deletes a planner based on the position of the task.
function deletePlanner(plannerPosition) {
    let deleteAudio = new Audio('files/delete.mp3');

    // If there is less than 0 planners after a planner is deleted, then the planner won't be deleted. 
    if (planners.length - 1 <= 0) {
        alert(`You must have at least one planner.`); 
        return;
    }

    deleteAudio.play();

    // Filters the array to only have tasks without the current planner that is being deleted.
    tasks = tasks.filter(task => !(task.getPlannerName() == planners[plannerPosition].getName())) 

    // Deletes the planners from the array. 
    planners.splice(plannerPosition, 1);

    // The display is updated and the storage is refreshed.
    refreshStorage();
    toggleMode();

    // This helps to prevent multiple events from happening when clicking the delete button. 
    event.stopPropagation();
}

// PLANNERS: This function displays all of the planners in the main section of the page.
function displayPlannersOnMain() {
    let main = document.getElementById("plannerInterface");
    let content = "";

    // This loops through the planner's informations and puts that information into content for the user to see.
    for (i = 0; i < planners.length; i++) { 
        content += createPlannerOnMain(planners[i]);
    }

    // The content is intially removed before being replaced by the new content.
    main.innerHTML = "";
    main.innerHTML = content; 
}

// PLANNERS: This function is used to create a planner container for the main section.
function createPlannerOnMain(planner) {
    let index = planners.indexOf(planner);

    return `
        <div class="planner__container" onclick="displayPlannerInformation(${index})">
            <div>
                <h2 class="planner__title"> ${planner.getName()} </h2>

                <span class="planner__subtitle">
                    <div class="planner__color" style="background-color: ${planner.getColor()}"> </div>
                    <p> ${planner.getColor().toUpperCase()} </p>
                </span>
            </div>
            
            <button class="planner__button" onclick="deletePlanner(${index})"> </button>
        </div>
    `;
}

// PLANNERS: This function displays all of the planners created by the user on the sidebar. This allows the user to interact with the planners and toggle what tasks they want to see. 
function displayPlannersOnSidebar() {
    let sidebar = document.getElementById("sidebarPlanner");
    let content = "";

    // This loops through the planner's information and presents it as content for the user experience. 
    for (let i = 0; i < planners.length; i++) { 
        content += createPlannerToggleOnSidebar(planners[i]);
    }

    // The content is cleared and then is replaced by the new content created in the previous lines. 
    sidebar.innerHTML = "";
    sidebar.innerHTML = content; 
}

// PLANNERS: This is used to create a toggle for the planners on the sidebar of the website. 
function createPlannerToggleOnSidebar(planner) {
    let index = planners.indexOf(planner);

    return `
        <label for="planner_${index}" class="planners__container">
            <input id="planner_${index}" value="${index}" onchange="togglePlanner(this)" type="checkbox" class="planners__checkbox" style="accent-color: ${planner.getColor()}" checked>
            <p class="planners__subtitle"> ${planner.getName()} </p>
        </label>
    `;
}

// PLANNERS: This function displays the planner's information in a sidebar. 
function displayPlannerInformation(index) { 
    let content = ``;

    // If the current planner displayed is the same as the planner that is being chosen to be displayed, the sidebar will be hidden away.
    if (currentPlanner == planners[index].getName()) {
        currentPlanner = ``;
        hideInformation(`plannerInformation`);
    }

    // If the current planner is different to the planner chosen to be displayed, then the sidebar will pop up with the new planner information. 
    else {  
        currentPlanner = planners[index].getName();

        // For every task, the if statement checks to see if the planners are the same, if so, the content will be created.
        for (i = 0; i < tasks.length; i++) { 
            if (tasks[i].getPlannerName() == planners[index].getName()) { 
                content += createTasksInPlannerInformation(tasks[i]);
            }
        }

        // If there is no content, then a message will appear saying there are no tasks.
        if (content == ``) {
            content += `<div class="interface__container"> There are no tasks inside this planner. :( </div>`;
        }

        // This section changes the value of the inputs to match the current task displayed.
        document.getElementById(`plannerInformationColor`).value = `${planners[index].getColor()}`;
        document.getElementById(`plannerEdit`).setAttribute(`onclick`, `editPlanner(${index})`);
        document.getElementById(`plannerInformationName`).value = planners[index].getName();
        document.getElementById('plannerInformationTasks').innerHTML = content;

        // The sidebar is revealed to the user after all of the information is set. 
        revealInformation('plannerInformation');
    }
}

// PLANNERS: This function is used for creating a task container when the planner information sidebar opens. This helps the user to see the tasks related to the planner. 
function createTasksInPlannerInformation(task) {
    let formattedDate = `Date: ${task.getDueDate().getDate()} ${months[task.getDueDate().getMonth()]} ${task.getDueDate().getFullYear()}`;
    let index = tasks.indexOf(task);

    return `
        <div class="interface__container">
            <div>
                <p> ${task.getName()} </p>
                
                <span class="interface__subtitle">
                    <p> ${formattedDate} </p>
                </span>
            </div>

            <button class="interface__button" onclick="deleteTask(${index})"> </button>
        </div>
    `;
}

// CALENDAR: This function creates a calendar on the main interface. 
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

// CALENDAR: This loops through and displays each day of the week such as 'Sunday'. 
function createDaysInWeek() {
    let content = ``;

    // This displays Monday to Saturday.
    for (let i = 1; i < days.length; i++) {
        content += `<div class='calendar__days'> ${days[i]} </div>`; 
    }

    // This displays Sunday.
    content += `<div class='calendar__days'> ${days[0]} </div>`; 

    return content;
}

// CALENDAR: This function creates the days leading up to the start of the month by looping from the first day of the calendar to the last day of the previous month.
function createDaysBeforeNewMonth(year, month) {
    let lastDayOfPreviousMonth = new Date(year, month, 0).getDate();
    let firstDayOfTheCalendar = lastDayOfPreviousMonth - new Date(year, month, 0).getDay() + 1;
    let content = ``;

    // To ensure that the previous month is correct, the month and year would be decreased when the previous month's number is below or equal to -1'
    if (month - 1 <= -1) {
        month = 11;
        year--; 
    }

    // If the previous month's number is higher than -1, than the month will be decremented. 
    else {
        month--;
    }

    // This part creates dates from the first day of the calendar to the last day of the previous week. 
    for (let day = firstDayOfTheCalendar; day <= lastDayOfPreviousMonth; day++) {
        content += `<div class='calendar__other' onclick='displayCalendarInformation(${year}, ${month}, ${day})'> ${day} ${createTasksForDate(year, month, day)} </div>`;
        totalDaysOnCalendar--;
    }

    return content;
}

// CALENDAR: This section gets the amount of days in a month and loops through each day to display them on the calendar.
function createDaysForNewMonth(year, month) {
    let content = ``;
    let currentAmountOfDays = new Date(year, month + 1, 0).getDate();
    let currentDate = new Date();

    // This creates dates from the first day of the month to last day of the month.
    for (let day = 1; day <= currentAmountOfDays; day++) {
        // This if statement checks if the date being created is matching to the current year, month and day. If it is, the styling would change for this date.
        if (day == currentDate.getDate() && month == currentDate.getMonth() && year == currentDate.getFullYear()) {
            content += `<div class='calendar__current' onclick='displayCalendarInformation(${year}, ${month}, ${day})'> ${day} ${createTasksForDate(year, month, day)} </div>`
        }

        // If this is not the case, then the styling would be normal for the date. 
        else {
            content += `<div class='calendar__date' onclick='displayCalendarInformation(${year}, ${month}, ${day})'> ${day} ${createTasksForDate(year, month, day)} </div>`
        }

        totalDaysOnCalendar--;
    }

    return content;
}

// CALENDAR: This function creates the days after the month is finished. 
function createDaysAfterNewMonth(year, month) {
    let content = ``;

    // This ensures that the next month is correct when entering a new year. 
    if (month + 1 >= 11) {
        month = 0;
        year++; 
    }

    // This makes the month be ahead by one more month. 
    else {
        month++;
    }
    
    // Creates days from the 1st to the last day on the calendar.
    for (let day = 1; day <= totalDaysOnCalendar; day++) {
        content += `<div class='calendar__other' onclick='displayCalendarInformation(${year}, ${month}, ${day})'> ${day} ${createTasksForDate(year, month, day)} </div>`
    }

    return content;
}

// CALENDAR: This function is used to creates tasks that are related to the date being displayed on the information sidebar.   
function createTasksForDate(year, month, day) {
    let currentDate = new Date(year, month, day, 0, 0, 0);
    let revealedTasks = 0;
    let hiddenTasks = 0;
    let content = ``;

    content += `<div class="calendar__task">`;

    // For each task, the date of the task is checked to see if it matches the date being displayed on the information. If it is, then the tasks will be created. 
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].getDueDate().toDateString() == currentDate.toDateString()) {
            revealedTasks++;

            // This is for aesthetic purposes to make sure that not more than 2 tasks exist so that the calendar container dosen't overflow. 
            if (revealedTasks <= 2) {
                content += `<div class="calendar__name" style="background-color: ${tasks[i].getPlannerColor()}"> ${tasks[i].getName()} </div>`;
            }

            else {
                hiddenTasks++; 
            }
        }
    }

    // This is used to show how much more tasks there are in the date. 
    if (revealedTasks > 2) {
        content += `<div class="calendar__name"> ${hiddenTasks} more tasks. </div>`;
    }

    content += `</div>`;

    return content; 
}

// CALENDAR: This functions displays the day's information
function displayCalendarInformation(year, month, day) {
    let content = '';
    let date = new Date(year, month, day);
    let formattedDate = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

    // If the current day displayed is the same as the day that is being chosen to be displayed, the sidebar will be hidden away.
    if (currentDay == day) {
        currentDay = '';
        hideInformation('calendarInformation');
    }

    // If the current day is different to the day chosen to be displayed, then the sidebar will pop up with the new day information. 
    else {
        currentDay = day;

        // This sections loops through each task and make sure they are the same date so that they can be displayed later.
        for (let i = 0; i < tasks.length; i++) {            
            if (tasks[i].getDueDate().toDateString() == date.toDateString()) {
                content += createTaskInCalendarInformation(tasks[i]);
            }
        }

        // If there is no content, then a message will appear saying there are no tasks related to the date.
        if (content == '') {
            content += `<div class="interface__container"> There are no tasks related to this date. :( </div>`;
        }

        // The date and the content are displayed within the information sidebar. 
        document.getElementById('calendarInformationDate').innerHTML = `${formattedDate}`; 
        document.getElementById('calendarInformationTasks').innerHTML = content;
        revealInformation('calendarInformation');
    }
}

// This function creates a container that holds tasks inside the calendar information sidebar.
function createTaskInCalendarInformation(task) {
    let index = tasks.indexOf(task);

    return `
        <div class="interface__container">
            <div>
                <p> ${task.getName()} </p>

                <span class="interface__subtitle">
                    <div class="interface__color" style="background-color: ${task.getPlannerColor()}"> </div>
                    <p> ${task.getPlannerName()} </p>
                </span>
            </div>

            <button class="interface__button" onclick="deleteTask(${index})"> </button>
        </div>
    `;
}

// CALENDAR: This function makes the calendar go back to the previous month.
function goToPreviousMonth() {
    // If the displayed month is less than or equal to 0, change the month and year to the month before the new year. 
    if (displayedMonth <= 0) {
        displayedMonth = 11; 
        displayedYear--;
    }

    // If the displayed month is greater than 0, decrease the month. 
    else {
        displayedMonth--;
    }

    displayCalendarOnMain(displayedYear, displayedMonth);
}

// CALENDAR: This function makes the calendar go towards to the following month.
function goToFollowingMonth() {
    // If the displayed month is greater than or equal to 11, change the month and year to the month after the new year. 
    if (displayedMonth >= 11) {
        displayedMonth = 0;
        displayedYear++;
    }
    
    // If the displayed month is less than 11, decrease the month. 
    else {
        displayedMonth++;
    }

    displayCalendarOnMain(displayedYear, displayedMonth);
}

// INPUTS: This section is used to enter or add new tasks / planner in the website.
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

loadFromStorage();
displayPlannersOnSidebar();
toggleMode();