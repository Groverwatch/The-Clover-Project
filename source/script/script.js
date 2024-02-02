// These variables are used for the components related to the calendar. 
const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
const days = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
const totalDaysOnCalendar = 42;  

var displayedYear = new Date().getFullYear();
var displayedMonth = new Date().getMonth();
var displayedDate = new Date().getDate();

// These variables are used for the information sidebar, so that it can be toggled between different tasks or without it.
var currentTask;
var currentDay; 
var currentDay;

// These arrays are used to store the tasks and planners that the users have. 
var tasks = [];
var planners = [];

// When a new task is created, the task object. is created based off the template defined by the classes' constructer.
class Task { 
    constructor (name, planner, dueDate) {
        this.name = name;
        this.planner = planner;
        this.dueDate = dueDate;
    }

    // These functions below are used to get information from the task object such as the task name, or the task's planner.  
    getName() {
        return this.name;
    }

    getDueDate() { 
        return this.dueDate;
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

    // These functions belows are used to change the information inside the task object.
    setName(name) {
        this.name = name;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    setPlanner(planner) {
        this.planner = planner;
    }
}

// When a planner is created, the planner object follows a blueprint through the use of a constructor. 
class Planner {
    constructor (name, color) {
        this.name = name;
        this.color = color; 
        this.visiblity = true;
    }

    // These functions below are used to get information from the planner object such as the planner's colour.  
    getName() {
        return this.name;
    }
    
    getColor() {
        return this.color;
    }
    
    getVisiblity() {
        return this.visiblity;
    }

    // These functions belows are used to change the information inside the planner object.
    setName(name) {
        this.name = name;
    }

    setColor(color) {
        this.color = color; 
    }

    setVisiblity(value) {
        this.visiblity = value;
    }
}

// To store all of the tasks and planners, this website uses the localStorage API. This function loads from the localStorage and uses it for the current session.
function loadFromStorage() {
    var storedPlanners = JSON.parse(localStorage.getItem('planners'));
    var storedTasks = JSON.parse(localStorage.getItem('tasks'));

    // If a planner does exist in the localStorage, then the website will gather the data from the storage and recreate it for the current session,
    if (storedPlanners != undefined) {
        for (let i = 0; i < storedPlanners.length; i++) {
            let plannerName = storedPlanners[i].name;
            let plannerColor = storedPlanners[i].color;

            let newPlanner = new Planner(plannerName, plannerColor);
            planners.push(newPlanner); 
        }
    }

    // If a planner does not exist, then create a new planner. 
    else {
        let plannerName = `Example Planner`;
        let plannerColor = `#00d5ff`;

        let newPlanner = new Planner(plannerName, plannerColor);
        planners.push(newPlanner); 
    }

    // If a task does exist in the localStorage, then the website will gather the data from the storage and recreate it for the current session,
    if (storedTasks != undefined) {
        for (let i = 0; i < storedTasks.length; i++) {
            let taskName = storedTasks[i].name;
            let plannerName = storedTasks[i].planner.name;
            let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 
            let chosenDueDate =  new Date(`${storedTasks[i].dueDate}`,);
            chosenDueDate.setHours(0,0,0,0);

            let newTask = new Task(taskName, chosenPlanner, chosenDueDate);
            tasks.push(newTask); 
        }
    }

    // If a task does not exist, then create a new planner. 
    else {
        let taskName = `Example Task`;
        let chosenPlanner = planners[0];
        let chosenDueDate = new Date()
        chosenDueDate.setHours(0,0,0,0);

        let newTask = new Task(taskName, chosenPlanner, chosenDueDate);
        tasks.push(newTask); 
    }
}

// When a new task or planner is added, the storage is refreshed to store the new items in the task / planner arrays. 
function refreshStorage() {
    localStorage.setItem(`planners`, JSON.stringify(planners)); 
    localStorage.setItem(`tasks`, JSON.stringify(tasks)); 
}

// To add a new task, this function gets the name, chosen planner and due date to see if the task can be added. If so, then a new task is added to the tasks array.
function addTask() {
    let taskName = document.getElementById(`taskTextInput`).value.trim();
    let plannerName = document.getElementById(`taskPlannerInput`).value;
    let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 
    let chosenDueDate = document.getElementById(`taskDateInput`).valueAsDate;
    let maximumInputLength = 100;

    // If the task name does not have a name, the task won't be added. 
    if (taskName == ``) {
        alert(`Empty input, type something to add a task.`);
        return;
    }

    // If the task name's word length goes past 100 words, the task won't be added. 
    if (taskName.length > maximumInputLength) {
        alert(`The length of the task's name is too long.`);
        return;
    }

    // If the planner associated with the task does not exist, the task won't be added.
    if (chosenPlanner == undefined) {
        alert(`Can't find a planner, choose a different planner.`);
        return;
    }

    // If a due date isn't chosen, the current date will be chosen as the task's due date.
    if (chosenDueDate === null) {
        chosenDueDate = new Date();
    }

    // The task is finally added into the array after it passes all of the conditions.
    let newTask = new Task(taskName, chosenPlanner, chosenDueDate);
    tasks.push(newTask);   
    
    // The localStorage is refreshed with newest version of the tasks array. The display is updated and the storage is refreshed. 
    document.getElementById(`taskTextInput`).value = ``;
    refreshStorage();
    toggleMode();
}

// When a user edits a task, the details are gathered and are changed using the set Methods inside the Task Class. 
function editTask(index) {
    let newName = document.getElementById('taskInformationName').value;
    let newDueDate = document.getElementById('taskInformationDate').valueAsDate;
    let newPlanner = planners.find(planner => planner.getName() == document.getElementById('taskInformationSelect').value); 

    // The details are changed here. 
    tasks[index].setName(newName);
    tasks[index].setDueDate(newDueDate);
    tasks[index].setPlanner(newPlanner);

    // The storage and the display is refreshed. 
    refreshStorage();
    toggleMode();
}

// When a user deletes a task, the position of the task is determined and it is removed from the array. The change is then refreshed in the localStorage.
function deleteTask(taskPosition) {
    tasks.splice(taskPosition, 1);

    // The display is updated and the storage is refreshed.
    refreshStorage();
    toggleMode();

    // This helps to prevent multiple events from happening when clicking the delete button. 
    event.stopPropagation();
}

// When a user adds a new planner, the details are gathered and checked to see if its all good before creating a new planner. 
function addPlanner() {
    let plannerName = document.getElementById(`plannerTextInput`).value.trim();
    let plannerColour = document.getElementById(`plannerColorInput`).value;
    let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 
    let maximumInputLength = 100;

    // If the planner's name does not have a name, the planner won't be added. 
    if (plannerName == ``) {
        alert(`Empty input, type something to add a planner.`); 
        return;  
    }

    // If the planner's word length goes past 100 words, the planner won't be added. 
    if (plannerName.length > maximumInputLength) {
        alert(`The length of the planner's name is too long.`);
        return;
    }

    // If there is no color for the planner, the planner won't be added. 
    if (plannerColour == ``) {
        alert(`Empty input, choose a color to add a planner.`);
        return;
    }

    // If the planner is already made, then the planner won't be added. 
    if (chosenPlanner != undefined) {
        alert(`Planner already exists, try a new name.`);
        return;
    }

    // After passing all of the condition, the planner is added into the array and is set into the localStorage. 
    let newPlanner = new Planner(plannerName, plannerColour);
    planners.push(newPlanner);
    refreshStorage();

    // The planner is displayed on the website and the input is cleared. 
    document.getElementById(`plannerTextInput`).value = ``;
    toggleMode();
}

// When a user edits a planner, the details are gathered and are changed using the set Methods inside the Planner Class. 
function editPlanner(index) {
    let newName = document.getElementById(`plannerInformationName`).value;
    let newColor = document.getElementById(`plannerInformationColor`).value;

    // The details are changed here. 
    planners[index].setName(newName);
    planners[index].setColor(newColor);

    // The storage and the display is refreshed. 
    refreshStorage();
    toggleMode();
}

// This function deletes a planner based on the position of the task.
function deletePlanner(plannerPosition) {
    planners.splice(plannerPosition, 1);

    // The display is updated and the storage is refreshed.
    refreshStorage();
    toggleMode();

    // This helps to prevent multiple events from happening when clicking the delete button. 
    event.stopPropagation();
}

loadFromStorage();