// NPM packages and link to connection.js
const inquirer = require("inquirer");
const mysql = require("mysql2");
const {connection} = require("./config/connection.js")
// const {init} = require("./index.js")

//All MySQL queries wrapped in functions
// SELECT specific columns to display department names
const showallDept = () => {
  const query =
    "SELECT department.id AS 'Department ID' , department.department_name AS 'Department Name' FROM department;";
  // work on promise then do .then init in index.js
    return connection.promise().query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  })
};
// SELECT specific columns to display Job titles and relative info
const showemployeeRoles = () => {
  const query =
    "SELECT job.id, job.title, job.salary, department.department_name FROM job JOIN department ON job.department_id = department.id;";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
};

// SELECT specific columns to display Employees and their data
const reviewEmployeeData = () => {
  const query =
    "SELECT job.id, job.title, job.salary, department.department_name, employee.first_name, employee.last_name, employee.manager_id FROM job JOIN department ON job.department_id = department.id JOIN employee ON job.id = employee.id;";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
};

// INSERT new department based on values from user input
const addDepartment = async () => {
    const response = await inquirer.prompt([
        {
            name: "newDepartment",
            type: "input",
            message: "What is the name of the New Department to be added?"
        }
    ])
    connection.query(
        "INSERT INTO employee_data.department.department_name SET ?",
        {
            department_name:response.name,
        },
        (err) => {
        if (err) throw err;
        console.log("The New Department was Added!");
        init();
    });
};

// INSERT new Job Roles based on values from user input
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

// UPDATE Job Role based on values from user input
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
        ]);
    connection.query("SELECT * FROM job", async (err, jobs) => {
        if (err) throw err;
        const jobSelected = await inquirer.prompt([
            {
                name:"job_id",
                type: "list",
                choices: jobs.map(job => ({name:job.title, value: job.id})),
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

// exports the functions to be called in index.js file
module.exports = {showallDept,
showemployeeRoles,
reviewEmployeeData,
addDepartment,
addNewJobrole,
updateJobrole,
}

