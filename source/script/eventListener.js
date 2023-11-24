window.onload = function()
{
    displayPlannersInSidebar();
    displayTasksInMain();
    displayPlannersInSelect();
}

window.addEventListener("load", function() {
    let textInput = document.getElementById("textInput");
    let buttonAdd = document.getElementById("buttonAdd");

    textInput.addEventListener("keydown", function(event) {
        selectedMode = document.querySelector("input[name='Mode']:checked").value;

        if (event.key == "Enter") { 
            if (selectedMode == "Task") {
                addTask();
            }

            else if (selectedMode == "Planner") {
                addPlanner();
            }
        }
    }); 

    buttonAdd.addEventListener("click", function() {
        if (selectedMode == "Task") {
            addTask();
        }
    
        else if (selectedMode == "Planner") {
            addPlanner();
        }
    }); 
});