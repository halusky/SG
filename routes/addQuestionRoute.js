/**
 * Created by matthewyun on 1/28/16.
 */
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
//    res.send('addQuestionRouter test');
    res.render('addQuestion');
});



module.exports = router;


