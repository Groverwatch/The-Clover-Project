window.onload = function()
{
    firstPlanner = new Planner("General", "#7EA16B");
    planners.push(firstPlanner);

    displayPlanners();
    displayTasks();
    displayPlannersInSelect();
    changeMode();
}

window.addEventListener("load", function() {
    let textInput = document.getElementById("textInput");
    let buttonAdd = document.getElementById("buttonAdd");
    let modeChange = document.getElementById("modeChange");

    modeChange.addEventListener("click", changeMode);

    textInput.addEventListener("keydown", function(event) {
        if (event.key == "Enter") { 
            if (modeChange.value == "Task") {
                addTask();
            }

            else {
                addPlanner();
            }
        }
        
    }); 

    buttonAdd.addEventListener("click", function() {
        if (modeChange.value == "Task") {
            addTask();
        }
    
        else {
            addPlanner();
        }
    }); 
});