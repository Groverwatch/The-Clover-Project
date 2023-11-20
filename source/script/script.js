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
        subtitle.append(color, `Planner ${i}, `, planners[i].getColor());
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
    selectedMode = document.querySelector("input[name='Mode']:checked").value;
    index = input.value;

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
    selectedMode = document.querySelector("input[name='Mode']:checked").value;
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