// declaring variables 
var html = "";
var planners = [];
var tasks = [];
var checkboxes = [];
var date = new Date();


// This is a template for the tasks added through the task input in the main section.
function Task(taskName, plannerName, dueDate, noOfSteps, description) {
    this.taskName = taskName;
    this.plannerName = plannerName;
    this.dueDate = dueDate;
    this.noOfSteps = noOfSteps;
    this.description = description;
}

// As of this version, this website is using localStorage, these functions are there to get the storage from previous uses into the current tasks / planner arrays.  
function loadPlanners() {
    var plannerStorage = JSON.parse(localStorage.plannerStorage);

    if (plannerStorage === null) {
        planners = [];
    }

    else {
        planners = plannerStorage;
    }
}

function loadTasks() {
    var taskStorage = JSON.parse(localStorage.taskStorage);

    if (taskStorage === null) {
        tasks = [];
    }

    else {
        tasks = taskStorage;
    }
}

// The function displayPlanners() is used to display a planner list with the use of D.GEBI and for loops. 
// Same follows for displayTasks() but with a task list in the main section.
// displayTaskSideBar() is shown when the user clicks on anything on the task div. When you click the task, A pop up reveals from the side and shows a space for adding details such as steps, descriptions or selected planner. 

function displayPlanners() {   
    loadPlanners();
    html = "";

    planners[0] = "";

    for (i = 1; i < planners.length; i++) {
        html += '<tr>' +
                    '<td style="width: 0.1%;">' +
                        '<input type="checkbox" id = "checkbox_' + i + '"value="' + planners[i] + '" onclick="sortTasks(this)" checked>' +
                    '</td>' +
                    '<td>' +
                        '<p>' + planners[i] + '</p>' +
                    '</td>' +
                '</tr>'

        document.getElementById("plannerSection").innerHTML = html;
    } 
}

function displayTasks() {
    document.getElementById("taskSection").innerHTML = "";
    html = "";
    loadTasks();  
    
    // html += '<div class="background merriweather-font list task-list" id="taskSection">';
        for (i = 0; i < tasks.length; i++) {
            html += '<button onclick="deleteTask(this)" id="delete' + i + '" value="radio' + i + '"> </button>'   +
                    '<p id ="' + i  + '" style="font-weight: 900;" onclick="displayTaskSideBar(this)">' + tasks[i].taskName + '<br>' +
                    '<img src="images/planner.png" style="width:15px;"> ' + tasks[i].plannerName + ' <img src="images/calendar.png" style="width:15px";> ' + tasks[i].dueDate + ' <img src="images/notes.png" style="width:15px";> ' + tasks[i].description + ' <img src="images/steps.png" style="width:15px";> ' + tasks[i].noOfSteps + '</p>'; 

            document.getElementById("taskSection").innerHTML = html;
        }
    // html += '</div>';
}

function displayTaskSideBar(idNumber) {
    var html = "";

    for (i = 0; i < tasks.length; i++) {    
        html = '<div class="task-sidebar">' +
                    '<p style="font-weight: 900; font-size: 20px;">' + tasks[idNumber.id].taskName + '</p>' +
                    '<p> <img src="images/planner.png" style="width:15px;"> Date: ' + tasks[idNumber.id].dueDate + '</p>' +
                    '<p> Description: ' + tasks[idNumber.id].description + '</p>'  +
                    '<p> Steps: ' + tasks[idNumber.id].noOfSteps + '</p>' +
                    '<p> Planner: ' + tasks[idNumber.id].plannerName + '</p>' +

                    '<input id="dateInput" type="date" class="merriweather-font input" placeholder="Due Date: ' + tasks[idNumber.id].dueDate + '">' +
                    '<input id="descriptionInput" class="merriweather-font input" placeholder="Description: ' + tasks[idNumber.id].description + '">' +
                    '<input id="stepsInput" class="merriweather-font input" placeholder="Steps: ' + tasks[idNumber.id].noOfSteps + '">' +                
                    '<select class="merriweather-font" id="select" name="asdasd"> </select>' +
                    '<button id="' + idNumber.id + '" class="merriweather-font" onclick="addTaskDetails(this)"> <p> add details </p> </button>' +
                    '<button> X </button>'
                '</div>';

        document.getElementById("taskSidebar").innerHTML = html; 
    }
    
    // This section is there to close and open the task sidebar by using the display attribute. 
    if (document.getElementById("taskSidebar").style.display === "none") {
        document.getElementById("taskSidebar").style.display = "block"; 
    } 

    else {
        document.getElementById("taskSidebar").style.display = "none"; 
    }

    html = "";
    
    for (i = 0; i < planners.length; i++) {
        html += '<option>' + planners[i] + '</option>';
        document.getElementById("select").innerHTML = html;
    }
}

// On enter, the input on the sidebar is used to enter a new planner into the system, the input's value is pushed into the array and is stored in the localStorage.
// Same for the input on the main section but with the input's value being pushed into object propety called "taskName". 
function addPlanners() {
    if (event.key == 'Enter') {
        var plannerInput = document.getElementById("plannerInput");
        planners.push(plannerInput.value);  

        localStorage.setItem('plannerStorage', JSON.stringify(planners)); 
        plannerInput.value = "";
    }

    displayPlanners(); 
}

function addTasks(content) {    
    if (event.key == 'Enter') {
        var content = document.getElementById(content);
        
        tasks.push(new Task(content.value, planners[0], "", "", ""));
        localStorage.setItem('taskStorage', JSON.stringify(tasks)); 
        
        content.value = "";
    }

    displayTasks(); 
}

