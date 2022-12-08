const mysql = require('mysql12');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3001',
    user: 'root',
    password: 'bB78541254$',
    database: 'employees_db'
});

connection.connnect(err => {
    if(err) throw err;
    console.log('Hello from the employee database!');
});