class Task { 
    constructor (name, date, description, planner) {
        this.name = name;
        this.date = date;
        this.description = description;
        this.planner = planner;
    }

    getName() {
        return this.name;
    }
    
    getDate() {
        return this.date;
    }

    getDescription() {
        return this.description;
    }

    getPlanner() {
        return this.planner;
    }
}

class Planner {
    constructor (name, colour) {
        this.name = name;
        this.colour = colour; 
    }

    getName() {
        return this.name;
    }
    
    getColour() {
        return this.colour;
    }
}

tasks = [];
planners = [];

firstPlanner = new Planner("School", "#7EA16B");
planners[0] = firstPlanner;
firstTask = new Task("Finish Homework", "24/03/13", "Science", firstPlanner);
tasks[0] = firstTask;

secondPlanner = new Planner("Testing", "#DECE85");
planners[1] = secondPlanner;
secondTask = new Task("Finish Cooking", "28/04/13", "Create Biriyani", secondPlanner);
tasks[1] = secondTask;
tasks[2] = secondTask;
tasks[3] = secondTask;

function displayTask(i) {
    html = "";

    html += `<aside class="task"> <div> <h3> ${tasks[i].getName()} </h3>  <span>`;

    if (tasks[i].getDate() != null) {
        html += `${tasks[i].getDate()}, `;
    }
    if (tasks[i].getDescription() != null) {
        html += `${tasks[i].getDescription()}, `;
    }

    if (tasks[i].getPlanner().getName() != null) {
        html += `<div class="task-planner-colour" style="background-color: ${tasks[i].getPlanner().getColour()}"> </div>`;
        html += `${tasks[i].getPlanner().getName()}, `;
    }

    html += `</span> </div> <input type="button" class="task-button button"> </aside>`;
    
    return html;
}

function add() {
    details = document.getElementById("task-input").value;
    taskDetails = details.split(', ');
    plannerDetails = new Planner(taskDetails[3], "#54333A");
    tasks.push(new Task(taskDetails[0], taskDetails[1], taskDetails[2], secondPlanner));
    displayTasks();
}

function displayPlanners() {
    html = "";

    for (i = 0; i < planners.length; i++) {
        html += `<aside class="planner">
                    <input type="checkbox" name="${planners[i].getName()}" class="planner-checkbox checkbox" style="accent-color: ${planners[i].getColour()}" onclick="displayTasks()" checked> 
                    <p class="planner-text"> ${planners[i].getName()} </p>
                 </aside>`;
    }

    document.getElementById("planner-list").innerHTML = html;
}

function displayTasks() {
    const inputFields = document.querySelectorAll("#planner-list input[type='checkbox']");
    html = "";

    for (i = 0; i < inputFields.length; i++) {
        if (inputFields[i].checked == true) {
            for (j = 0; j < tasks.length; j++) {
                if (tasks[j].getPlanner().getName() == planners[i].getName()) {
                    html += displayTask(j);
                }
            }  
        }
    }

    document.getElementById("task-list").innerHTML = html;
}