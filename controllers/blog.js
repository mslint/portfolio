module.exports.blogadd = function(req, res){

	res.render('blog-add', {title: 'Blog Add'});

};


module.exports.bloglist = function(req, res){

	res.render('blog-list', {title: 'Blog List'});

};
