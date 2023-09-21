function displayTask() {
    html = "";

    for (i = 0; i < tasks.length; i++) {
        html += `<aside class="task"> 
                    <div> 
                        <h3> ${tasks[i].getName()} </h3>
                        <p> ${tasks[i].getDate()} | ${tasks[i].getDescription()} | ${tasks[i].getPlanner()} </p>    
                    </div>

                    <input type="button" class="task-button button">
                </aside>`;
    }

    document.getElementById("task-list").innerHTML = html;
}
