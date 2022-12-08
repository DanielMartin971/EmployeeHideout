INSERT INTO department (dept_name)
VALUES
('Head Honchos'),
('Sales People'),
('Desk Jockeys'),
('Sanitation');


INSERT INTO roles (title, salary, department_id)
VALUES
('CEO', 1000000, 1),
('Co-CEO', 900000, 1),
('Chemist', 500000, 2),
('Lawyer', 200000, 2),
('To Mordor', 500000, 3),
('Janitor', 90000, 4),
('Stocks Fraud', 5000000, 2);



INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES
('Billy', "Bob Joe", 1, NULL),
-- ('Robert', "De Niro", 2, 1),
-- ('Heisenburg', "Walt", 3, 2),
-- ('James', "Mcgill", 4, NULL),
-- ('Frodo', "Ringbearer", 5, NULL),
-- ('Scruffy', "The Janitor", 6, NULL),
-- ('Leonardo', "DiCaprio", 7, NULL);
