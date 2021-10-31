const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
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
