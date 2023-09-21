class Task { 
    constructor (name, date, description, planner) {
        this.name = name;
        this.date = date;
        this.description = description;
        this.planner = planner;
    }

    getName () {
        return this.name;
    }
    
    getDate () {
        return this.date;
    }

    getDescription () {
        return this.description;
    }

    getPlanner () {
        return this.planner;
    }
}

tasks = [];
html = "";

firstTask = new Task("Finish Homework", "24/03/13", "Science", "School");
task[0] = firstTask;

firstTask = new Task("Finish Cooking", "28/04/13", "Create Biriyani", "Hoome");
task[1] = firstTask;

displayTask() {
    for (i = 0; i < task.length; i++) { 
        html += `<aside class="task"> 
                    <div> 
                        <h3> Task Name </h3>
                        <p> Details, Details</p>    
                    </div>

                    <input type="button" class="task-button button">
                </aside>`;
    }    

    document.getElementsByClassName("task-list").innerHTML = html;    
}