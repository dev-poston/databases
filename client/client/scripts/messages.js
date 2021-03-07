var Messages = {


  _data: {},

  items: function() {
    return _.chain(Object.values(Messages._data)).sortBy('createdAt');
  },

  // add: function(message, callback = ()=>{}) {
  //   Messages._data[message.objectId] = message;
  //   callback(Messages.items());
  // },

  update: function(messages, callback = ()=>{}) {
    var length = Object.keys(Messages._data).length;
    console.log('messages', messages);
    for (let i = 0; i < messages.length; i++) {
      Messages._data[i] = Messages._conform(messages[i]);
      // callback(messages[i]);
    }
    console.log('Messages._data', Messages._data);
    // only invoke the callback if something changed
    if (Object.keys(Messages._data).length !== length) {
      callback(Messages.items());
    }
  },

  _conform: function(message) {
    // ensure each message object conforms to expected shape
    message.text = message.text || '';
    message.username = message.userid || '';
    message.roomname = message.roomname || '';
    return message;
  }

};