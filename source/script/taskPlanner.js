function addTask() {
    let taskName = document.getElementById("textInput").value.trim();
    let plannerName = document.getElementById("plannerInput").value;
    let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 
    let chosenDueDate = document.getElementById("dateInput").valueAsDate;
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

    newTask = new Task(taskName, chosenPlanner, chosenDueDate);
    tasks.push(newTask);   
    refreshStorage();

    console.log(tasks);
    
    displayCalendarsInMain();
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
    deleteSound = new Audio('files/delete.mp3');
    deleteSound.play();

    tasks.splice(position, 1);
    refreshStorage();

    displayTasksInMain();
}

function deletePlanner(position) {
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