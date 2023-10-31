class Task { 
    constructor (name, planner) {
        this.name = name;
        this.planner = planner;
    }

    getName() {
        return this.name;
    }
    
    getPlannerName() {
        return this.planner.getName();
    }

    getPlannerColor() {
        return this.planner.getColor();
    }
}

class Planner {
    constructor (name, color) {
        this.name = name;
        this.color = color; 
    }

    getName() {
        return this.name;
    }
    
    getColor() {
        return this.color;
    }
}

tasks = [];
planners = [];

function displayTask(i) {
    html = "";

    html += `<aside class="task_container"> <div> <h3> ${tasks[i].getName()} </h3>  <span>`;

    if (tasks[i].getPlannerName() != null) {
        html += `<div class="task_colour" style="background-color: ${tasks[i].getPlannerColor()}"> </div>`;
        html += `${tasks[i].getPlannerName()}`;
    }

    html += `</span> </div> <input type="button" class="task_button button" id="${i}" onclick="deleteTask(${i})"> </aside>`;
    
    return html;
}

function displayTasks() {
    plannerInput = document.querySelectorAll("#plannerList input[type='checkbox']");
    html = "";

    for (i = 0; i < plannerInput.length; i++) {
        for (j = 0; j < tasks.length; j++) {
            if (tasks[j].getPlannerName() == planners[i].getName() && plannerInput[i].checked == true) {
                html += displayTask(j);
            }
        }
    }

    document.getElementById("taskList").innerHTML = html;
}

function displayPlanners() {
    html = "";

    for (i = 0; i < planners.length; i++) {
        html += `<aside class="flex">
                    <input type="checkbox" name="${planners[i].getName()}" class="planners_checkbox checkbox" style="accent-color: ${planners[i].getColor()}" onclick="displayTasks()" checked> 
                    <p class="planners_name"> ${planners[i].getName()} </p>
                 </aside>`;
    }

    document.getElementById("plannerList").innerHTML = html;
}

function displayPlannersInSelect() {
    html = "";

    for (i = 0; i < planners.length; i++) {
        html += `<option> ${planners[i].getName()} </option>`;
    }
    
    document.getElementById("plannerInput").innerHTML = html;
}

function addTask() {
    taskName = document.getElementById("textInput").value;
    plannerName = document.getElementById("plannerInput").value;
    
    for (i = 0; i < planners.length; i++) {
        if (planners[i].getName() == plannerName) {
            newTask = new Task(taskName, planners[i]);
            tasks.push(newTask);
        }
    }

    displayTasks();

    document.getElementById("textInput").value = "";
}

function addPlanner() {
    plannerName = document.getElementById("textInput").value;
    plannerColour = document.getElementById("colorInput").value;

    planners.push(new Planner(plannerName, plannerColour));

    displayPlannersInSelect();
    displayPlanners();

    document.getElementById("textInput").value = "";
}

function deleteTask(position) {
    tasks.splice(position, 1);
    displayTasks();
}

function changeMode() {   
    selectedMode = document.querySelector("input[name='Mode']:checked").value;
    rootCSS = document.querySelector(':root');    

    plannerInput = document.getElementById("plannerInput");
    colorInput = document.getElementById("colorInput");
    textInput = document.getElementById("textInput");
    buttonAdd = document.getElementById("buttonAdd");

    if (selectedMode == "Task") {
        plannerInput.style.display = "block";
        colorInput.style.display = "none";
        buttonAdd.style.display = "block";
        textInput.style.display = "block";
        textInput.placeholder = "Add a new task.";

        rootCSS.style.setProperty('--selectedColor', 'var(--taskColor)');
    }

    else if (selectedMode == "Planner") {
        plannerInput.style.display = "none";
        colorInput.style.display = "block";
        buttonAdd.style.display = "block";
        textInput.style.display = "block";
        textInput.placeholder = "Add a new planner.";

        rootCSS.style.setProperty('--selectedColor', 'var(--plannerColor)');
    }

    else if (selectedMode == "Calendar") {
        plannerInput.style.display = "none";
        colorInput.style.display = "none";
        textInput.style.display = "none";
        buttonAdd.style.display = "none";

        rootCSS.style.setProperty('--selectedColor', 'var(--calendarColor)');
    }


    // if (input.value == "Planner") {
    //     input.value = "Task";
    //     document.getElementById("plannerInput").style = "display: inline-block";
    //     document.getElementById("colorInput").style = "display: none";
    // }

    // else {
    //     input.value = "Planner";
    //     document.getElementById("plannerInput").style = "display: none";
    //     document.getElementById("colorInput").style = "";
    // }
}