const mysql = require('mysql');

const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'Lacsap',
  database : 'HowdyDB'
});

module.exports = pool;
