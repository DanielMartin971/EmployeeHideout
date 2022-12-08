const mysql    = require('mysql2');
const inquirer = require('inquirer');

// This guy just creates a connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },
    console.log('Hello from the employee database!')
);

// This function just makes sure that mysql created a connection and then starts the user with what they need from the database
db.connect(err => {
    if(err){
        throw err;
    }
    start();
});

const start = () => {
    // We use inquirer to ask questions to the user seeing what they need to have us do
    inquirer.prompt({
        message: 'Hello Head Honcho! What do you need done?',
        name: 'menu',
        type: 'list',
        choices: [
            'View all departments',
            'View all jobs',
            'View all employees',
            'Add a department',
            'Add a job',
            'Add an employee',
            'Update employee records',
            'End Session'
        ],
    })
    // After we use a switch statment with their response which sends them to a function depending on their response
    .then(res => {
            switch (res.menu){
                case 'View all departments':
                    viewDepartment();
                    break;

                case 'View all jobs':
                    viewJobs();
                    break;

                case 'View all employees':
                    viewEmployees();
                    break;

                case 'Add a department':
                    addDepartment();
                    break;

                case 'Add a job':
                    addJob();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Update employee records':
                    updateRecords();
                    break;

            default:
                console.log('Goodbye then!');
                db.end();
        }
    });
};

const viewDepartment = () => {
    db.query('SELECT * FROM department', function (err, res){
        if(err){
            return err;
        }
        console.table(res);
        start();
    });
};

const viewJobs = () => {
    db.query('SELECT * FROM roles', function (err, res){
        if(err){
            return err;
        }
        console.table(res);
        start();
    });
};

// This function allows us to view employees' first and last name, their department number, salary and manager id
// We also combine the tables to get their roles and what department they are from
const viewEmployees = () => {
    db.query('SELECT employee.id, first_name, last_name, title, dept_name, salary, manager_id FROM ((department JOIN roles ON department.id = roles.department_id) JOIN employee ON roles.id = employee.job_id);',
    function (err, res){
        if(err){
            return err;
        }
        console.table(res);
        start();
    });
};

// This function allows us to add a department into the department table
const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What is the department name?',
        },
    ])
    // We just get the department name and then when its added, its given a value that auto increments in the table
    .then(res => {
        db.query(
            'INSERT INTO department (dept_name) VALUES (?)',
            [res.department],

            function (err, res){
                if(err){
                    return err;
                }
                console.log('Department added successfully');
                start();
            }
        );
    });
};

// This function allows us to add a job into the roles table
const addJob = () => {
    inquirer.prompt([
        {
            name: 'roleTitle',
            type: 'input',
            message: 'What is the title of the job?'
        },
        {
            name: 'salary',
            type: 'number',
            message: 'What is the annual salary?'
        },
        {
            name: 'deptID',
            type: 'number',
            message: "What's the department ID number?"
        }
    ])
    .then(res => {
        db.query(
            'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)',
            [res.roleTitle, res.salary, res.deptID],

            function (err, res){
                if(err){
                    return err;
                }
                console.log('Job added successfully');
                start();
            }
        );
    });
};

// This function allows us to add employees to the database
const addEmployee = () => {
    // In the prompt we use number for the last two questions instead of a input because they are only allowed to be integers
    inquirer.prompt([
        {
            name: 'first',
            type: 'input',
            message: "What is the employee's first name?"
        },
        {
            name: 'last',
            type: 'input',
            message: "What is the employee's last name?"
        },
        {
            name: 'jobID',
            type: 'number',
            message: "What's the job ID number?"
        },
        {
            name: 'managerID',
            type: 'number',
            message: 'What is the manager ID?'
        }
    ])
    .then(res => {
        db.query(
            // We place the response into the employee table with the values needed
            'INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES (?,?,?,?)',
            [res.first, res.last, res.jobID, res.managerID],

            function (err, res){
                if(err){
                    return err;
                }
                console.log('Employee added successfully');
                start();
            }
        );
    });
};

// This function allows the user to update a record of a employee
const updateRecords = () => {
    inquirer.prompt([
        {
            name: 'id',
            type: 'number',
            message: 'Enter employee ID'
        },
        {
            name: 'jobID',
            type: 'number',
            message: 'Enter new job id'
        }
    ])
    .then(res => {
        // When we query we are grabbing a employee's id and setting a new job to them 
        db.query(
            'UPDATE employee SET job_id=? WHERE id=?',
            [res.jobID, res.id],

            function(err, res){
                if(err){
                    return err;
                }
                console.log('Employee successfully updated');
                start();
            }
        );
    });
};