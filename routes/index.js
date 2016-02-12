var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Hello', title2: 'Express' });
});

module.exports = router;


