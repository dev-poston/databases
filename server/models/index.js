var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('do some sql query', (error, result) => {
        if (error) {
          console.log(error);
        } else {
          callback(result);
        }
      });
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

