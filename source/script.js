class Task { 
    constructor (name, date, description, planner) {
        this.name = name;
        this.date = date;
        this.description = description;
        this.planner = planner;
    }

    getName() {
        return this.name;
    }
    
    getDate() {
        return this.date;
    }

    getDescription() {
        return this.description;
    }

    getPlanner() {
        return this.planner;
    }
}

tasks = [];

firstTask = new Task("Finish Homework", "24/03/13", "Science", "School");
tasks[0] = firstTask;

firstTask = new Task("Finish Cooking", "28/04/13", "Create Biriyani", "Hoome");
tasks[1] = firstTask;

console.log(tasks[1].getName());

function displayTask() {
    html = "";

    for (i = 0; i < tasks.length; i++) {
        html += `<aside class="task"> 
                    <div> 
                        <h3> ${tasks[i].getName()} </h3>
                        <p> ${tasks[i].getDate()} | ${tasks[i].getDescription()} | ${tasks[i].getPlanner()} </p>    
                    </div>

                    <input type="button" class="task-button button">
                </aside>`;
    }

    document.getElementById("task-list").innerHTML = html;
}

function addTask() {
    details = document.getElementById("task-input").value;
    taskDetails = details.split(', ');
    tasks[tasks.length+1] = new Task(taskDetails[0], taskDetails[1], taskDetails[2], taskDetails[3]);
    displayTask();
}