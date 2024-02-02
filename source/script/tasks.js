// This function loops through all of the task's information and displays it on the main section of the page. 
function displayTasksOnMain() {
    let main = document.getElementById("taskInterface");
    let content = "";

    for (i = 0; i < tasks.length; i++) { // This loops through the task's informations and puts into content for the user to see. 
        if (tasks[i].getPlannerVisiblity() == true) { // This checks to see if the planner that the task is in is visible. If it is, then the task will be displayed.  
            content += createTaskDisplay(i);
        }
    }

    main.innerHTML = "";
    main.innerHTML = content; // The content that was created before are now placed onto the main section of the website. 
}

function createTaskDisplay(index) {
    let content = '';
    let dueDate = tasks[index].getDueDate();
    let formattedDate = `${days[dueDate.getDay()]}, ${dueDate.getDate()} ${months[dueDate.getMonth()]} ${dueDate.getFullYear()}`;

    content += `<div class="task__container" onclick="displayTaskInformation(${index})">`; // This section is used to edit details of the task. 
    content +=      `<div>`;
    content +=          `<h2 class="task__title"> ${tasks[index].getName()} </h2>`;
    content +=          `<span class="task__subtitle">`;
    content +=              `<div class="task__color" style="background-color: ${tasks[index].getPlannerColor()}"> </div>`;
    content +=              `<p> ${tasks[index].getPlannerName()}, ${formattedDate} </p>`;
    content +=          `</span>`;
    content +=      `</div>`;
    content +=      `<button class="task__button" onclick="deleteTask(${index})"> </button>`; // This button is used to delete the task. 
    content += `</div>`;

    return content; 
}

function displayTaskInformation(index) {
    let content = '';

    if (currentTask == tasks[index].getName()) {
        currentTask = '';
        hideInformation('taskInformation');
    }

    else {        
        currentTask = tasks[index].getName();

        document.getElementById('taskInformationName').value = tasks[index].getName();
        document.getElementById('taskInformationDate').valueAsDate = tasks[index].getDueDate();
        
        for (let i = 0; i < planners.length; i++) {
            if (planners[i].getName() == tasks[index].getPlannerName()) {
                content += `<option selected> ${planners[i].getName()} </option>`;
            }

            else {
                content += `<option> ${planners[i].getName()} </option>`;
            }
        }
        
        document.getElementById('taskInformationSelect').innerHTML = content;
        
        revealInformation('taskInformation');
    }

    document.getElementById(`taskEdit`).setAttribute(`onclick`, `editTask(${index})`);
}