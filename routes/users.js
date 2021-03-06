//var express = require('express');
//var router = express.Router();
//
///* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});
//
//module.exports = router;

var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/*
 *  GET to modify.
 */

router.get('/modifyuserGet/:id', function(req,res){
    var db = req.db;
    var collection = db.get('userlist');
    var userToUpdate = req.params.id;
    collection.find({'_id' : userToUpdate }, function(err, doc){
        res.send((err === null) ? {msg:doc } : {msg: 'error:' + err});
    })
});


/*
 * PUT to modify.
 */

router.put('/modifyuser/:id', function(req, res){
    var db = req.db;
    var collection = db.get('userlist');
    var userToUpdate = req.params.id;
    var doc = req.body;
    collection.updateById(userToUpdate, doc, function(err, result){
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });

});




module.exports = router;



















