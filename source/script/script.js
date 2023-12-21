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

function addTask() {
    let taskName = document.getElementById("textInput").value.trim();
    let plannerName = document.getElementById("plannerInput").value;
    let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 
    let maximumInputLength = 100;

    if (taskName == "") {
        let errorMessage = "Empty input, type something to add a task. "
        createErrorMessage(errorMessage);
        return;
    }

    if (taskName.length > maximumInputLength) {
        let errorMessage = `The input length is over ${taskName.length - maximumInputLength} words`;
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
    refreshStorage();

    displayTasksInMain();
    document.getElementById("textInput").value = "";
}

function addPlanner() {
    let plannerName = document.getElementById("textInput").value.trim();
    let plannerColour = document.getElementById("colorInput").value;
    let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 
    let maximumInputLength = 100;

    if (plannerName == "") {
        let errorMessage = "Empty input, type something to add a planner. "
        createErrorMessage(errorMessage);
        return;  
    }

    if (plannerName.length > maximumInputLength) {
        let errorMessage = `The input length is over ${taskName.length - maximumInputLength} words`;
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
    refreshStorage();

    displayPlannersInMain();
    displayPlannersInSelect();
    displayPlannersInSidebar();
    document.getElementById("textInput").value = "";
}

function deleteTask(position) {
    event.stopPropagation();

    deleteSound = new Audio('files/delete.mp3');
    deleteSound.play();

    tasks.splice(position, 1);
    refreshStorage();

    displayTasksInMain();
}

function deletePlanner(position) {
    event.stopPropagation();
    deleteSound = new Audio('files/delete.mp3');
    deleteSound.play();
    
    for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].getPlannerName() == planners[position].getName()) {
            deleteTask(i);
        }
    }

    planners.splice(position, 1); 
    refreshStorage();

    displayPlannersInMain();
    displayPlannersInSelect();
    displayPlannersInSidebar();
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