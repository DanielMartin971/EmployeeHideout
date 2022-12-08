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
            'Add a job',
            'Add an employee',
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

const addEmployee = () => {
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