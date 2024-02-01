// Classes
class Task { 
    constructor (name, planner, dueDate) {
        this.name = name;
        this.planner = planner;
        this.dueDate = dueDate;
    }

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
  
// Variables
tasks = [];
planners = [];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Planners
var storedPlanners = JSON.parse(localStorage.getItem('planners'));

if (storedPlanners != undefined) {
    for (let i = 0; i < storedPlanners.length; i++) {
        let plannerName = storedPlanners[i].name;
        let plannerColor = storedPlanners[i].color;
    
        newPlanner = new Planner(plannerName, plannerColor);
        planners.push(newPlanner); 
    }
}

// Tasks
var storedTasks = JSON.parse(localStorage.getItem('tasks'));

if (storedTasks != undefined) {
    for (let i = 0; i < storedTasks.length; i++) {
        let taskName = storedTasks[i].name;
        let plannerName = storedTasks[i].planner.name;
        let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 
        let chosenDueDate =  new Date(`${storedTasks[i].dueDate}`,);
        chosenDueDate.setHours(0,0,0,0);
    
        newTask = new Task(taskName, chosenPlanner, chosenDueDate);
        tasks.push(newTask); 
    }
}

function refreshStorage() {
    localStorage.setItem('planners', JSON.stringify(planners)); 
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

function addTask() {
    let taskName = document.getElementById("taskTextInput").value.trim();
    let plannerName = document.getElementById("taskPlannerInput").value;
    let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 
    let chosenDueDate = document.getElementById("taskDateInput").valueAsDate;
    let maximumInputLength = 100;

    if (taskName == "") {
        alert("Empty input, type something to add a task."); // temp
        return;
    }

    if (taskName.length > maximumInputLength) {
        alert("Can't find planner, choose a different planner."); // temp
        return;
    }

    if (chosenPlanner == undefined) {
        alert("Can't find planner, choose a different planner."); // temp
        return;
    }

    if (chosenDueDate === null) {
        chosenDueDate = new Date();
    }

    newTask = new Task(taskName, chosenPlanner, chosenDueDate);
    tasks.push(newTask);   
    refreshStorage();

    document.getElementById("taskTextInput").value = "";
}

function deleteTask(button) {
    let deletePosition = button.value;
    event.stopPropagation();

    tasks.splice(deletePosition, 1);
    refreshStorage();

    displayTasksOnMain();
    displayCalendarOnMain();
}

function addPlanner() {
    let plannerName = document.getElementById("plannerTextInput").value.trim();
    let plannerColour = document.getElementById("plannerColorInput").value;
    let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 
    let maximumInputLength = 100;

    if (plannerName == "") {
        alert("Empty input, type something to add a planner."); // temp
        return;  
    }

    if (plannerName.length > maximumInputLength) {
        alert(`The input length is over ${taskName.length - maximumInputLength} words`); // temp
        return;
    }

    if (chosenPlanner != undefined) {
        alert("Planner already exists, try a new name.");
        return;
    }

    newPlanner = new Planner(plannerName, plannerColour);
    planners.push(newPlanner);
    refreshStorage();

    displayPlannersOnMain();
    displayPlannersOnSidebar();

    document.getElementById("plannerTextInput").value = "";
}

function deletePlanner(button) {
    let deletePosition = button.value;
    event.stopPropagation();

    planners.splice(deletePosition, 1);
    refreshStorage();

    displayPlannersOnMain();
    displayPlannersOnSidebar();
}

