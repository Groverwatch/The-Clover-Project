// This function loops through all of the task's information and displays it on the main section of the page. 
function displayTasksOnMain() {
    let main = document.getElementById("taskInterface");
    let content = "";

    main.innerHTML = "";

    for (i = 0; i < tasks.length; i++) { // This loops through the task's informations and puts into content for the user to see. 
        if (tasks[i].getPlannerVisiblity() == true) { // This checks to see if the planner that the task is in is visible. If it is, then the task will be displayed.  
            content += createTaskDisplay(i);
        }
    }

    main.innerHTML = content; // The content that was created before are now placed onto the main section of the website. 
}

function createTaskDisplay(index) {
    let content = '';
    let dueDate = tasks[index].getDueDate();
    let formattedDate = `${days[dueDate.getDay()]}, ${dueDate.getDate()} ${months[dueDate.getMonth()]} ${dueDate.getFullYear()}`;

    content += `<div class="task__container">`; // This section is used to edit details of the task. 
    content +=      `<div>`;
    content +=          `<h2 class="task__title"> ${tasks[index].getName()} </h2>`;
    content +=          `<span class="task__subtitle">`;
    content +=              `<div class="task__color" style="background-color: ${tasks[index].getPlannerColor()}"> </div>`;
    content +=              `<p> ${tasks[index].getPlannerName()}, ${formattedDate} </p>`;
    content +=          `</span>`;
    content +=      `</div>`;
    content +=      `<button class="task__button" value="${index}" onclick="deleteTask(this)"> </button>`; // This button is used to delete the task. 
    content += `</div>`;

    return content; 
}

// function editTask(index) {
//     let information = document.getElementById("taskInformation");
//     let textInput = document.getElementById('taskInformationTextInput')
//     let plannerinput = 'taskInformationPlannerInput';
//     let dateInput = document.getElementById('taskInformationDateInput');

//     let currentTask = tasks[index];

//     if (information.className == "main__information main__information--reveal") {

//         displayTasksOnMain();
//         refreshStorage();

//         information.setAttribute('class', 'main__information main__information--hide');
//     }

//     else {

//         information.setAttribute('class', 'main__information main__information--reveal');
//         textInput.setAttribute(`value`, `${currentTask.getName()}`);
//         // tasks[index].setName(textInput.value);

//         displayPlannersInSelect(plannerinput);
//         dateInput.setAttribute(`value`, `${currentTask.getDueDate().toISOString().substring(0,10)}`);
//     }
// }

