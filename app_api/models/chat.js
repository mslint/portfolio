var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
  message: {
    type: String	  
  },
  sender: {
    type: String
  },
  //timestamps: true
  
});

mongoose.model('Chat', chatSchema);
