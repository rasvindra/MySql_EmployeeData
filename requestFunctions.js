const { default: inquirer } = require("inquirer");
const mysql = require("mysql2");
const {connection} = require("./config/connection.js")
// const {init} = require("./index.js")

const showallDept = () => {
  const query =
    "SELECT department.id AS 'Department ID' , department.department_name AS 'Department Name' FROM department;";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  })
};

const showemployeeRoles = () => {
  const query =
    "SELECT job.id, job.title, job.salary, department.department_name FROM job JOIN department ON job.department_id = department.id;";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
};

const reviewEmployeeData = () => {
  const query =
    "SELECT job.id, job.title, job.salary, department.department_name, employee.first_name, employee.last_name, employee.manager_id FROM job JOIN department ON job.department_id = department.id JOIN employee ON job.id = employee.id;";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
};

const addDepartment = async () => {
    const response = await inquirer.prompt([
        {
            name: "newDepartment",
            type: "input",
            message: "What is the name of the New Department to be added?"
        }
    ])
    connection.query(
        "INSERT INTO employee_data.department SET ?",
        {
            name:response.newDpartment,
        },
        (err) => {
        if (err) throw err;
        console.log("The New Department was Added!");
        init();
    });
};

const addNewJobrole = async () => {
    const departments = showallDept();
    const response = await inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the new Job Title to be Added?"
        },
        {
            name: "salary",
            type: "decimal",
            message: "What is the Salary for the new Job to be Added?"
        },
        {
            name: "department",
            type: "list",
            choices: departments.map(department => department.department_name),
            message: "What Department does the new Job belong to?"
        },
    ])
    departments.forEach(department => {
        if (department.department_name === response.department) {
            response.department = department.id;
        }
    });
    connection.query(
        "INSERT INTO employee_data.job SET ?",
        {
            title:response.title,
            salary:response.salary,
            department_id:response.department,
        },
        (err) => {
        if (err) throw err;
        console.log("The New Job Role was Added!");
        init();
    });
};

const updateJobrole = async () => {
    connection.query("SELECT * FROM employee", async (err, employees) => {
        if (err) throw err;
        const currentEmployee = await inquirer.prompt([
            {
                name: "employee_id",
                type: "list",
                choices: employees.map(employee => ({name:employee.first_name+" "+employee.last_name, value: employee.id})),
                message: "Which Employee's Job role would you like to Update?"
            }
        ])
    connection.query("SELECT * FROM job", async (err, roles) => {
        if (err) throw err;
        const jobSelected = await inquirer.prompt([
            {
                name:"job_id",
                type: "list",
                choices: roles.map(role => ({name:job.title, value: job.id})),
                message: "What is the Employee's new Job role?"
            }
        ])
    connection.query(
        "UPDATE employee_data.job SET ? WHERE ?",
        [
            {
            job_id: jobSelected.job_id,
            },
            {
            id: currentEmployee.employee_id,
            },
        ],
        (err) => {
        if (err) throw err;
        console.log("The Employee's Job Role was Updated!");
        init();
        })
    })
    })
}

 
module.exports = {showallDept,
showemployeeRoles,
reviewEmployeeData,
addDepartment,
addNewJobrole,
updateJobrole,
}

