window.onload = function()
{
    planners.push(new Planner("General", "#7EA16B"));
    planners.push(new Planner("asd", "#432AAA"));

    tasks.push(new Task("1", planners[0]));
    tasks.push(new Task("2", planners[0]));
    tasks.push(new Task("3", planners[0]));
    tasks.push(new Task("4", planners[0]));
    tasks.push(new Task("5", planners[0]));
    tasks.push(new Task("6", planners[1]));
    tasks.push(new Task("7", planners[1]));
    tasks.push(new Task("8", planners[1]));

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