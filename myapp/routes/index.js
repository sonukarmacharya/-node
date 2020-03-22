var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sonu karmacharya',message:'This is my first express app' });
});

module.exports = router;
