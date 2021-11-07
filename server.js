// var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
var fs = require('fs');
const formidable = require('formidable');
var fileUpload = require('express-fileupload');
const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "oracle",
    database: "RAJ-DB",
    port: 3306,
    multipleStatements: true
});


var app = express();
var server = http.createServer(app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});


// var db = new sqlite3.Database('./database/employees.db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'./public/')));
app.use(helmet());
app.use(limiter);

// db.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)');

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'public/index.html'));

});


// Add
app.post('/newfeedback', function(req,res){
  console.log((req.body.Q1));
  console.log((req.body.Courses));

  
  //
  

      mysqlConnection.query("INSERT INTO STUDENT_DETAILS(STUDENT_ID, ACADEMIC_YEAR, SEMESTER, BRANCH, SECTION, COURSE)  VALUES(?,?,?,?,?,?)",[req.body.Roll,req.body.Year,req.body.Sem,req.body.Roll,req.body.Branch,req.body.Sec,req.body.Courses] , function(err,result,fields){
        if(err) throw err;
        console.log("1 row inserted in Student D");
    });

    mysqlConnection.query(" INSERT INTO FEEDBACK_DETAILS(FEEDBACK_DATE, STUDENT_ID, COURSE, Q1, Q21, Q22, Q23, Q24, Q25, Q3, Q4) VALUES(?,?,?,?,?,?,?,?,?,?,?)", [req.body.Date,req.body.Roll,req.body.Courses,req.body.Q1,req.body.Q21,req.body.Q22,req.body.Q23,req.body.Q24,req.body.Q25,req.body.Q3,req.body.Q4], function(err,result,fields){
      if(err) throw err;
      console.log("1 row inserted in Feedback D");
      res.send("New data has been added into the database with ID " + req.body.Roll);
  });

});


app.post('/save', function(req,res){

//   var form = new formidable.IncomingForm();
//   form.parse(req, function (err, fields, files) {
//     console.log(fileUpload.FileArray.);
// });
    // var sql = "INSERT INTO STUDENT VALUES(?)", [req.body.ID];
        // var sql = "INSERT INTO REGISTERATION VALUES ('A ARYAN','M','O+','raj250301@gmail.com',95175371,222222)";
    // console.log(req.body.ID);    




    // mysqlConnection.query("INSERT INTO REGISTERATION VALUES(?,'M','O+','raj250301@gmail.com',95175371,222222)", [req.body.ID], function(err,result,fields){
    //     if(err) throw err;
    //     console.log("1 row inserted");
    //     res.send("New employee has been added into the database with ID ");
    // });
    
//     db.serialize(()=>{
//     db.run('INSERT INTO emp(id,name) VALUES(?,?)', [req.body.id, req.body.name], function(err) {
//       if (err) {
//         return console.log(err.message);
//       }
//       console.log("New employee has been added");
//       res.send("New employee has been added into the database with ID = "+req.body.id+ " and Name = "+req.body.name);
//     });

//   });

});

server.listen(3000, function(){
    console.log("server is listening on port: 3000");
  });

// var sqlite3 = require('sqlite3').verbose();
// var express = require('express');
// var http = require('http');
// var path = require("path");
// var bodyParser = require('body-parser');
// var helmet = require('helmet');
// var rateLimit = require("express-rate-limit");
// const mysql = require("mysql");

// var mysqlConnection = createConnection({
//     host: "localhost",
//     user: "root",
//     password: "oracle",
//     database: "RAJ-DB",
//     port: 3306,
//     multipleStatements: true
// });

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
//   });
  
  
  
//   app.use(bodyParser.urlencoded({extended: false}));
//   app.use(express.static(path.join(__dirname,'./public')));
//   app.use(helmet());
//   app.use(limiter);


//   app.get('/', function(req,res){
//     res.sendFile(path.join(__dirname,'./public/form.html'));
//   });

  
// app.get('/', function(req,res){
//     res.sendFile(path.join(__dirname,'public/Registeration Form/registeration.html'));
//   });


//   app.post('/newregister', function(req,res){

//     var sql = "INSERT INTO REGISTERATION VALUES ('A ARYAN','M','O+','raj250301@gmail.com',95175371,222222)";
//     mysqlConnection.query(sql, function(err,result,fields){
//     if(err) throw err;
//     console.log("1 row inserted");
//   });  
// });




// // const express = require("express");
// // const bodyParser = require("body-parser");
// // var app = express();

// app.use(json());



// // mysqlConnection.connect((err) => {
// //     if (!err)
// //         console.log("DB connection succeded.");
// //     else
// //         console.log("DB connection failed \n Error : " + JSON.stringify(err, undefined, 2));
// // });
// app.listen(3000);
// // function myfunction(){
   





    
// //     console.log("Function Called");
// //     var sql = "INSERT INTO REGISTERATION VALUES ('Sarthak ARYAN','M','O+','raj250301@gmail.com',95175371,222222)";
// //     mysqlConnection.query(sql, function(err,result,fields){
// //     if(err) throw err;
// //     console.log("1 row inserted");
// // });
// // }

// // myfunction();


// // function func1(){
// //     console.log("raj");
// // }