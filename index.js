//NPM packages and exported functions from requesFunctions.js
const mysql = require("mysql2");
const inquirer =require("inquirer");
const table =require("console.table");
const db = require("./config/connection.js")
// const {showallDept,showemployeeRoles,reviewEmployeeData,addDepartment,updateJobrole,addNewJobrole} = require("./requestFunctions.js");

//Initialize function that prompts user with choices to augment or view data
const init = () => {
    inquirer.prompt ([
        {
            type: "list",
            name: "choices",
            message: "Please select the Option that best suits your Needs!",
            choices: 
            [
                "Show all Departments",
                "Show all Employee Job roles",
                "Review all Employee Data",
                "Add a new Department to the Company",
                "Add a New Employee to the Company",
                "Add a New Job role for an Employee",
                "Update the Job Role for an Employee"
            ],
        },
        //based on user selection calls funtion to run appropriate MySQL query
    ]).then ((res) => {
        switch (res.choices) {
            case "Show all Departments":showallDept()
            
            break;
            case "Show all Employee Job roles":showemployeeRoles();
            
            break;
            case "Review all Employee Data":reviewEmployeeData();
            
            break;
            case "Add a new Department to the Company":addDepartment();
            
            break;
            case "Add a New Employee to the Company":addEmployee();
            
            break;
            case "Add a New Job role for an Employee":addNewJobrole();
            
            break;
            case "Update the Job Role for an Employee":updateJobrole();
            
            break;
            default: throw new Error("We Apologize. Something Went Wrong. Please Retry");
        }
    });

};

const reviewEmployeeData = () => {
    const query =
    `SELECT
        employee.id, 
        employee.first_name AS "First Name", 
        employee.last_name AS "Last Name", 
        job.title AS "Title", 
        department.department_name AS "Department", 
        job.salary AS "Salary",
        employee.manager_id AS "Manager"
    FROM
        employee, job, department WHERE department.id = job.department_id AND job.id = employee.job_id
    ORDER BY employee.id ASC`;
    db.query(query, (err, results) => {
    err ? console.log(err) : console.table(results);
    init();
    });
};
const showemployeeRoles = () => {
    let query = 
    `SELECT
        job.id,
        job.title AS "Title",
        department.department_name AS "Department",
        job.salary AS "Salary"
    FROM
        job, department WHERE department.id = job.department_id
    ORDER BY job.id ASC`;
    db.query(query, (err, results) => {
        err ? console.log(err) : console.table(results);
    init();
    });
};
const showallDept = () => {
    let query = 
    `SELECT
        department.id,
        department.department_name AS "Department"
    FROM
        department
    ORDER BY department.id ASC`;
    db.query(query, (err, results) => {
        err ? console.log(err) : console.table(results);
        init();
    });

};

//------------------------------------------ ADDS TO TABLES ------------------------------------------

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the new employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the new employee's last name?"
            }
        ])
        .then(ans => {
            const emp = [ans.firstName, ans.lastName];
            let query = `SELECT job.id, job.title FROM job`;
            db.query(query, (err, results) => {
                const jobs = results.map(({ id, title }) => ({ name: title, value: id }));
                if (err) throw err;

                inquirer
                    .prompt([
                        {
                            type: "list",
                            name: "job",
                            message: "What is your employee's job title?",
                            choices: jobs
                        }
                    ])
                    .then(ans => {
                        const chosenJob = ans.job;
                        emp.push(chosenJob);
                        let query = `SELECT * FROM employee`;
                        db.query(query, (err, results) => {
                            if (err) throw err;
                            const managers = results.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
                            inquirer
                                .prompt([
                                    {
                                    type: "list",
                                    name: "manager",
                                    message: "Who is your employee's manager?",
                                    choices: managers
                                    }
                                ])
                                .then(ans => {
                                    const chosenManager = ans.manager;
                                    emp.push(chosenManager);
                                    let query = 
                                    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                                    db.query(query, emp, (err) => {
                                        if (err) throw err;
                                        console.log("Successfully added Employee!");
                                        init();
                                    });
                                });
                        });
                    });
            });
        });
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "deptName",
                message: "What is the name of the new Department?"
            }
        ])
        .then(ans => {
            let query = `INSERT INTO department (department_name)
                            VALUES (?)`;
            db.query(query, ans.deptName, (err) => {
                if (err) throw err;
                console.log("New Department Added.");
                init();
            });
        });
};

const addNewJobrole = () => {
    const newJob = [];
    db.query(`SELECT * from department`, (err, results) => {
        if (err) throw err;
        const departments = results.map(({ id, department_name }) => ({ name: department_name, value: id }));

    inquirer
        .prompt([
            {
                type: "input",
                name: "newJob",
                message: "What is the name of the new Job Title?"
            },
            {
                type: "number",
                name: "newSalary",
                message: "What is the salary for this New Job?"
            },
            {
                type: "list",
                name: "departments",
                message: "Which department does this New Job belong to?",
                choices: departments
            }
        ])
        .then(ans => {
            newJob.push(ans.newJob, ans.newsalary, ans.departments);
            let query = `INSERT INTO job (title, salary, department_id)
                            VALUES (?, ?, ?)`
            db.query(query, newRole, (err) => {
                if (err) throw err;
                console.log("New Job Added");
                init();
            });
        });
    });
};

//------------------------------------------ UPDATES EMPLOYEE ------------------------------------------

const updateJobrole = () => {
    let query = `SELECT * from employee`;
    db.query(query, (err, results) => {
        if (err) throw err;
        const emp = results.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

        let query2 = `SELECT job.id, job.title FROM job`;
        db.query(query2, (err, results) => {
            const roles = results.map(({ id, title }) => ({ name: title, value: id }));
            if (err) throw err;
    
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employee",
                        message: "Which Employee's Job would you like to update?",
                        choices: emp
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "What is the Employee's new Job title?",
                        choices: roles
                    }
                ])
                .then(ans => {
                    const updatedEmp = [ans.employee, ans.role];
                    let query = 
                    `UPDATE employee
                    SET job_id = ${updatedEmp[1]}
                    WHERE id = ${updatedEmp[0]}`;
                    db.query(query, (err) => {
                        if (err) throw err;
                        console.log("Employee Job title updated");
                        init();
                    });
                });
        });
    });
};
//calls function the first time index.js is run
init()
