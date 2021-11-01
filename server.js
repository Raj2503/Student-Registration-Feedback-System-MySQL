
// var sql = 'SELECT * FROM registeration';

const mysql = require("mysql");

const express = require("express");
const bodyParser = require("body-parser");
var app = express();

app.use(json());

var mysqlConnection = createConnection({
    host: "localhost",
    user: "root",
    password: "oracle",
    database: "RAJ-DB",
    port: 3306,
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log("DB connection succeded.");
    else
        console.log("DB connection failed \n Error : " + JSON.stringify(err, undefined, 2));
});
app.listen(3000);
function myfunction(){
   





    
    console.log("Function Called");
    var sql = "INSERT INTO REGISTERATION VALUES ('Sarthak ARYAN','M','O+','raj250301@gmail.com',95175371,222222)";
    mysqlConnection.query(sql, function(err,result,fields){
    if(err) throw err;
    console.log("1 row inserted");
});
}

myfunction();


function func1(){
    console.log("raj");
}