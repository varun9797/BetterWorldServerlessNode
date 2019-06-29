var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 100,
    host:process.env.MYSQLHOST,
    user:process.env.MYSQLUSER,
    password:process.env.MYSQLPASS,
    database:process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    debug: false,
    multipleStatements: true
});

// export default {
//     connection
//   }

module.exports.connection = connection;