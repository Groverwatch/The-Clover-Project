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

deleteSound = new Audio('files/delete.mp3');

function displayTasksInMain() {
    document.getElementById("title").innerHTML = "Task List";
    document.getElementById("taskList").innerHTML = "";

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

            container.setAttribute('class', 'task_container');
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

    for (let i = 0; i < planners.length; i++) {
        let container = document.createElement('aside'); 
        let section = document.createElement('div'); 
        let title = document.createElement('h3');
        let subtitle = document.createElement('span');
        let color = document.createElement('div'); 
        let button = document.createElement('input');
    
        title.append(planners[i].getName());
        subtitle.append(color, `Planner ${i+1}, `, planners[i].getColor());
        section.append(title, subtitle);
        container.append(section, button);

        container.setAttribute('class', 'task_container');
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

function addTask() {
    let taskName = document.getElementById("textInput").value.trim();
    let plannerName = document.getElementById("plannerInput").value;
    let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 

    if (taskName == "") {
        let errorMessage = "Empty Input, type something to add a task. "
        createErrorMessage(errorMessage);
        return;
    }

    if (chosenPlanner == undefined) {
        let errorMessage = "Can't find planner, choose a different planner. "
        createErrorMessage(errorMessage);
        return;
    }

    newTask = new Task(taskName, chosenPlanner);
    tasks.push(newTask);    

    displayTasksInMain();
    document.getElementById("textInput").value = "";
}

function addPlanner() {
    let plannerName = document.getElementById("textInput").value.trim();
    let plannerColour = document.getElementById("colorInput").value;
    let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 

    if (plannerName == "") {
        let errorMessage = "Empty Input, type something to add a planner. "
        createErrorMessage(errorMessage);
        return;  
    }

    if (chosenPlanner != undefined) {
        let errorMessage = "Planner already exists, try a new name."
        createErrorMessage(errorMessage);
        return;
    }

    newPlanner = new Planner(plannerName, plannerColour);
    planners.push(newPlanner);

    displayPlannersInMain();
    displayPlannersInSelect();
    displayPlannersInSidebar();
    document.getElementById("textInput").value = "";
}

function deletePlanner(position) {
    deleteSound.play();
    
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
    deleteSound.play();

    tasks.splice(position, 1);
    displayTasksInMain();
}

function togglePlanner(input) {
    let selectedMode = document.querySelector("input[name='Mode']:checked").value;
    let index = input.value;

    if (input.checked == true) {
        planners[index].setVisiblity(true);
    } 

    else if (input.checked == false) {
        planners[index].setVisiblity(false);
    }

    if (selectedMode == "Task") {
        displayTasksInMain();
    }
}

function toggleMode() {   
    let selectedMode = document.querySelector("input[name='Mode']:checked").value;
    let plannerInput = document.getElementById("plannerInput");
    let colorInput = document.getElementById("colorInput");
    let textInput = document.getElementById("textInput");
    let buttonAdd = document.getElementById("buttonAdd");

    if (selectedMode == "Task") {
        displayTasksInMain();
        plannerInput.style.display = "block";
        colorInput.style.display = "none";
        buttonAdd.style.display = "block";
        textInput.style.display = "block";
        textInput.placeholder = "Add a new task.";
    }

    else if (selectedMode == "Planner") {
        displayPlannersInMain();
        plannerInput.style.display = "none";
        colorInput.style.display = "block";
        buttonAdd.style.display = "block";
        textInput.style.display = "block";
        textInput.placeholder = "Add a new planner.";
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