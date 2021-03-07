//var models = require('../models');
var db = require('../db');

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
      db.Message.findAll({attributes: ['text', 'roomname', 'id'], raw: true})
        .then((messages) => {
          res.send(messages);
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
      console.log('req.body', req.body);
      var reqBody;
      db.User.findOrCreate({where: {username: req.body.username}, raw: true})
        .then((data) => {
          console.log('data', data);
          reqBody = {UserId: data[0].id, text: req.body.text, roomname: req.body.roomname };
          console.log('req..body', req.body);
        });
      console.log('reqBody', reqBody);

      db.Message.create(reqBody)
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
      db.User.findAll({attributes: ['id', 'username'], plain: true})
        .then((user) => {
          console.log('in user find', user.dataValues);
          res.send(user.dataValues);
        });
    },
    post: function (req, res) {
      // models.users.post(req.body, (err, data) => {
      //   if (err) {
      //     console.log('msg post control err', err);
      //   } else {
      //     res.sendStatus(200);
      //   }
      // });
      db.User.create(req.body)
        .catch((error) => {
          console.log('user post err:', error);
        });
    }
  }
};

