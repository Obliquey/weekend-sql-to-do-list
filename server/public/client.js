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

function clearTable() {
    $('#taskList').empty();
    $('#completedTaskList').empty();
}
// Function to retrieve current task info from tasks server and render to DOM
function getAndRenderTasks() {
    
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        console.log('In GET /tasks, retrieved tasks', response);
        // clear div fields for re-render
        clearTable();
        // calling renderFunction to keep things cleaner
        renderTasks(response)
    }).catch((error) => console.log(error));
}//end getAndRenderTasks function

// Function to render tasks to DOM (mainly to keep code clean)
function renderTasks(array) {
    for (let task of array) {
        let taskDate = task.completeBy;
        taskDate = taskDate.slice(0, 9);

        if (task.isComplete === false) {
            $('#taskList').append(`
                <li class="tasks" data-id=${task.id} data-status="FALSE"> 
                    <button class="completeButton">✅</button>
                    <button class="deleteButton">X</button>
                    ${task.task}
                        <ul>
                            <li>NOTES: ${task.notes}</li>
                            <li>DUE: ${taskDate}</li>
                        </ul>
                </li>
            `)
        }
        else if(task.isComplete === true) {
            // if a task is completed, append to completed task list. Would like to edit this to have the revert button revert it's completed status, posting it back to to-do list. Also, Have the taskDate mark when it was done, rather than when it was set to BE done.
            $('#completedTaskList').append(`
                <li data-id=${task.id} data-status="TRUE">
                    <button class="completeButton">⏪</button>
                    <button class="deleteButton">X</button>
                    ${task.task}
                        <ul>
                            <li>NOTES: ${task.notes}</li>
                            <li>DUE: ${taskDate}</li>
                        </ul>
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
// could I replace the retrieval of info and sending the objevt in my POST req with just an arrow function of some sort?
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            task: newTask,
            completeBy: completeBy,
            isComplete: false,
            notes: taskNotes
        }
    }).then((response) => {
        console.log('Successfully created new task');
        // clear input fields upon success
        $('#taskInput').val('');
        $('#taskCompleteBy').val('');
        $('#taskNotes').val('');
        // re-render tasks from db
        getAndRenderTasks();
    }).catch((error) => console.log(error));
}//end createNewTask function


// Function needs to send DELETE SQL query to db, then call getAndRenderTasks to update DOM
function deleteTask() {
    // get ID of task to delete
    // let taskToDelete = $(this).parent().data('id');

    // make DELETE req to server for the task with ID of ${taskToDelete}
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${$(this).parent().data('id')}`
    }).then((response) => {
        console.log("Successfully deleted task! Though I suppose you knew that since it's gone.");
        getAndRenderTasks();
    }).catch((error) => console.log(error))
}//end deleteTask


// Function that listens for checkmark button click, then changes 'this' elements isComplete status by sending PUT req to server with it's ID.
    // Needs to set isComplete to TRUE using the data section of ajax req
function updateIsComplete() {
    // let statusToUpdate = $(this).parent().data('status');

    // depending on current isComplete status of task, either update it to TRUE or revert back to FALSE, thus changing it's location on the DOM
    if ($(this).parent().data('status') === 'FALSE') {
        $.ajax({
            method: 'PUT',
            url: `/tasks/${$(this).parent().data('id')}`,
            data: {
                isComplete: 'TRUE'
            }
        }).then((response) => {
            console.log('Update task to COMPLETE');
            getAndRenderTasks();
        }).catch((error) => console.log(error))
    }
    else if ($(this).parent().data('status') === 'TRUE') {
        $.ajax({
            method: 'PUT',
            url: `/tasks/${taskToUpdateID}`,
            data: {
                isComplete: 'FALSE'
            }
        }).then((response) => {
            console.log('Update task to TO-DO');
            getAndRenderTasks();
        }).catch((error) => console.log(error))
    }
}//end updateIsComplete