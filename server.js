// var sqlite3 = require('sqlite3').verbose();
var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var rateLimit = require("express-rate-limit");
var fs = require("fs");
const formidable = require("formidable");
var fileUpload = require("express-fileupload");
const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "oracle",
  database: "RAJ-DB",
  port: 3306,
  multipleStatements: true,
});

var app = express();
var server = http.createServer(app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// var db = new sqlite3.Database('./database/employees.db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public/")));
app.use(helmet());
app.use(limiter);

// db.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)');

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Add
app.post("/newfeedback", function (req, res) {
  console.log(req.body.Q1);
  console.log(req.body.Courses);

  //

  mysqlConnection.query(
    "INSERT INTO STUDENT_DETAILS(STUDENT_ID, ACADEMIC_YEAR, SEMESTER, BRANCH, SECTION, COURSE)  VALUES(?,?,?,?,?,?)",
    [
      req.body.Roll,
      req.body.Year,
      req.body.Sem,
      req.body.Roll,
      req.body.Branch,
      req.body.Sec,
      req.body.Courses,
    ],
    function (err, result, fields) {
      if (err) throw err;
      console.log("1 row inserted in Student D");
    }
  );

  mysqlConnection.query(
    " INSERT INTO FEEDBACK_DETAILS(FEEDBACK_DATE, STUDENT_ID, COURSE, Q1, Q21, Q22, Q23, Q24, Q25, Q3, Q4) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.Date,
      req.body.Roll,
      req.body.Courses,
      req.body.Q1,
      req.body.Q21,
      req.body.Q22,
      req.body.Q23,
      req.body.Q24,
      req.body.Q25,
      req.body.Q3,
      req.body.Q4,
    ],
    function (err, result, fields) {
      if (err) throw err;
      console.log("1 row inserted in Feedback D");
      res.send(
        "New data has been added into the database with ID " + req.body.Roll
      );
    }
  );
});

