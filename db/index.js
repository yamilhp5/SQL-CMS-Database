// const { Query } = require('pg');
const pool = require('./connection');

class DB {
    constructor() {}
  
    async query(sql, args = []) {
      const client = await pool.connect();
      try {
        const result = await client.query(sql, args);
        return result;
      } finally {
        client.release();
      }
    }

    findAllEmployees () {
        return this.query (
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    findAllDepartments () {
        return this.query ('SELECT department.id, department.name FROM department;'
        );
    }

    findAllRoles () {
        return this.query ('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;'
        );
    }

    createDepartment (department) {
        return this.query ('INSERT INTO department (name) VALUES ($1)', [
            department.name,
        ]);
                   
    }

    createRole (role) {
        const { title, salary, department_id } = role;
        return this.query ('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
           [title, salary, department_id]
        );
    }

    updateEmployeeRole (employeeId, roleId) {
        return this.query ('UPDATE employee SET role_id = $1 WHERE id = $2', [
            roleId,
            employeeId,
        ]);
    }


}

module.exports = new DB(); 
