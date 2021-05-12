
var mongoose = require('mongoose');
var Chat = mongoose.model('Chat');

module.exports getChats = function(req, res){
  Chat
    .find()
    .exec(function(err, results){
      if(!results){
	sendJSONresponse(res, 404, {
          "message": "no chats found"
	
	});
	return;
      } else if(err){
        console.log(err);
	sendJSONresponse(res, 404, err);
	return;
      }
	console.log(results);
	sendJSONresponse(res, 200, buildChat(req, res, results));
    });
};

var buildChat = function(req, res, results){
  var chats = [];
  results.forEach(function(obj){
    chats.push({
    message: obj.message,
    sender: obj.sender,
    createdOn: obj.createdOn
    });

  });
};
