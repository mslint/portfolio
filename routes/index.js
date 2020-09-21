var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/home');
var blogCtrl = require('../controllers/blog');

/* GET home page. */
router.get('/', homeCtrl.home);
router.get('/bloglist', blogCtrl.bloglist);
router.get('/blogadd', blogCtrl.blogadd);

module.exports = router;
