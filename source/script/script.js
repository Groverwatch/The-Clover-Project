class Task { 
    constructor (name, planner) {
        this.name = name;
        this.planner = planner;
    }

    getName() {
        return this.name;
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

    html += `<aside class="task"> <div> <h3> ${tasks[i].getName()} </h3>  <span>`;

    if (tasks[i].getPlanner().getName() != null) {
        html += `<div class="task-planner-colour" style="background-color: ${tasks[i].getPlanner().getColour()}"> </div>`;
        html += `${tasks[i].getPlanner().getName()}`;
    }

    html += `</span> </div> <input type="button" class="task-button button" id="${i}" onclick="deleteTask(${i})"> </aside>`;
    
    return html;
}

function addTask() {
    taskName = document.getElementById("text-add").value;
    plannerName = document.getElementById("task-input-select").value;
    
    for (i = 0; i < planners.length; i++) {
        if (planners[i].getName() == plannerName) {
            newTask = new Task(taskName, planners[i]);
            tasks.push(newTask);
        }
    }

    displayTasks();

    document.getElementById("text-add").value = "";
}

// function addPlanner() {
//     plannerName = document.getElementById("text-add").value;
//     plannerColour = document.getElementById("color-add").value;

//     console.log(plannerColour);
//     newPlanner = new Planner(plannerName, plannerColour);
//     planners.push(newPlanner);

//     displayPlannersInSelect();

//     document.getElementById("text-add").value = "";
//     document.getElementById("plannerColour").value = "";
// }

function deleteTask(position) {
    tasks.splice(position, 1);
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

function displayPlannersInSelect() {
    html = "";

    for (i = 0; i < planners.length; i++) {
        html += `<option> ${planners[i].getName()} </option>`;
    }
    
    document.getElementById("task-input-select").innerHTML = html;
}

function displayTasks() {
    plannerInput = document.querySelectorAll("#planner-list input[type='checkbox']");
    html = "";

    for (i = 0; i < plannerInput.length; i++) {
        for (j = 0; j < tasks.length; j++) {
            if (tasks[j].getPlanner().getName() == planners[i].getName() && plannerInput[i].checked == true) {
                html += displayTask(j);
            }
        }
    }

    document.getElementById("task-list").innerHTML = html;
}