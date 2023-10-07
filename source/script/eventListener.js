
let body = document.getElementsByTagName("body")[0];
window.onload = function(e)
{
    displayPlanners();
    displayTasks();
}

window.addEventListener("load", function() {
    let taskInput = document.getElementById("task-input");

    taskInput.addEventListener("keydown", function(event) {
        if (event.key == "Enter") { 
            addTask();
        }
    }); 

    taskInput.value = "";
});

// WORKS ONCE 
// function deleteTaskEventListener() {
//     console.log('AHHH');
//     var deleteInputs = document.querySelectorAll("#task-list input[type='button']");
    
//     deleteInputs.forEach((input) =>
//         input.addEventListener("click", function() {
//             console.log(input);
//             deleteTask(input);
//         }
//     ));
// }