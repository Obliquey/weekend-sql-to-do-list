const express = require('express');
const taskRouter = express.Router();

// DB CONNECTION
const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    host: 'localhost',
    post: 5432,
    database: 'to_dos',
});

pool.on('connect', () => {
    console.log('connected to postgres database');
});

pool.off('error', (error) => {
    console.log('failure to connecto to the database', error);
});

// GET ROUTE
taskRouter.get('/', (req, res) => {
    console.log('In router GET /tasks');

    // Need to figure out how to format DATE output so it's pretty
    let sqlText = `
        SELECT * FROM "tasks";
    `;
    pool.query(sqlText)
        .then((dbRes) => {
            let tasks = dbRes.rows;
            console.log('the tasks', tasks);
            res.send(tasks);
        }).catch((dbErr) => {
            console.log('Failed to connect to tasks db', dbErr);
        });
})
// POST ROUTE
taskRouter.post('/', (req, res) => {
    console.log('In router POST /tasks, heres req:', req.body);

    let newTask = req.body.task;
    let completeBy = req.body.completeBy;
    let isComplete = req.body.isComplete;
    let notes = req.body.notes;

    let sqlText = `
        INSERT INTO "tasks"
            ("task", "completeBy", "isComplete", "notes")
            VALUES
            ($1, $2, $3, $4);
    `;
    let sqlValues = [newTask, completeBy, isComplete, notes];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.log("There was an error in POST /tasks, could not post new task to db");
        })
})

// PUT ROUTE
taskRouter.put('/:id', (req,res) => {
    let taskToUpdateID = req.params.id;
    let updateInfo = req.body.isComplete;
    console.log("Info to update = ", taskToUpdateID, updateInfo)

    let sqlText = `
        UPDATE "tasks"
            SET "isComplete" = $1
            WHERE "id" = $2;
    `;

    let sqlValues = [updateInfo, taskToUpdateID];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            console.log("Successfully Update Task", dbRes);
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log("Error in PUT req to update task", dbErr);
            res.sendStatus(500)
        })
})

// DELETE ROUTE
taskRouter.delete('/:id', (req, res) => {
    // extract ID to use in sql query for deletion
    let taskToDelete = req.params.id;

    // make sql query
    let sqlText = `
        DELETE FROM "tasks"
            WHERE "id" = $1;
    `;

    let sqlValues = [taskToDelete];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            console.log('Successfully deleted task');
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('Encountered error, could not delete task', dbErr);
        });
})


module.exports = taskRouter;