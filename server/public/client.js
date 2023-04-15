$(document).ready(onReady);

function onReady() {
    console.log("We're Live!");
    // Function to keep DOM constantly updated with freshest info
    getAndRenderTasks();

    // Function to POST new task to the server
    $('#inputFields').on('click', '#submitButton', createNewTask);
};

// Function to retrieve current task info from tasks server and render to DOM
function getAndRenderTasks() {
    
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log('In GET /tasks, retrieved tasks', response);
        // calling renderFunction to keep things cleaner
        renderTasks(response)
    }).catch(function(error) {
        console.log('Could not retrieve tasks in GET /tasks', error);
    });
}//end getAndRenderTasks function

// Function to render tasks to DOM (mainly to keep code clean)
function renderTasks(array) {
    for (let task of array) {
        if (task.isComplete === false) {
            $('#taskList').append(`
                <li class="tasks" data-id=${task.id}> 
                ${task.task} ${task.isComplete} ${task.completeBy} ${task.notes} 
                <button class="completeButton">✅</button>
                <button class="deleteButton">X</button>
                </li>
            `)
        }
        else if(task.isComplete === true) {
            $('#completedTaskList').append(`
                <li data-id="${task.id}>
                ${task.task} || ${task.isComplete} || ${task.completeBy} || ${task.notes} 
                <button class="completedButton">Completed</button>
                <button class="deleteButton">X</button>
                </li>
            `);
        }
    }
}//end renderTasks function


// Function for retrieving new task info, bundling into object, and POSTing to server
function createNewTask(event) {
    event.preventDefault();

    let newTask = $('#taskInput').val();
    let completeBy = $('#taskCompleteBy').val();
    let taskNotes = $('#taskNotes').val();
}
