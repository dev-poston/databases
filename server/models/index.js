var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM messagesTABLE', (error, result) => {
        if (error) {
          console.log('msg get error at models', error);
        } else {
          callback(null, result);
        }
      });
    }, // a function which produces all the messages
    post: function (req, callback) {
      // use question mark
      db.query('INSERT INTO messagesTABLE(MessageTEXT, User) VALUES(req.json.message, (SELECT UserID FROM UserTABLE WHERE UserName = ?', [req.json.username], (err, result) => {
        if (err) {
          throw err;
        } else {
          console.log('models msg post success!');
        }
      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

