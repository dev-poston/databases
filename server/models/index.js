var db = require('../db/index.js');

module.exports = {
  messages: {
    get: function (callback) {
      db.dbConnection.query('SELECT * FROM messagesTABLE', (error, result) => {
        if (error) {
          callback(error);
        } else {
          callback(null, result);
        }
      });
    }, // a function which produces all the messages
    post: function (req, callback) {
      // use question mark
      db.dbConnection.query(`INSERT INTO messagesTABLE (MessageTEXT) VALUES ('${req.message}')`, (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, 'success');
        }
      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.dbConnection.query('SELECT * FROM userTABLE', (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    },
    post: function (req, callback) {
      db.dbConnection.query(`INSERT INTO userTABLE (UserNAME) VALUES ('${req.username}')`, (err, result) => {
        if (err) {
          callback(err);
        } else {
          console.log('models user post success!');
          callback(null, 'success');
        }
      });
    }
  }
};

