// var mysql = require('mysql');

// // Create a database connection and export it from this file.
// // You will need to connect with the user "root", no password,
// // and to the database "chat".

// dbConnection = mysql.createConnection({
//   user: 'root',
//   password: 'student',
//   database: 'chatterboxdb'
// });

// dbConnection.connect((err) => {
//   if (err) {
//     console.log('db connection error', err);
//     throw err;
//   }
//   console.log('connection success');
// });

// module.exports.dbConnection = dbConnection;

var Sequelize = require('sequelize');
var db = new Sequelize('chatterboxdb', 'root', 'student');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = db.define('User', {
  username: Sequelize.STRING
});
User.sync();

var Message = db.define('Message', {
  // userid: Sequelize.INTEGER,
  // userString: Sequelize.STRING,
  UserId: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

// Project.belongsTo(User, { foreignKey: 'id_manager' });
// User.hasMany(Project, { foreignKey: 'id_manager' });

// User.hasOne(Message);
// Message.belongsTo(User);

Message.sync();

console.log('connected to sequalize');

module.exports.User = User;
module.exports.Message = Message;