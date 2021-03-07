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

    var tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });



  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    //var userQString = 'insert into users (username, createdAt, updatedAt) VALUES ("Maracus", "2021-03-07 18:29:08", "2021-03-07 18:29:08")';
    var queryString = 'insert into messages(text, UserId, roomname, createdAt, updatedAt) values("Men like you can never change!", "10", "main", "2021-03-07 18:29:08", "2021-03-07 18:29:08")';
    var queryArgs = [];
    // TODO - The exact query string and query args to usenp
    // here depend on the schema you design, so I'll leave
    // them up to you. */
    // dbConnection.query(userQString, queryArgs, function(err) {
    //   if (err) { throw err; }
    //   //done
    // });
    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].text).to.equal('Men like you can never change!');
        expect(messageLog[0].roomname).to.equal('main');
        done();
      });
    });


  });

  it('should correctly add user to user request', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Timothy' }
    }, function () {
      let userQString = 'SELECT * FROM users';
      var queryArgs = [];
      dbConnection.query(userQString, queryArgs, function(err, results) {
        // expect(results.length).to.equal(2);
        // TODO: If you don't have a column named text, change this test.
        expect(results[1].username).to.equal('Timothy');
        done();
      });
    });
  });

  it ('users should have auto-incrementing id', function(done) {
    var queryStr = 'select id from users';
    var queryArgs = [];
    var boolean = false;
    dbConnection.query(queryStr, queryArgs, function(err, results) {
      for ( var i = 0; i < results.length; i++) {
        if (results[i].id === i + 1) {
          boolean = true;
        }
      }
      expect(boolean).to.equal(true);
      done();
    });
  });

  it('messagestable should contain foreign keys', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Sean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Sean',
          text: 'Settle down Maracus',
          roomname: 'HR'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.
        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryMsg = 'SELECT * FROM messages';
        var queryArgs = [];
        var msgRes;
        var queryUser = 'SELECT * FROM users';
        dbConnection.query(queryMsg, queryArgs, function(err, mresults) {
          msgRes = mresults;
          done();
        });
        var queryArgs = [];
        var userRes;
        dbConnection.query(queryUser, queryArgs, function(err, uresults) {
          userRes = uresults;
          // console.log('userres-------', userRes);
          // console.log('msgres-------', msgRes);
          // TODO: If you don't have a column named text, change this test.
          let found = false;
          for (var i = 0; i < userRes.length; i++) {
            if (msgRes.UserId === userRes[i].id) {
              found = true;
              break;
            }
          }
          expect(found).to.equal(true);
          done();
        });
      });
    });
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
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];
        dbConnection.query(queryString, queryArgs, function(err, results) {
          console.log('results-------', results);
          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).to.equal('In mercys name, three days is all I need.');
          done();
        });
      });
    });
  });

});