app.post("/save", function (req, res) {
  mysqlConnection.query(
    "INSERT INTO STUDENT_FORM(JEE_ROLL_NO,DATE_OF_REG)  VALUES(?,?)",
    [req.body.jeeroll,req.body.regdate],
    function (err, result, fields) {
      if (err) throw err;
      console.log("1 row inserted in Student Form");
    }
  );

  // console.log([
  //   typeof req.body.jeeroll,
  //   req.body.fname,
  //   req.body.gender,
  //   req.body.bloodgrp,
  //   req.body.dob,
  //   req.body.mobileno,
  //   req.body.email,
  //   req.body.aadharno,
  //   req.body.branch,
  //   req.body.minority,
  //   req.body.fathername,
  //   req.body.fatherocp,
  //   req.body.mothername,
  //   typeof req.body.motherocp,
  //   typeof req.body.parentmob,
  //   typeof req.body.hostel,
  //   typeof req.body.d1,
  //   req.body.sigpic,
  // ]);

  mysqlConnection.query(
    "INSERT INTO STUDENT_REG_DETAILS(JEE_ROLL_NO, SNAME, GENDER,BLOOD_GROUP,DOB,MOBILE1,EMAIL,AADHAR_NO,BRANCH,MINORITY,FATHER_NAME,FATHER_OCCUPATION,MOTHER_NAME,MOTHER_OCCUPATION,PARENT_MOBILE,HOSTEL_REQ,PHOTO,SIGN) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.jeeroll,
      req.body.fname,
      req.body.gender,
      req.body.bloodgrp,
      req.body.dob,
      req.body.mobileno,
      req.body.email,
      req.body.aadharno,
      req.body.branch,
      req.body.minority,
      req.body.fathername,
      req.body.fatherocp,
      req.body.mothername,
      req.body.motherocp,
      req.body.parentmob,
      req.body.hostel,
      req.body.d1,
      req.body.sigpic,
    ],
    function (err, result, fields) {
      if (err) throw err;
      console.log("1 row inserted in Student Registeration Details");
    }
  );

  mysqlConnection.query(
    "INSERT INTO STUDENT_DESEASE(JEE_ROLL_NO,CHRONIC_DISEASE,DETAILS) VALUES(?,?,?)",
    [req.body.jeeroll, req.body.disease, req.body.diseasedetails],
    function (err, result, fields) {
      if (err) throw err;
      console.log("1 row inserted in Student Desease");
    }
  );

  mysqlConnection.query(
    "INSERT INTO DD_DB(DD_NO,DD_DATE,DD_AMOUNT) VALUES(?,?,?)",
    [req.body.jdd, req.body.jdate, req.body.jamount],
    function (err, result, fields) {
      if (err) throw err;
      console.log("1 row inserted in DD Database");
    }
  );

  mysqlConnection.query(
    "INSERT INTO DD_DB(DD_NO,DD_DATE,DD_AMOUNT) VALUES(?,?,?)",
    [req.body.idd, req.body.idate, req.body.iamount],
    function (err, result, fields) {
      if (err) throw err;
      console.log("1 row inserted in DD Database");
    }
  );

  mysqlConnection.query(
    "INSERT INTO STUDENT_PAYMENTS( JEE_ROLL_NO,JOSSA_DD,INST_DD) VALUES(?,?,?)",
    [req.body.jeeroll, req.body.jdd, req.body.idd],
    function (err, result, fields) {
      if (err) throw err;
      console.log("1 row inserted in STUDENT PAYMENTS");
    }
  );

  mysqlConnection.query(
    "INSERT INTO STUDENT_10_DB(JEE_ROLL_NO,BOARD_NAME,PASSING_YEAR,PERCENTAGE) VALUES(?,?,?,?)",
    [
      req.body.jeeroll,
      req.body.tenboard,
      req.body.tenyear,
      req.body.tenpercent,
    ],
    function (err, result, fields) {
      if (err) throw err;
      console.log("1 row inserted in STUDENT 10 DB");
    }
  );

  mysqlConnection.query(
    "INSERT INTO STUDENT_12_DB(JEE_ROLL_NO,BOARD_NAME,SUBJECT,PASSING_YEAR,PERCENTAGE) VALUES(?,?,?,?,?)",
    [
      req.body.jeeroll,
      req.body.twelveboard,
      req.body.twelvesub,
      req.body.twelveyear,
      req.body.twelvepercent,
    ],
    function (err, result, fields) {
      if (err) throw err;
      console.log("1 row inserted in STUDENT 12 DB");
    }
  );

  mysqlConnection.query(
    "INSERT INTO STUDENT_CURR_ADD(JEE_ROLL_NO,ADDRESS,CITY,STATE,PIN_CODE,PHONE) VALUES(?,?,?,?,?,?)",
    [
      req.body.jeeroll,
      req.body.caddress,
      req.body.ccity,
      req.body.cstate,
      req.body.cpincode,
      req.body.cmobile,
    ],
    function (err, result, fields) {
      if (err) throw err;
      console.log("1 row inserted in STUDENT CURR DB");
    }
  );

  mysqlConnection.query(
    "INSERT INTO STUDENT_PER_ADD(JEE_ROLL_NO,ADDRESS,CITY,STATE,PIN_CODE,PHONE) VALUES(?,?,?,?,?,?)",
    [
      req.body.jeeroll,
      req.body.paddress,
      req.body.pcity,
      req.body.pstate,
      req.body.ppincode,
      req.body.pmobile,
    ],
    function (err, result, fields) {
      if (err) throw err;
      console.log("1 row inserted in STUDENT PER DB");
    }
  );

  mysqlConnection.query(
    "INSERT INTO STUDENT_JEE_DETAILS(JEE_ROLL_NO,ALLOTMENT_ROUND,AIR,PERCENTILE,ALLOTMENT_CATEGORY,CANDIDATE_CATEGORY) VALUES(?,?,?,?,?,?)",
    [
      req.body.jeeroll,
      req.body.allotment,
      req.body.air,
      req.body.percent,
      req.body.acategory,
      req.body.ccategory,
    ],
    function (err, result, fields) {
      if (err) throw err;
      console.log("1 row inserted in STUDENT JEE DB");
    }
  );

  mysqlConnection.query(
    "  INSERT INTO STUDENT_DOCUMENTS(  JEE_ROLL_NO, ALLOTMENT_LETTER,    JEE_RANK_CARD ,    PHOTO_ID ,    DOB ,    QEXAM,    INCOME_CERTIFICATE,    CAST_CERTIFICATE,    CAST_VALIDITY ,    OBC_CERTIFICATE ,    DISABILITY_CERTIFICATE,    TRANSFER_CERTIFICATE ,    MIGRATION_CERTIFICATE,    AADHAR_CARD ,    GAP_CARD) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
    [
      req.body.jeeroll,
      req.body.d1,
      req.body.d2,
      req.body.d3,
      req.body.d4,
      req.body.d5,
      req.body.d6,
      req.body.d7,
      req.body.d8,
      req.body.d9,
      req.body.d10,
      req.body.d11,
      req.body.d12,
      req.body.d13,
      req.body.d14,
    ],
    function (err, result, fields) {
      if (err) throw err;
      console.log("1 row inserted in STUDENT DOCUMENTS DB");
    }
  );

  res.send(
    "New data has been added into the database with ID " + req.body.jeeroll
  );

  // mysqlConnection.query("INSERT INTO STUDENT_DETAILS(STUDENT_ID, ACADEMIC_YEAR, SEMESTER, BRANCH, SECTION, COURSE)  VALUES(?,?,?,?,?,?)",[req.body.Roll,req.body.Year,req.body.Sem,req.body.Roll,req.body.Branch,req.body.Sec,req.body.Courses] , function(err,result,fields){
  //     if(err) throw err;
  //     console.log("1 row inserted in Student D");
  // });

  // mysqlConnection.query(" INSERT INTO FEEDBACK_DETAILS(FEEDBACK_DATE, STUDENT_ID, COURSE, Q1, Q21, Q22, Q23, Q24, Q25, Q3, Q4) VALUES(?,?,?,?,?,?,?,?,?,?,?)", [req.body.Date,req.body.Roll,req.body.Courses,req.body.Q1,req.body.Q21,req.body.Q22,req.body.Q23,req.body.Q24,req.body.Q25,req.body.Q3,req.body.Q4], function(err,result,fields){
  //   if(err) throw err;
  //   console.log("1 row inserted in Feedback D");
  //   res.send("New data has been added into the database with ID " + req.body.Roll);
  // });

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

server.listen(3000, function () {
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
