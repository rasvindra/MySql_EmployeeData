const mysql = require("mysql");
const inquirer =require("inquirer");
const consoleTable =require("console.table")

const connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_data", 
});

connection.connect((err) => {
    if (err) throw err;
    console.table("Thank you for Choosing our Application to help the Needs of your Company!");
});