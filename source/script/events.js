window.onload = function()
{
    if (planners.length == 0) {
        planners.push(new Planner("General", "#7EA16B"));    
        refreshStorage();
    }

    displayPlannersInSidebar();
    toggleMode();
}

window.addEventListener("load", function() {
    let textInput = document.getElementById("textInput");
    let buttonAdd = document.getElementById("buttonAdd");

    textInput.addEventListener("keydown", function(event) {
        selectedMode = document.querySelector("input[name='Mode']:checked").value;

        if (event.key == "Enter") { 
            if (selectedMode == "Task") {
                addTask();
            }

            else if (selectedMode == "Planner") {
                addPlanner();
            }
        }
    }); 

    buttonAdd.addEventListener("click", function() {
        if (selectedMode == "Task") {
            addTask();
        }
    
        else if (selectedMode == "Planner") {
            addPlanner();
        }
    }); 
});

function displayTasksInMain() {
    document.getElementById("title").innerHTML = "Task List";
    document.getElementById("taskList").innerHTML = "";
    document.getElementById("taskList").setAttribute('class', 'task');

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].getPlannerVisiblity() == true) {
            let container = document.createElement('aside'); 
            let section = document.createElement('div'); 
            let title = document.createElement('h3');
            let subtitle = document.createElement('span');
            let color = document.createElement('div'); 
            let button = document.createElement('input');
        
            title.append(tasks[i].getName());
            subtitle.append(color, tasks[i].getPlannerName());
            section.append(title, subtitle);
            container.append(section, button);

            container.setAttribute('class', 'task_container flex');
            subtitle.setAttribute('class', 'task_subtitle');
            color.setAttribute('class', 'task_colour');
            button.setAttribute('class', 'task_button button');
            color.setAttribute('style', `background-color: ${tasks[i].getPlannerColor()}`);

            button.setAttribute('type', 'button');
            button.setAttribute('id', i);
            button.setAttribute('onclick', `deleteTask(${i})`);
            
            document.getElementById("taskList").appendChild(container);
        }
    }
}

function displayPlannersInMain() {
    document.getElementById("title").innerHTML = "Planner List";
    document.getElementById("taskList").innerHTML = "";
    document.getElementById("taskList").setAttribute('class', 'task');

    for (let i = 0; i < planners.length; i++) {
        let container = document.createElement('aside'); 
        let section = document.createElement('div'); 
        let title = document.createElement('h3');
        let subtitle = document.createElement('span');
        let color = document.createElement('div'); 
        let button = document.createElement('input');
    
        title.append(planners[i].getName());
        subtitle.append(color, `Planner ${i+1}, `, planners[i].getColor().toUpperCase());
        section.append(title, subtitle);
        container.append(section, button);

        container.setAttribute('class', 'task_container flex');
        subtitle.setAttribute('class', 'task_subtitle');
        color.setAttribute('class', 'task_colour');
        button.setAttribute('class', 'task_button button');
        color.setAttribute('style', `background-color: ${planners[i].getColor()}`);
        button.setAttribute('type', 'button');
        button.setAttribute('id', i);
        button.setAttribute('onclick', `deletePlanner(${i})`);
        
        document.getElementById("taskList").appendChild(container);
    }
}

function displayPlannersInSidebar() {
    document.getElementById("plannerList").innerHTML = "";
    
    for (let i = 0; i < planners.length; i++) {
        let container = document.createElement('aside'); 
        let checkbox = document.createElement('input'); 
        let title = document.createElement('p')

        container.setAttribute('class', 'flex');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('value', i);
        checkbox.setAttribute('name', planners[i].getName());
        checkbox.setAttribute('class', 'planners_checkbox checkbox');
        checkbox.setAttribute('style', `accent-color: ${planners[i].getColor()}`);
        checkbox.setAttribute('onclick', 'togglePlanner(this)');
        checkbox.setAttribute('checked', 'checked');
        title.setAttribute('class', 'planners_name');
        
        title.append(planners[i].getName());
        container.append(checkbox, title);

        document.getElementById("plannerList").appendChild(container);
    }
}

