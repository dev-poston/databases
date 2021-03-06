//var models = require('../models');
var db = require('../db');
console.log(db);

module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      // models.messages.get((err, data) => {
      //   if (err) {
      //     console.log('message get control err', err);
      //   } else {
      //     res.send(data);
      //   }
      // });
      db.Message.findAll({attributes: ['text', 'roomname', 'userid', 'id']})
        .then((messages) => {
          console.log('in msg find', messages.Instance.dataValues);
          res.send(messages.Instance.dataValues);
        });
    },
    post: function (req, res) {
      //how are we passing the message, in what form does it come?
      // console.log('messagePostReq', req.body);
      // models.messages.post(req.body, (err, data) => {
      //   if (err) {
      //     console.log('msg post control err', err);
      //   } else {
      //     res.sendStatus(200);
      //   }
      // });

      db.Message.create(req.body)
        .catch((error) => {
          console.log('msg post err:', error);
        });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // res or req.body???
      // models.users.get((err, data) => {
      //   if (err) {
      //     console.log('message get control err', err);
      //   } else {
      //     res.send(data);
      //   }
      // });
    },
    post: function (req, res) {
      // models.users.post(req.body, (err, data) => {
      //   if (err) {
      //     console.log('msg post control err', err);
      //   } else {
      //     res.sendStatus(200);
      //   }
      // });
    }
  }
};

