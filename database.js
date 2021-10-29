const {createPool} = require('mysql');

const pool = require('mysql').createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host            : "localhost",
    port :           3306,
    user            : "system",
    password        : "oracle",
    database        : "XE",

});

pool.query(`select * from DBMS`, function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
})