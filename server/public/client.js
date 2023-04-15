$(document).ready(onReady);

function onReady() {
    console.log("We're Live!");
    // Function to keep DOM constantly updated with freshest info
    getAndRenderTasks();

    // Function to POST new task to the server
    $('#inputFields').on('click', '#submitButton', createNewTask);

    // Function to DELETE task from DOM/DB
    $('#twoLists').on('click', ".deleteButton", deleteTask);

    // Function to update COMPLETE status of task on DB using checkmark button
    $('#twoLists').on('click', '.completeButton', updateIsComplete);
};

// Function to retrieve current task info from tasks server and render to DOM
function getAndRenderTasks() {
    
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log('In GET /tasks, retrieved tasks', response);
        // clear div fields for re-render
        $('#taskList').empty();
        $('#completedTaskList').empty();
        // calling renderFunction to keep things cleaner
        renderTasks(response)
    }).catch(function(error) {
        console.log('Could not retrieve tasks in GET /tasks', error);
    });
}//end getAndRenderTasks function

// Function to render tasks to DOM (mainly to keep code clean)
function renderTasks(array) {
    for (let task of array) {
        let taskDate = task.completeBy;
        taskDate = taskDate.slice(0, 9);

        if (task.isComplete === false) {
            $('#taskList').append(`
                <li class="tasks" data-id=${task.id}> 
                ${task.task} --- ${task.notes} --- ${taskDate}  
                <button class="completeButton">✅</button>
                <button class="deleteButton">X</button>
                </li>
            `)
        }
        else if(task.isComplete === true) {
            $('#completedTaskList').append(`
                <li data-id=${task.id}>
                ${task.task} --- ${task.notes} --- ${taskDate} 
                <button class="revertButton">Actually This Isn't Done</button>
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

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            task: newTask,
            completeBy: completeBy,
            isComplete: false,
            notes: taskNotes
        }
    }).then(function(response) {
        console.log('Successfully created new task');
        // clear input fields upon success
        $('#taskInput').val('');
        $('#taskCompleteBy').val('');
        $('#taskNotes').val('');
        // re-render tasks from db
        getAndRenderTasks();
    }).catch(function(error) {
        console.log("Encountered error creating new task", error);
    });
}//end createNewTask function


// Function needs to send DELETE SQL query to db, then call getAndRenderTasks to update DOM
function deleteTask() {
    // get ID of task to delete
    let taskToDelete = $(this).parent().data('id');

    // make DELETE req to server for the task with ID of ${taskToDelete}
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskToDelete}`
    }).then(function(response) {
        console.log("Successfully deleted task! Though I suppose you knew that since it's gone.");
        getAndRenderTasks();
    }).catch(function(error) {
        console.log("Can't get out of doing your tasks that easily!! Kidding, there was an error in deleting.")
    })
}//end deleteTask


// Function that listens for checkmark button click, then changes 'this' elements isComplete status by sending PUT req to server with it's ID.
    // Needs to set isComplete to TRUE using the data section of ajax req
function updateIsComplete() {
    let taskToUpdateID = $(this).parent().data('id');

    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskToUpdateID}`,
        data: {
            isComplete: 'TRUE'
        }
    }).then(function(response) {
        console.log('Update task to COMPLETE');
        getAndRenderTasks();
    }).catch(function(error) {
        console.log("Couldn't update task, error in connecting to database");
    })
}//end updateIsComplete