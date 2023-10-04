let body = document.getElementsByTagName("body")[0];
window.onload = function()
{
    displayPlanners();
    displayTasks();
}

let taskInput = document.getElementById("task-input");
taskInput.addEventListener("keydown", function(e) {
    if (e.key == "Enter") { 
        addTask();
    }
});

// deleteInput = document.querySelectorAll("#task-list input[type='button']");

// deleteInput[0].addEventListener("click", function() {
//     // console.log(deleteInput[i]);
//     deleteTask(i);
// });    


// // console.log(deleteInput);

// // for (i = 0; i < deleteInput.length; i++) {
// //     deleteInput[i].addEventListener("click", function() {
// //         console.log(deleteInput[i]);
// //         deleteTask(i);
// //     });    
// // }