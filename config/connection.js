//NPM package needed for connection
//cookie cutter connection script
const mysql = require("mysql2");
// const {init} = require("../index.js")

const db = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_data", 
});


connection.connect((err) => {
    if (err) throw err;
    console.table("Thank you for Choosing our Application to help the Needs of your Company!");
    // init();
});

//exports function to be used in both js files
module.exports = db