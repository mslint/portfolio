var mongoose = require('mongoose');
var Blog = mongoose.model('blogs');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.blogList = function (req, res) {
  Blog
      .find()
      .exec(function(err, results) {
        if (!results) {
          sendJSONresponse(res, 404, {
            "message": "no Blogs found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(results);
        sendJSONresponse(res, 200, buildBlogList(req, res, results));
      }); 
};

var buildBlogList = function(req, res, results) {
  var blogList = [];
  results.forEach(function(obj) {
    blogList.push({
      blog_title: obj.blog_title,
      blog_text: obj.blog_text,
      blog_userName: obj.blog_userName,
      blog_email: obj.blog_email,
      createdOn: obj.createdOn,
      _id: obj._id
    });
  });
  return blogList;
};

module.exports.blogReturnOne = function (req, res) {
 if (req.params && req.params.blogid) {
    Blog
      .findById(req.params.blogid)
      .exec(function(err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "blogid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(blog);
        sendJSONresponse(res, 200, blog);
      });
  } else {
    console.log('No blogid specified');
    sendJSONresponse(res, 404, {
      "message": "No blogid in request"
    });
  }
};

module.exports.blogAdd = function (req, res) {
    console.log(req.body);
   Blog
    .create({
       blog_title: req.body.blog_title,
       blog_text: req.body.blog_text,
       blog_userName: req.body.blog_userName,
       blog_email: req.body.blog_email
        }
        ,function(err, blog) {
        if (err) {
           console.log(err);
           sendJSONresponse(res, 400, err);
        } else {
           console.log(blog);
           sendJSONresponse(res, 201, blog);
        }
      }
    );
 };

 module.exports.blogEdit = function (req, res) {
    console.log("Updating a book entry with id of " + req.params.blogid);
     Blog
         .findOneAndUpdate(
          { _id: req.params.blogid },
           { $set: {"blog_title": req.body.blog_title, "blog_text": req.body.blog_text}},
          function(err, response) {
              if (err) {
                    sendJSONresponse(res, 400, err);
              } else {
                 sendJSONresponse(res, 201, response);
             }
         }
     );
 };
 
 module.exports.blogDelete = function (req, res) {
    console.log("Deleting blog entry with id of " + req.params.blogid);
    console.log(req.body);
      Blog
          .findByIdAndRemove(req.params.blogid)
          .exec (
              function(err, response) {
                  if (err) {
                              sendJSONresponse(res, 404, err);
                  } else {
                              sendJSONresponse(res, 204, null);
                  }
              }
          );
  };
