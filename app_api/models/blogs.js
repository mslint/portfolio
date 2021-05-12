var mongoose = require('mongoose');
var blogSchema = new mongoose.Schema({
	blog_title: String,
	blog_text: String,
	blog_userName: String,
	blog_email: String,
	blog_userName: String,
	blog_email: String,
	createdOn: {
		type: Date,
		"default": Date.now
	}
});

mongoose.model('blogs', blogSchema);
