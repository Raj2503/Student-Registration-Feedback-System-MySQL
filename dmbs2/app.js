// var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");

const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "db",
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


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(helmet());
app.use(limiter);

// db.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)');

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'./public/registration.html'));
});


// Add
app.post('/save', function(req,res){
    // var sql = "INSERT INTO STUDENT VALUES(?)", [req.body.ID];
    console.log(req.body.ID);    
    mysqlConnection.query("INSERT INTO STUDENT VALUES(?)", [req.body.ID], function(err,result,fields){
        
        if(err) throw err;
        console.log("1 row inserted");
        res.send("New employee has been added into the database with ID ");
    });
    
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