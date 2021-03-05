var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

dbConnection = mysql.createConnection({
  user: 'root',
  password: 'student',
  database: 'chatterboxdb'
});

dbConnection.connect((err) => {
  if (err) {
    console.log('db connection error', err);
    throw err;
  }
  console.log('connection success');
});

module.exports.dbConnection = dbConnection;