function displayPlannersInSelect() {
    document.getElementById("plannerInput").innerHTML = "";

    for (let i = 0; i < planners.length; i++) {
        let option = document.createElement('option'); 
        option.setAttribute('class', 'option');
        option.append(planners[i].getName());

        document.getElementById("plannerInput").appendChild(option);
    }
}

function displayCalendarsInMain() {
    let html = "";
    let addedDays = 0;
    let daysInWeek = days.length;
    let previousDaysInMonth = new Date(year, month, 0).getDate() + 1;
    let previousFirstDay = previousDaysInMonth - new Date(year, month, 0).getDay();
    let currentDayInMonth = new Date(year, month + 1, 0).getDate();
    let currentfirstDay = 1;
    let currentDay = new Date();
    let futureDaysInMonth = 42;

    for (i = 0; i < daysInWeek; i++) {
        html += `<div class='calendar_day'> ${days[i]} </div>`;
    }

    for (let i = previousFirstDay; i < previousDaysInMonth; i++) {
        html += `<div class='calendar_normal calendar_other'> ${i} </div>`;
        addedDays++;
    }

    for (let i = currentfirstDay; i <= currentDayInMonth; i++) {
        if (i == currentDay.getDate() && year == currentDay.getFullYear()) {
            html += `<div class='calendar_normal calendar_current'> ${i} </div>`;
            addedDays++;
        }

        else {
            html += `<div class='calendar_normal'> ${i} </div>`;
            addedDays++;   
        }
    }
    
    futureDaysInMonth -= addedDays;

    for (let i = 1; i <= futureDaysInMonth; i++) {
        html += `<div class='calendar_normal calendar_other'> ${i} </div>`;
    }

    document.getElementById("taskList").setAttribute('class', 'task calendar');
    document.getElementById("date").innerHTML = `${months[month]} ${year}`;
    document.getElementById("taskList").innerHTML = html;
}


function toggleMode() {   
    let selectedMode = document.querySelector("input[name='Mode']:checked").value;
    let monthSubtract = document.getElementById("monthSubtract");
    let monthAddition = document.getElementById("monthAddition");
    let plannerInput = document.getElementById("plannerInput");
    let colorInput = document.getElementById("colorInput");
    let textInput = document.getElementById("textInput");
    let buttonAdd = document.getElementById("buttonAdd");
    let date = document.getElementById("date");

    if (selectedMode == "Task") {
        displayTasksInMain();
        displayPlannersInSelect();

        monthSubtract.style.display = "none";
        monthAddition.style.display = "none";
        plannerInput.style.display = "block";
        colorInput.style.display = "none";
        buttonAdd.style.display = "block";
        textInput.style.display = "block";
        textInput.placeholder = "Add a new task.";
        date.style.display = "none";
    }

    else if (selectedMode == "Planner") {
        displayPlannersInMain();

        monthSubtract.style.display = "none";
        monthAddition.style.display = "none";
        plannerInput.style.display = "none";
        colorInput.style.display = "block";
        buttonAdd.style.display = "block";
        textInput.style.display = "block";
        textInput.placeholder = "Add a new planner.";
        date.style.display = "none";
    }

    else if (selectedMode == "Calendar") {
        displayCalendarsInMain();

        monthSubtract.style.display = "block";
        monthAddition.style.display = "block";
        plannerInput.style.display = "none";
        colorInput.style.display = "none";
        buttonAdd.style.display = "none";
        textInput.style.display = "none";
        date.style.display = "block";        
    }
}

function createErrorMessage(errorMessage) {
    let container = document.getElementById('error');
    const waitTime = 1500;

    container.innerHTML = "";
    container.append(errorMessage);

    container.setAttribute('style', 'display: flex'); 

    setTimeout(() => { 
        container.setAttribute('style', 'display: none'); 
    }, waitTime);
}