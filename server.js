const mysql    = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'bB78541254$',
        database: 'employees_db'
    }
);

db.connect(err => {
    if(err){
        throw err;
    }
    
    console.log('Hello from the employee database!');
    start();
});

const start = () => {
    inquirer.prompt({
        message: 'Hello Head Honcho! What do you need done?',
        name: 'menu',
        type: 'list',
        choices: [
            'View all departments',
            'View all jobs',
            'View all employees',
            'Add a department',
            'Update employee records',
            'End Session'
        ],
    })
    .then(response => {
            switch (response.menu){
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

const viewEmployees = () => {
    db.query('SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN roles ON department.id = roles.department_id) JOIN employee ON roles.id = employee.job_id);',
    function (err, res){
        if(err){
            return err;
        }
        console.table(res);
        start();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What is the department name?',
        },
    ])
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