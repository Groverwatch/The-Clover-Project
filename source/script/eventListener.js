var body = document.getElementsByTagName("body")[0];
window.onload = function(e)
{
    displayPlanners();
    displayTasks();
}

let taskInput = document.getElementById("task-input");
taskInput.addEventListener("keydown", function(e) {
    if (e.key == "Enter") { 
        add();
    }
});