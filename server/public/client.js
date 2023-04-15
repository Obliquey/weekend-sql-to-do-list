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
    }).catch(function(error) {
        console.log('Could not retrieve tasks in GET /tasks', error);
    });
}