const mysql = require('mysql')

const connection = mysql.createPool({
  host: 'remotemysql.com',
  user: 'Zxxul0n3FU',
  password: 'LvvbwqByzs',
  database: 'Zxxul0n3FU'
})
  
connection.connect(
  function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('Connected to DB as id ' + connection.threadId);
  }
)

module.exports = connection