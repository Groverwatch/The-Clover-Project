window.onload = function()
{
    displayPlanners();
    displayTasks();
    displayPlannersInSelect();
}

window.addEventListener("load", function() {
    let textInput = document.getElementById("text-add");
    let buttonInput = document.getElementById("button-add");

    textInput.addEventListener("keydown", function(event) {
        if (event.key == "Enter") { 
            addTask();
        }
    }); 

    buttonInput.addEventListener("click", addTask);
});