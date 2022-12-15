const mysql = require("mysql");


const showallDept = () => {
    const query = "SELECT department.id AS 'Department ID' , department.department_name AS 'Department Name' FROM department;";
    connection.query(
        query,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            init();
        }
    )
}

module.exports = showallDept;