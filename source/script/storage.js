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
  
// Variables
tasks = [];
planners = [];

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
