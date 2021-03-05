var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

module.exports.dbConnection = mysql.createConnection({
  user: 'root',
  password: 'student',
  database: 'chatterboxdb'
});

module.exports.dbConnection.connect((err) => {
  if (err) {
    throw err;
    console.log('db connection error', err);
  }
});


