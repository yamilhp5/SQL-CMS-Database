const { Pool } = require('pg');
const inquirer = require('inquirer');

const pool = new Pool(
    {
        // TODO: Enter PostgreSQL username
        user: "postgres",
        // TODO: Enter PostgreSQL password
        password: "Santurce.21",
        host: "localhost",
        database: "employees",
    },
    console.log(`Connected to the employees_db database.`)
);

let client

(async () => {
    client = await pool.connect()
    try {
    } finally {
        client.release()
    }
})().catch(e => console.error(e.message, e.stack))


function askPrompts() {
    inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            'View Employees',
            'Add Employee',
        ]
    }]).then(async (answers) => {
        console.log(answers)
        if (answers.choice === 'View Employees') {
            const { rows } = await client.query('SELECT * FROM employee;')
            console.table(rows)
            askPrompts()
        }
        else if (answers.choice === 'Add Employee') {
            const { rows } = await client.query('SELECT * FROM employee;')
            console.table(rows)
            askPrompts()
        }
    })
}

askPrompts()