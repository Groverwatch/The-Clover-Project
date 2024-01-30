window.addEventListener("load", function() {
    let taskTextInput = document.getElementById("taskTextInput");
    let taskButtonAdd = document.getElementById("taskAddInput");
    let plannerTextInput = document.getElementById("plannerTextInput");
    let plannerButtonAdd = document.getElementById("plannerAddInput");

    taskTextInput.addEventListener("keydown", function(event) {
        if (event.key == "Enter") { 
            addTask();
        }
    }); 

    taskButtonAdd.addEventListener("click", function() {
        addTask();
    }); 

    plannerTextInput.addEventListener("keydown", function(event) {
        if (event.key == "Enter") { 
            addPlanner();
        }
    }); 

    plannerButtonAdd.addEventListener("click", function() {
        addPlanner();
    }); 
});

function toggleMode() {
    let selectedMode = document.querySelector("input[name='Mode']:checked").value;

    let taskContainer = document.getElementById("taskContainer");
    let plannerContainer = document.getElementById("plannerContainer");
    let calendarContainer = document.getElementById("calendarContainer");

    if (selectedMode == 'Task') {
        taskContainer.setAttribute('class', 'main__open main')
        plannerContainer.setAttribute('class', 'main__close main');
        calendarContainer.setAttribute('class', 'main__close main');
        
        displayCalendarOnMain();
        displayTasksOnMain();
    }
    
    if (selectedMode == 'Planner') {
        plannerContainer.setAttribute('class', 'main__open main');
        taskContainer.setAttribute('class', 'main__close main');
        calendarContainer.setAttribute('class', 'main__close main');

        displayPlannersOnMain();
        displayPlannersOnSidebar();
    }

    if (selectedMode == 'Calendar') {
        displayCalendarOnMain();

        calendarContainer.setAttribute('class', 'main__open main');
        plannerContainer.setAttribute('class', 'main__close main');
        taskContainer.setAttribute('class', 'main__close main');
    }
}