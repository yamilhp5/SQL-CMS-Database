INSERT INTO department (name)
VALUES
('II'),
('Sales'),
('Finances'),
('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Service Desk', 60000, 1),
('Salesperson', 70000, 2),
('SalesManager', 80000, 2),
('Financial Adivsor', 90000, 3),
('Accountant', 120000, 3),
('Project Manager', 80000, 4),
('Operations Supervisor', 90000, 4),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Mark','Lopez', 1, NULL),
('Louis','Smith', 2, 2),
('Devin','Jones', 2, NULL),
('Paty', 'Brown', 3, 2),
('Ashley','Allen', 3, NULL),
('David', 'Ross', 4, NULL),
('Sarah', 'Parker', 4, 4);
