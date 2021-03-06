var Parse = {

  server: '127.0.0.1.3000',

  create: function(message, successCB, errorCB = null) {

    $.ajax({
      url: '/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function (error) {
        console.error('chatterbox: Failed to create message', error);
      }
    });
  },

  sendUsername: function(user, successCB, errorCB = null) {
    $.ajax({
      url: '/classes/users',
      type: 'POST',
      data: JSON.stringify(user),
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function (error) {
        console.error('chatterbox: Failed to create user', error);
      }
    });
  },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: '/classes/messages',
      type: 'GET',
      // data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }

};