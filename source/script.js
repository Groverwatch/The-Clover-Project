// GLOBAL VARIABLES
    // Defining variables that will be used in the future. 
    var html = "";
    var planners = [];
    var tasks = [];
    var checkboxes = [];
    var date = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// OBJECT CONSTRUCTOR
    // this is a template for the tasks added through the task input in the main section.
    function Task(taskName, plannerName, dueDate, description) {
        this.taskName = taskName;
        this.plannerName = plannerName;
        this.dueDate = dueDate;
        this.description = description;
    }

// LOCAL STORAGE
    // As of this version, this website is using localStorage, these functions are there to get the storage from previous uses into the current tasks / planner arrays.  
    function loadPlanners() {
        var plannerStorage = JSON.parse(localStorage.plannerStorage);

        if (plannerStorage === null) {
            planners = ['test'];
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
   
// THE PLANNER SECTION IN THE SIDEBAR.
    // The function displayPlanners() is used to display a planner list with the use of D.GEBI and for loops. 
    function displayPlanners() {   
        loadPlanners();
        html = "";

        for (i = 0; i < planners.length; i++) {
            html += `<tr>
                        <td style="width: 0.1%;">
                            <input type="checkbox" id="checkbox_${i}" value="${planners[i]}" onclick="sortTasks(this)" checked>
                        </td>
                        <td id='${i}' onclick="deletePlanners(this)">
                            <p> ${planners[i]} </p>
                        </td>
                    </tr>`;

            document.getElementById("plannerSection").innerHTML = html;
        } 
    }

    // On enter, the input on the sidebar is used to enter a new planner into the system, the input's value is pushed into the array and is stored in the localStorage.
    function addPlanners() {
        if (event.key == 'Enter') {
            var plannerInput = document.getElementById("plannerInput");
            planners.push(plannerInput.value);  
    
            localStorage.setItem('plannerStorage', JSON.stringify(planners)); 
            plannerInput.value = "";
        }
    
        displayPlanners(); 
    }

    function deletePlanners(idNumber) {
        var html = "";
    
        let deleteConfirm = confirm(`Do you want to delete the planner '${planners[idNumber.id]}'?`);

        if (deleteConfirm) {
            planners.splice(idNumber.id , 1);
        } 

        localStorage.setItem('plannerStorage', JSON.stringify(planners)); 
        displayPlanners();
        console.log(tasks); 
        
        document.getElementById("taskSidebar").innerHTML = html;
    }

// THE TASK SECTION IN THE MAIN..
    // The function displayTasks() is used to display a task list in the "main section" with the use of D.GEBI and for loops. 
    function displayTasks() {
        document.getElementById("taskSection").innerHTML = "";
        html = "";
        loadTasks();  
        
        html += `<table id="table"> `
        for (i = 0; i < tasks.length; i++) {
            html += 
                `<tr value="task${i}">
                    <td> <button id="delete${i}" value="${i}" onclick="deleteTask(this)"> </button>
                    <td id='${i}' class="show" onclick="displayTaskSideBar(this), swap('taskSidebar', 'nothing')"> <h4> ${tasks[i].taskName} </h4> <p> ${tasks[i].plannerName} | ${tasks[i].dueDate} | ${tasks[i].description} | </p> </td>
                </tr>`;
        }
        html += `</table>`;

        document.getElementById("taskSection").innerHTML = html;
    }

    // This function adds a new task by pressing the button enter, the only data that is entered into the array is the content written and an empty planner. 
    function addTasks(content) {    
        if (event.key == 'Enter') {
            var content = document.getElementById(content);
            
            tasks.push(new Task(content.value, "", "", "", ""));
            localStorage.setItem('taskStorage', JSON.stringify(tasks)); 
            
            content.value = "";
        }
    
        displayTasks(); 
    }
    
    // With the click of the button, the task is deleted from the interface and storage. 
    function deleteTask(idNumber) {
        var html = "";
    
        tasks.splice(idNumber.value , 1);
        localStorage.setItem('taskStorage', JSON.stringify(tasks)); 
        displayTasks();
        
        document.getElementById("taskSidebar").innerHTML = html;
    }

    // displayTaskSideBar() is a function that is used when the user clicks on a task name. When you click the task, A pop up reveals from the side and shows a space for adding details such as steps, descriptions or the selected planner. 
    function displayTaskSideBar(idNumber) {
        var html = "";

        html = `<div class="task-sidebar">
                    <p> Task: </p>
                    <input id="taskNameInput" class="merriweather-font input" placeholder="Write a task name."value="${tasks[idNumber.id].taskName}">

                    <p> Description: </p>
                    <input id="descriptionInput" class="merriweather-font input" placeholder="Write a description." value="${tasks[idNumber.id].description}">

                    <p> Due Date: </p>
                    <input id="dateInput" type="date" class="merriweather-font input" value="${tasks[idNumber.id].dueDate}">

                    <p> Planner: </p>
                    <select class="merriweather-font" id="select"> </select>

                    <br> 
                    <button id="add" value="${idNumber.id}" class="merriweather-font" onclick="addTaskDetails(this)"> add details </button>
                    <button id="exit" onclick="swap('nothing', 'taskSidebar')"> close </button>
                </div>`;

        document.getElementById("taskSidebar").innerHTML = html; 
        html = "";

        if (tasks[idNumber.id].plannerName == "") {
            html += `<option value="" disabled selected> Choose your planner. </option>`
        }

        else {
            html += `<option value="" disabled selected> ${tasks[idNumber.id].plannerName} </option>`
        }

        for (i = 0; i < planners.length; i++) {
            html += '<option>' + planners[i] + '</option>';
            document.getElementById("select").innerHTML = html;
        }
    }

    // after displayTaskSidebar is called, you can add details through a button that calls this function. this function overwrites the details.
    function addTaskDetails(idNumber) {
        loadTasks();

        html = "";
        var taskNameInput = document.getElementById("taskNameInput");
        var selectPlanner = document.getElementById("select");
        var dateInput = document.getElementById("dateInput");
        var descriptionInput = document.getElementById("descriptionInput");

        tasks[idNumber.value].taskName = taskNameInput.value;
        tasks[idNumber.value].dueDate = dateInput.value;
        tasks[idNumber.value].description = descriptionInput.value;
        tasks[idNumber.value].plannerName = selectPlanner.value;

        localStorage.setItem('taskStorage', JSON.stringify(tasks)); 

        displayTasks();
    }

// THE CALENDAR IN THE SIDEBAR / MAIN SECTION
    // this is here to determine the first day of  the Month and the days of the month with Date(). 
    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }

    // this is here to determine the days of the month with Date(). 
    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    // this loads the select option of the years and months through a for loop. at first it was a button but this option was way less complicated to code and more compact.
    function loadCalendarSelect() {
        var html = "";
        html += "<select id='month' onchange='next()'>";
                    for (i = 0; i < months.length; i++) {
                        if (i == date.getMonth()) {
                            html += "<option value=" + i + " selected='selected'>" + months[i] + "</option>";
                        }

                        else {
                            html += "<option value=" + i + ">" + months[i] + "</option>";
                        }
                    }    
        html += "</select>";

        html += "<select id='year' onchange='next()'>";
                for (i = 2000; i < 2050; i++) {
                    if (i == date.getFullYear()) {
                        html += "<option selected='selected'>" + i + "</option>";
                    }

                    else {
                        html += "<option>" + i + "</option>";
                    }
                }    
        html += "<select>";

        document.getElementById("mainButton").innerHTML = html;
    }

    // this function helps the select to jump to the next option chosen by the user. 
    function next() {
        currentYear = year.value;
        currentMonth = month.value;
        displayCalendar(currentMonth, currentYear, 'sidebarCalendar', 'sidebarDate');
        displayCalendar(currentMonth, currentYear, 'calendarSection', 'mainDate');
    }

    // a function that creates a calendar whenever it is called, once again for loops are used and if statements are used to determine the current date etc etc.
    function displayCalendar(month, year, section, header) {    
        const daysToNewMonth = getFirstDayOfMonth(year, month);
        const daysInMonth = getDaysInMonth(year, month);
        
        var html = "";

        html = "<h2>" + months[month] + " " + year + '</h2>';
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
            if (i == date.getDate() && date.getMonth() == month && date.getFullYear() == year) {
                html += `<p class="currentDate" value=${i} onclick="addEvent(this), swap('event', 'nothing')">${i}</p>`;
            }

            else {
                html +=  `<p value=${i} onclick='addEvent(this), swap("event", "nothing")'>${i}</p>`;
            }
        }

        document.getElementById(section).innerHTML = html;
        html = "";
    }

    // when a calendar date is clicked a sidebar pops out that helps you to try make a new task, sadly dosen't work as I wasn't efficent with time. the if statement helps with date input as it only accepts dates in a YYYY-MM-DD format. 
    function addEvent(value){
        var chosenDate;
        if (value.textContent < 10) {
            chosenDate = 0 + value.textContent;
        }

        else { 
            chosenDate = value.textContent;
        }
        // <p> ${value.textContent} </p>

        html = `<div class="task-sidebar">
                    <p> Task: </p>
                    <input id="taskNameInput" class="merriweather-font input" placeholder="Write a task name.">

                    <p> Description: </p>
                    <input id="descriptionInput" class="merriweather-font input" placeholder="Write a description.">

                    <p> Due Date: </p>
                    <input id="dateInput" type="date" class="merriweather-font input" value="2022-08-${chosenDate}">

                    <p> Planner: </p>
                    <select class="merriweather-font" id="select"> </select>

                    <br> 
                    <button id="add" value="${value.value}" class="merriweather-font" onclick="addTaskDetails(this)"> add details </button>
                    <button id="exit" onclick="swap('nothing', 'taskSidebar')"> close </button>
                </div>`;


        document.getElementById('event').innerHTML = html;
        tasks.push(new Task(taskNameInput.value, "", "", "", ""));

    }

// EXTRA FUNCTIONS
    // A function that when a checkbox in the sidebar section is unchecked removes tasks related to the planner that was unchecked. It is not finished as there was many features that was more important than this one. 
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

    // this function is used to hide hidden divs such as the calendar / task or the task sidebar. 
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