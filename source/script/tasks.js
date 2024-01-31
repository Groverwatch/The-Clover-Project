// This function loops through all of the task's information and displays it on the main section of the page. 
function displayTasksOnMain() {
    let main = document.getElementById("taskInterface");
    let content = "";

    main.innerHTML = "";

    for (i = 0; i < tasks.length; i++) { // This loops through the task's informations and puts into content for the user to see. 
        if (tasks[i].getPlannerVisiblity() == true) { // This checks to see if the planner that the task is in is visible. If it is, then the task will be displayed.  
            let dueDate = tasks[i].getDueDate();
            let formattedDate = `${days[dueDate.getDay()]}, ${dueDate.getDate()} ${months[dueDate.getMonth()]} ${dueDate.getFullYear()}`;

            content += `<div class="task__container" onclick="editTask(${i})">`; // This section is used to edit details of the task. 
            content +=      `<div>`;
            content +=          `<h2 class="task__title"> ${tasks[i].getName()} </h2>`;
            content +=          `<span class="task__subtitle">`;
            content +=              `<div class="task__color" style="background-color: ${tasks[i].getPlannerColor()}"> </div>`;
            content +=              `<p> ${tasks[i].getPlannerName()}, ${formattedDate} </p>`;
            content +=          `</span>`;
            content +=      `</div>`;
            content +=      `<button class="task__button" value="${i}" onclick="deleteTask(this)"> </button>`; // This button is used to delete the task. 
            content += `</div>`;
        }
    }

    main.innerHTML = content; // The content that was created before are now placed onto the main section of the website. 

}

function editTask(index) {
    let currentTask = tasks[index];
    let informationDiv = document.getElementById("taskInformation");

    if (informationDiv.className == "main__information main__information--reveal") {
        informationDiv.setAttribute('class', 'main__information main__information--hide');
        
    }

    else {
        informationDiv.setAttribute('class', 'main__information main__information--reveal');
    }
}

