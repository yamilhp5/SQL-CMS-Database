// const { Pool, Connection } = require('pg');
// const inquirer = require('inquirer');

// const pool = new Pool(
//     {
//         // TODO: Enter PostgreSQL username
//         user: "postgres",
//         // TODO: Enter PostgreSQL password
//         password: "Santurce.21",
//         host: "localhost",
//         database: "employees",
//     },
//     console.log(`Connected to the employees_db database.`)
// );

// let client;

// (async () => {
//     client = await pool.connect()
//     try {
//     } finally {
//         client.release()
//     }
// })().catch(e => console.error(e.message, e.stack))
const { prompt } = require('inquirer');
const db = require ('./db');



askPrompts();


function askPrompts() {
    prompt([
        {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            'View all department',
            'View all roles',
            'View all employees',
            'Create a role',
            'Create an employee',
            'Create department',
            'Update an employee role',
            'No Action', 
        ]
    }]).then((answers) => {
        const { choice } = answers; 
  
        if (choice === "View all department") {
          showDepartments();
        }
  
        if (choice === "View all roles") {
          showRoles();
        }
  
        if (choice === "View all employees") {
          showEmployees();
        }
  
        if (choice === "Create a department") {
          addDepartment();
        }
  
        if (choice === "Create a role") {
          addRole();
        }
  
        if (choice === "Create an employee") {
          addEmployee();
        }
  
        if (choice === "Update an employee role") {
          updateEmployeeRole();
        }

        if (choice === 'No Action') {
            noAction();
        }
    });
};

function showDepartments () {
    db.findAllDepartments()
    .then(({rows}) => {
        let departments = rows;
        console.log('\n');
        console.table(departments);

    })
    .then(() => askPrompts());
}

function showRoles() {
    db.findAllRoles()
    .then(({rows})=> {
        let roles = rows;
        console.log('.\n');
        console.table(roles);

    })
    .then(() => askPrompts());
}

function showEmployees() {
    db.findAllEmployees()
    .then (({rows}) => {
        let employees = rows;
        console.log('.\n');
        console.table(employees);
    })
    .then (() => askPrompts());
}
 
function addDepartment() {
    prompt([
        {
            name: 'name',
            message: 'What is the name of the department?',
        },
               
    ]).then((res) => {
      let name = res;
      db.createDepartment(name)
       .then(()=> console.log(`Added ${name.name} to the database`))
       .then(() => askPrompts());
    });
}

function addRole () {
    db.findAllDepartments().then(({ rows }) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name:name,
            value:id, 
        }));

        prompt ([
         {
            name: 'title',
            message: 'Please enter new role',

        },

        {
            name: 'salary',
            message: 'Please enter salary for this role',
        
        },

        {
            type: 'list',
            name: 'department_id',
            message: 'Which department does the role belong to?',
            choices: departmentChoices,

        },
    ]) .then((role) => {
        db.createRole(role)
        .then(() => console.log(`Added ${role.title} to the Database`))
        .then(() => askPrompts());
    });
    });   

}

function updateEmployeeRole () {
    db.findAllEmployees().then(({ rows }) => {
        let employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name})=> ({
            name: `${first_name} ${last_name}`,
            value: id,
        }));

        prompt ([
            {
                type:'list',
                name: 'employeeId',
                message: 'Please enter role to update?',
                choices: employeeChoices,
            },
        ]).then((res)=> {
            let employeeId = res.employeeId;
            db.findAllRoles().then (({ rows })=> {
                let roles = rows;
                const roleChoices = roles.map (({ id, title }) => ({
                    name: title,
                    value: id, 
                }));

                prompt ([
                    {
                        type:'list',
                        name: 'roleId',
                        message: 'Please assign role to selected employee',
                        choices: roleChoices,
                    },
                ])
                .then(( res )=> db.updateEmployeeRole(employeeId, res.roleId))
                .then(() => console.log("Employee's role updated!"))
                .then(()=> askPrompts());
            });
        });
    });
}

function noAction () {
    console.log('Goodbye!');
    process.exit();
}




 