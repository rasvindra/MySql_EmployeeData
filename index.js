
const mysql = require("mysql2");
const inquirer =require("inquirer");
const consoleTable =require("console.table");
const {showallDept,showemployeeRoles,reviewEmployeeData,addDepartment,updateJobrole,addNewJobrole} = require("./requestFunctions.js");
// const {connection} = require("./config/connection.js")

const connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_data", 
});

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
    ]).then ((res) => {
        switch (res.choices) {
            case "Show all Departments":showallDept();
            
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
connection.connect((err) => {
    if (err) throw err;
    console.table("Thank you for Choosing our Application to help the Needs of your Company!");
    init();
});

// module.exports = {init}