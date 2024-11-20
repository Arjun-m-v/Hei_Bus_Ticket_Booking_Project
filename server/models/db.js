const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    PORT: 3001,
    password: 'root',
    database: 'bus',
})

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: '24GM@L@PM+AU',
//     port: '3306'
// });

connection.connect(error=>{
    if(error) throw error;
    console.log("successfully Connected to Datbase");
})

module.exports = connection;
