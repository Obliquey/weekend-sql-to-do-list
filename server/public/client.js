$(document).ready(onReady);

function onReady() {
    console.log("We're Live!");
    getAndRenderTasks();
};

function getAndRenderTasks() {
    
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log('In GET /tasks, retrieved tasks', response);
        renderTasks(response)
    }).catch(function(error) {
        console.log('Could not retrieve tasks in GET /tasks', error);
    });
}

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
}