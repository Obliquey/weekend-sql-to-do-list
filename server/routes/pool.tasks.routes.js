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

// GET
taskRouter.get('/', (req, res) => {
    console.log('In router GET /tasks');

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
// POST

// PUT

// DELETE


module.exports = taskRouter;