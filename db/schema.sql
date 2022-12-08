DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE department(
    id INT PRIMARY KEY NOT NULL,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT
);

CREATE TABLE employee(
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    job_id INT NOT NULL,
    manager_id INT 
);