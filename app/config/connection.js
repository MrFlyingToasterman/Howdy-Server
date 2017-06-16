const mysql = require('mysql');

const pool = mysql.createPool({
  host     : 'sql11.freesqldatabase.com',
  user     : 'sql11180500',
  password : 'REsBrPG33U',
  database : 'sql11180500'
});

module.exports = pool;
