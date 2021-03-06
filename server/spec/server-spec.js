/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: 'student',
      database: 'chatterboxdb'
    });
    dbConnection.connect();

    var tablename = 'messagesTABLE'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          text: 'In mercys name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messagesTABLE';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].MessageTEXT).to.equal('In mercys name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var userQString = 'insert into userTABLE (UserNAME) VALUES ("Maracus") ON DUPLICATE KEY UPDATE UserNAME = "Maracus"';
    var queryString = 'insert into messagesTABLE(messageTEXT, UserKey, Room) values("Men like you can never change!", (SELECT USerID FROM userTABLE WHERE UserNAME = "Maracus"), "main")';
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */
    dbConnection.query(userQString, queryArgs, function(err) {
      if (err) { throw err; }
      //done
    });
    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].MessageTEXT).to.equal('Men like you can never change!');
        expect(messageLog[0].Room).to.equal('main');
        done();
      });
    });
  });

  it('should correctly add user to user request', function(done) {
    let userQString = 'insert into usertable (username) values ("Timothy") ON DUPLICATE KEY UPDATE UserNAME = "Timothy"';
    var queryArgs = [];
    dbConnection.query(userQString, queryArgs, function (err) {
      if (err) { throw err; }
      request('http://127.0.0.1:3000/classes/users', function(error, response, body) {
        let userLog = JSON.parse(body);
        let boolean = false;
        for (let i = 0; i < userLog.length; i++) {
          for (var key in userLog[i]) {
            if (userLog[i][key] === 'Timothy') {
              boolean = true;
            }
          }
        }
        expect(boolean).to.equal(true);
        done();
      });
    });
  });

  it('messagestable should contain foreign keys', function(done) {
    let userNumber = 'insert into messagestable (messagetext, room, userkey) values ("Settle down Maracu{\'}s", "lockerRoom", (select userid from usertable where username = "Timothy"))';
    let queryArgs = [];
    dbConnection.query(userNumber, queryArgs, function (err) {
      if (err) { throw err; }
      request('http://127.0.0.1:3000/classes/users', function (error, response, body) {
        let userBody = JSON.parse(body);
        request('http://127.0.0.1:3000/classes/messages', function (error, response, body) {
          let messageBody = JSON.parse(body);
          let boolean = false;
          for (let i = 0; i < userBody.length; i++) {
            if (messageBody[0].UserKey === userBody[i].UserID) {
              boolean = true;
            }
          }
          expect(boolean).to.equal(true);
          done();
        });
      });
    });
  });
});

