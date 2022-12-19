const mysql = require("mysql");


const showallDept = () => {
    const query = "SELECT department.id AS 'Department ID' , department.department_name AS 'Department Name' FROM department;";
    connection.query(
        query,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            init();
        
    })
}

const showemployeeRoles = () => {
    const query = "SELECT job.id, job.title, job.salary, department.department_name FROM job JOIN department ON job.department_id = department,id;";
    connection.query(
        query,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            init();
        
    })
}

const reviewEmployeeData = () => {
    const query =  "SELECT job.id, job.title, job.salary, department.department_name, employee.first_name, employee.last_name, employee.manager_id FROM job JOIN department ON job.department_id = department.id JOIN employee ON job.id = employee.id;";
    connection.query(
    (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

module.exports = showallDept;
module.exports = showemployeeRoles;
module.exports = reviewEmployeeData;