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

firstPlanner = new Planner("School", "#7EA16B");
secondPlanner = new Planner("Testing", "#DECE85");

planners[0] = firstPlanner;
planners[1] = secondPlanner;

tasks[0] = new Task("Test 1", firstPlanner);
tasks[1] = new Task("Nessago", secondPlanner);
tasks[2] = new Task("Holly Mollo", firstPlanner);
tasks[3] = new Task("East Side", secondPlanner);
tasks[4] = new Task("Finish Cooking", secondPlanner);
tasks[5] = new Task("Finish Homework", firstPlanner);

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
    input = document.getElementById("modeChange");

    if (input.value == "Planner") {
        input.value = "Task";
        document.getElementById("plannerInput").style = "display: inline-block";
        document.getElementById("colorInput").style = "display: none";
    }

    else {
        input.value = "Planner";
        document.getElementById("plannerInput").style = "display: none";
        document.getElementById("colorInput").style = "";
    }
}