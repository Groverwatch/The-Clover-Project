// Classes
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


// Variables, 
tasks = [];
planners = [];


// Planners, 
var storedPlanners = JSON.parse(localStorage.getItem('planners'));

if (storedPlanners != undefined) {
    for (let i = 0; i < storedPlanners.length; i++) {
        let plannerName = storedPlanners[i].name;
        let plannerColor = storedPlanners[i].color;
    
        newPlanner = new Planner(plannerName, plannerColor);
        planners.push(newPlanner); 
    }
}

else {
    planners.push(new Planner("General", "#7EA16B"));
}


// Tasks, 
var storedTasks = JSON.parse(localStorage.getItem('tasks'));

if (storedTasks != undefined) {
    for (let i = 0; i < storedTasks.length; i++) {
        let taskName = storedTasks[i].name;
        // let taskPlanner = storedTasks[i].planner;
        let plannerName = storedTasks[i].planner.name;

        let chosenPlanner = planners.find(planner => planner.getName() == plannerName); 

        // newPlanner = new Planner(plannerName, plannerColor);
        newTask = new Task(taskName, chosenPlanner);
        tasks.push(newTask); 
    }
}

function refreshStorage() {
    localStorage.setItem('planners', JSON.stringify(planners)); 
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}