const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'app',
  password: 'azerty',
  database: 'groupogags'
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