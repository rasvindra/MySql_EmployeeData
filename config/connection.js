const express = require("express")
const mysql = require("mysql2");
const {init} = require("../index.js")

const PORT = process.env.PORT || 3301;
const app = express()

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "password",
    database: "employee_data", 
});


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)

});
init;
// connection.connect((err) => {
//     if (err) throw err;
//     console.table("Thank you for Choosing our Application to help the Needs of your Company!");
//     // init();
// });

module.exports = {connection}