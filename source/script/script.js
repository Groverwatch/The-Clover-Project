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

    getPlannerVisiblity() {
        return this.planner.getVisiblity();
    }
}

class Planner {
    constructor (name, color) {
        this.name = name;
        this.color = color; 
        this.visiblity = true;
    }

    getName() {
        return this.name;
    }
    
    getColor() {
        return this.color;
    }
    
    getVisiblity() {
        return this.visiblity;
    }

    setVisiblity(value) {
        this.visiblity = value;
    }
}

tasks = [];
planners = [];

function displayTasksInMain() {
    html = "";
    
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].getPlannerVisiblity() == true) {
            html += 
            `<aside class="task_container"> 
                <div> 
                    <h3> ${tasks[i].getName()} </h3>  
                    <span> <div class="task_colour" style="background-color: ${tasks[i].getPlannerColor()}"> </div> ${tasks[i].getPlannerName()}
                    </span> 
                </div> 
                
                <input type="button" class="task_button button" id="${i}" onclick="deleteTask(${i})"> 
            </aside>`;    
        }
    }

    document.getElementById("title").innerHTML = "Task List";
    document.getElementById("taskList").innerHTML = html;
}

function displayPlannersInMain() {
    html = "";

    for (let i = 0; i < planners.length; i++) {
        html += 
        `<aside class="task_container"> 
            <div> 
                <h3> ${planners[i].getName()} </h3>  
                <span> <div class="task_colour" style="background-color: ${planners[i].getColor()}"> </div> Planner ${i+1} </span> 
            </div> 
            
            <input type="button" class="task_button button" id="${i}" onclick="deletePlanner(${i})"> 
        </aside>`;
    }

    document.getElementById("title").innerHTML = "Planner List";
    document.getElementById("taskList").innerHTML = html;
}

function displayPlannersInSidebar() {
    html = "";

    for (let i = 0; i < planners.length; i++) {
        html += 
        `<aside class="flex">
            <input type="checkbox" value="${i}" name="${planners[i].getName()}" class="planners_checkbox checkbox" style="accent-color: ${planners[i].getColor()}" onclick="togglePlanner(this)" checked> 
            <p class="planners_name"> ${planners[i].getName()} </p>
        </aside>`;
    }

    document.getElementById("plannerList").innerHTML = html;
}

function displayPlannersInSelect() {
    html = "";

    for (let i = 0; i < planners.length; i++) {
        html += `<option class="option"> ${planners[i].getName()} </option>`;
    }
    
    document.getElementById("plannerInput").innerHTML = html;
}

function addTask() {
    taskName = document.getElementById("textInput").value;
    plannerName = document.getElementById("plannerInput").value;
    
    for (let i = 0; i < planners.length; i++) {
        if (planners[i].getName() == plannerName) {
            newTask = new Task(taskName, planners[i]);
            tasks.push(newTask);
        }
    }

    displayTasksInMain();

    document.getElementById("textInput").value = "";
}

function addPlanner() {
    plannerName = document.getElementById("textInput").value;
    plannerColour = document.getElementById("colorInput").value;

    planners.push(new Planner(plannerName, plannerColour));

    displayPlannersInMain();
    displayPlannersInSelect();
    displayPlannersInSidebar();

    document.getElementById("textInput").value = "";
}

function deletePlanner(position) {
    for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].getPlannerName() == planners[position].getName()) {
            deleteTask(i);
        }
    }

    planners.splice(position, 1); 

    displayPlannersInMain();
    displayPlannersInSelect();
    displayPlannersInSidebar();
}

function deleteTask(position) {
    tasks.splice(position, 1);
    displayTasksInMain();
}

function togglePlanner(input) {
    index = input.value;

    if (input.checked == true) {
        planners[index].setVisiblity(true);
    } 

    else if (input.checked == false) {
        planners[index].setVisiblity(false);
    }

    displayTasksInMain();
}

function toggleMode() {   
    selectedMode = document.querySelector("input[name='Mode']:checked").value;
    rootCSS = document.querySelector(':root');    

    plannerInput = document.getElementById("plannerInput");
    colorInput = document.getElementById("colorInput");
    textInput = document.getElementById("textInput");
    buttonAdd = document.getElementById("buttonAdd");

    if (selectedMode == "Task") {
        displayTasksInMain();
        plannerInput.style.display = "block";
        colorInput.style.display = "none";
        buttonAdd.style.display = "block";
        textInput.style.display = "block";
        textInput.placeholder = "Add a new task.";

        rootCSS.style.setProperty('--selectedColor', 'var(--taskColor)');
    }

    else if (selectedMode == "Planner") {
        displayPlannersInMain();
        plannerInput.style.display = "none";
        colorInput.style.display = "block";
        buttonAdd.style.display = "block";
        textInput.style.display = "block";
        textInput.placeholder = "Add a new planner.";

        rootCSS.style.setProperty('--selectedColor', 'var(--taskColor)');
    }

    else if (selectedMode == "Calendar") {
        plannerInput.style.display = "none";
        colorInput.style.display = "none";
        textInput.style.display = "none";
        buttonAdd.style.display = "none";

        rootCSS.style.setProperty('--selectedColor', 'var(--taskColor)');
    }
}