var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
const mysql = require("mysql");

var mysqlConnection = createConnection({
    host: "localhost",
    user: "root",
    password: "oracle",
    database: "RAJ-DB",
    port: 3306,
    multipleStatements: true
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  
  
  
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(express.static(path.join(__dirname,'./public')));
  app.use(helmet());
  app.use(limiter);


// var sql = 'SELECT * FROM registeration';



// const express = require("express");
// const bodyParser = require("body-parser");
// var app = express();

// app.use(json());



// mysqlConnection.connect((err) => {
//     if (!err)
//         console.log("DB connection succeded.");
//     else
//         console.log("DB connection failed \n Error : " + JSON.stringify(err, undefined, 2));
// });
// app.listen(3000);
// function myfunction(){
   





    
//     console.log("Function Called");
//     var sql = "INSERT INTO REGISTERATION VALUES ('Sarthak ARYAN','M','O+','raj250301@gmail.com',95175371,222222)";
//     mysqlConnection.query(sql, function(err,result,fields){
//     if(err) throw err;
//     console.log("1 row inserted");
// });
// }

// myfunction();


// function func1(){
//     console.log("raj");
// }