// Tasks, 
var storedTasks = JSON.parse(localStorage.getItem('tasks'));

if (storedTasks == undefined) {
    console.log("oh well.");
}

else {
    for (let i = 0; i < storedTasks.length; i++) {
        let taskName = storedTasks[i].name;
        let taskPlanner = storedTasks[i].planner;
        let plannerName = taskPlanner.name;
        let plannerColor = taskPlanner.color;
    
        newPlanner = new Planner(plannerName, plannerColor);
        newTask = new Task(taskName, newPlanner);
        tasks.push(newTask); 
    }
}

// Planners, 
var storedPlanners = JSON.parse(localStorage.getItem('planners'));

if (storedPlanners == undefined) {
    console.log("oh well, its gone.");
}

else {
    for (let i = 0; i < storedPlanners.length; i++) {
        let plannerName = storedPlanners[i].name;
        let plannerColor = storedPlanners[i].color;
    
        newPlanner = new Planner(plannerName, plannerColor);
        planners.push(newPlanner); 
    }
}