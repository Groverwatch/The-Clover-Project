// This function loops through all of the task's information and displays it on the main section of the page. 
function displayPlannersOnMain() {
    let main = document.getElementById("plannerInterface");
    let content = "";

    main.innerHTML = "";

    for (i = 0; i < planners.length; i++) { // This loops through the planners's informations and puts into content for the user to see. 
        content += `<div class="planner__container" onclick="displayPlannerInformation(${i})">`;
        content +=      `<div>`;
        content +=          `<h2 class="planner__title"> ${planners[i].getName()} </h2>`;
        content +=          `<span class="planner__subtitle">`;
        content +=              `<div class="planner__color" style="background-color: ${planners[i].getColor()}"> </div>`;
        content +=              `<p> ${planners[i].getColor().toUpperCase()} </p>`;
        content +=          `</span>`;
        content +=      `</div>`;
        content +=      `<button class="planner__button" onclick="deletePlanner(${i})"> </button>`; // This button is used to delete the task. 
        content += `</div>`;
    }

    main.innerHTML = content; // The content that was created before are now placed onto the main section of the website. 
}


// This function displays all of the planners created by the user on the sidebar. This allows the user to interact with the planners and toggle what tasks they want to see. 
function displayPlannersOnSidebar() {
    let sidebar = document.getElementById("sidebarPlanner");
    let content = "";


    for (let i = 0; i < planners.length; i++) { // This loops through the planner's information and presents it as content for the user experience. 
        content += `<label for="planner_${i}" class="planners__container">`;
        content +=     `<input id="planner_${i}" value="${i}" onchange="togglePlanners(this)" type="checkbox" class="planners__checkbox" style="accent-color: ${planners[i].getColor()}" checked>`;
        content +=     `<p class="planners__subtitle"> ${planners[i].getName()} </p>`;
        content += `</label>`;
    }

    sidebar.innerHTML = "";
    sidebar.innerHTML = content; // After the looping, the content will then be placed on the websites for the user to see. 
}

// When a user toggles a planner from the sidebar, this function changes the visibility of the planner based on its current visibility. 
function togglePlanners(checkbox) {
    let planner = planners[checkbox.value]; 

    if (checkbox.checked == true) {
        planner.setVisiblity(true); // If checkbox is checked, then toggle the planner to be visible. 
    } 

    else {
        planner.setVisiblity(false); // If checkbox is not checked, then toggle the planner to not be visible. 
    }

    displayTasksOnMain();
}

function displayPlannersInSelect(selectPosition) {
    let select = document.getElementById(selectPosition);
    let content = "";

    for (let i = 0; i < planners.length; i++) {
        content += `<option> ${planners[i].getName()} </option>`;
    }

    select.innerHTML = "";
    select.innerHTML = content;
}

var currentPlanner = '';

function displayPlannerInformation(index) {
    let content = '';

    if (currentPlanner == planners[index].getName()) {
        currentPlanner = '';
        hideInformation('plannerInformation');
    }

    else {  
        currentPlanner = planners[index].getName();

        document.getElementById(`plannerInformationName`).value = planners[index].getName();
        document.getElementById(`plannerInformationColor`).value = `${planners[index].getColor()}`;
        document.getElementById(`plannerInformationColorText`).innerHTML = document.getElementById(`plannerInformationColor`).value;

        for (i = 0; i < tasks.length; i++) { 
            let taskFormattedDate = `Date: ${tasks[i].getDueDate().getDate()} ${months[tasks[i].getDueDate().getMonth()]} ${tasks[i].getDueDate().getFullYear()}`;

            if (tasks[i].getPlannerName() == planners[index].getName()) { 
                content += `<div class="interface__container">`;
                content += `    <div>`;
                content += `        <p> ${tasks[i].getName()} </p>`;
                content += `        <span class="interface__subtitle">`;
                content += `            <p> ${taskFormattedDate} </p>`;
                content += `        </span>`;            
                content += `    </div>`;
                content += `    <button class="interface__button" onclick="deleteTask(${index})"> </button>`;
                content += `</div>`;
            }
        }

        if (content == '') {
            content += `<div class="interface__container"> There are no tasks inside this planner. :( </div>`;
        }

        document.getElementById('plannerInformationTasks').innerHTML = content;
        
        revealInformation('plannerInformation');
    }

    document.getElementById(`plannerEdit`).setAttribute(`onclick`, `editPlanner(${index})`);
}

displayPlannersOnSidebar();
displayPlannersInSelect('taskPlannerInput');