// With the click of the radio button, the task is deleted from the interface and storage. 
function deleteTask(idNumber) {
    var html = "";

    tasks.splice(idNumber.id , 1);
    localStorage.setItem('taskStorage', JSON.stringify(tasks)); 
    displayTasks();
    
    document.getElementById("taskSidebar").innerHTML = html;
}

function deletePlanners(idNumber) {
    var html = "";

    planners.splice(idNumber.id , 1);
    localStorage.setItem('taskStorage', JSON.stringify(tasks)); 
    displayPlanners();
    
    document.getElementById("taskSidebar").innerHTML = html;
}

function addTaskDetails(idNumber) {
    loadTasks();

    html = "";
    var selectPlanner = document.getElementById("select");
    var dateInput = document.getElementById("dateInput");
    var stepsInput = document.getElementById("stepsInput");
    var descriptionInput = document.getElementById("descriptionInput");

    tasks[idNumber.id].dueDate = dateInput.value;
    tasks[idNumber.id].noOfSteps = stepsInput.value;
    tasks[idNumber.id].description = descriptionInput.value;
    tasks[idNumber.id].plannerName = selectPlanner.value;

    localStorage.setItem('taskStorage', JSON.stringify(tasks)); 

    displayTasks();
}

// These are here to determine the firstDay of Month and the days of the month with Date(). Still a rough version :(
function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

let count = 0;

// Shows a calendar for the current day in the sidebar. Clearly a work in progress :(
function previous(day, month, year, section, header, button) {
    count++;
    console.log(count);
    displayCalendar(day, month, year, section, header, button);
}

function next(day, month, year, section, header, button) {
    count--;

    if((day - count) == 12) {
        console.log('tragic');
    }

    console.log(count);

    displayCalendar(day, month, year, section, header, button);
}

var number = 0;

function previousTest(day, month, year, section, header, button) {
    number--;

    if((month - number) == 12) {
        number = 0;
        month = 0; 
        year = date.getFullYear()-1;
    }

    displayCalendar(day, month + number, year, section, header, button);
    
}
function nextTest(day, month, year, section, header, button) {
    number++;

    if((month + number) == 12) {
        number = 0;
        month = 0; 
        year = date.getFullYear()+1;
    }

    displayCalendar(day, month + number, year, section, header, button);
    
}

function displayCalendar(day, month, year, section, header, button) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    const daysToNewMonth = getFirstDayOfMonth(year - count, month - count);
    const daysInMonth = getDaysInMonth(year - count, month - count);
    
    var html = "";

    html = "<h2>" + months[month - count] + " " + year + '</h2>';
    document.getElementById(header).innerHTML = html;

    var html = ""; 

    for (i = 0; i < days.length; i++) {
        if (section == "sidebarCalendar") {
            html +=  "<p>" + days[i][0] + "</p>";
        }

        else {
            html +=  "<h4>" + days[i] + "</h4>";
        }
    }

    for (i = 1; i < daysToNewMonth; i++) {
        html +=  "<p> </p>";
    }

    for (i = 1; i < daysInMonth+1; i++) {
        if (i == day && count == 0) {
            html += '<p class="currentDate" onclick="addEvent(this)">' + i + '</p>';
        }

        else {
            html +=  "<p onclick='addEvent(this)'>" + i + "</p>";
        }
    }

    document.getElementById(section).innerHTML = html;
    html = "";

    html += `<button id="previous" onclick="previousTest(date.getDate(), date.getMonth(), date.getFullYear(), '${section}', '${header}', '${button}')" class="merriweather-font"> previous </button>` +
            `<button onclick="nextTest(date.getDate(), date.getMonth(), date.getFullYear(), '${section}', '${header}', '${button}')" id="next" class="merriweather-font"> next </button>`;
            // `<button onclick="next(date.getDate(), date.getMonth(), date.getFullYear(), '${section}', '${header}', '${button}')" id="next" class="merriweather-font"> next </button>`;


    document.getElementById(button).innerHTML = html;
}

// A function that when a checkbox in the sidebar section is unchecked removes tasks related to the planner that was unchecked. It is still a rough cut. 
function sortTasks(number) {
    for (i = 0; i < tasks.length; i++) {    
        if (number.checked == false) {
            if (tasks[i].plannerName == number.value) {
                document.getElementById(i).style.display = "none";
            }
        }

        else {
            document.getElementById(i).style.display = "block";
        }
    }
}

function addEvent(value){
    html = '<div class="task-sidebar">' +
                `<input id="test" class="merriweather-font input" placeholder="add a new task or else..." onkeydown="addTasks('test')">` +
                '<input id="dateInput" type="date" value="2022-08-' +   value.textContent +'" class="merriweather-font input" placeholder="Due Date: ">' +
                // '<input id="dateInput" type="date" value="2022-08-"' + value.textContent + '" class="merriweather-font input" placeholder="Due Date: ">' +
                '<input id="descriptionInput" class="merriweather-font input" placeholder="Description: ">' +
                '<input id="stepsInput" class="merriweather-font input" placeholder="Steps: ">' +                
                '<select class="merriweather-font" id="select" name="asdasd"> </select>' +
                '<button id="' + value.id + '" class="merriweather-font" onclick="addTaskDetails(this)"> <p> add details </p> </button>' +   

                '<p>' + value.textContent + '</p>' +
            '</div>';

    document.getElementById('event').innerHTML = html;
}

function swap(sectionA, sectionB) {
    var sectionA = document.getElementById(sectionA); 
    var sectionB = document.getElementById(sectionB); 

    if (sectionA.style.display == "grid") {
        sectionA.style.display = "none";
        sectionB.style.display = "grid";
    }

    else {  
        sectionB.style.display = 'none';
        sectionA.style.display = 'grid'
    }
}