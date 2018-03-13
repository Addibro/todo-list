var express = require('express');
var router  = express.Router();
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var dburl = "mongodb://localhost:27017/todo-list";

/* GET Hello World page */
router.get('/helloworld', function (req, res) {
    res.render('helloworld', { title: 'Hello, World!'})
});

/* GET products listing. */
router.get('/', function(req, res, next) {
    MongoClient.connect(dburl, function(err, db) {
        if(err) {  console.log(err); throw err;  }
        data = '';
        db.collection('uppgifter').find().toArray(function(err, docs){
            if(err) throw err;
            res.render('uppgifter.jade', {data: docs});
            db.close();
        });
    });
});

/* POST to Add User Service */
router.post('/add', function (req, res) {

    MongoClient.connect(dburl, function (err, db) {

        // get our form values, Relies on the "name" attributes
        var kurs = req.body.kurs;
        var uppgift = req.body.uppgift;
        var deadline = req.body.deadline;
        var link = req.body.link;

        // Set our collection
        var collection = db.collection('uppgifter');

        // Submit to the db
        collection.insertOne({
            "kurs": kurs,
            "uppgift": uppgift,
            "deadline": deadline,
            "link": link
        }, function (err, doc) {
            if (err) {
                res.send("There was a problem adding the information to the db.")
            } else {
                // on success, forward to userlist page
                db.close();
                res.redirect("/");
            }
        })
    })
});


/* GET to Delete Uppgift */
router.get('/delete', function(req, res, next) {
    var id = req.query.id;

    MongoClient.connect(dburl, function(err, db) {

        if(err) { throw err;  }

        db.collection('uppgifter', function(err, uppgifter) {

            uppgifter.deleteOne({_id: new mongodb.ObjectID(id)});

            if (err){
                throw err;
            } else {
                db.close();
                res.redirect('/');
            }
        })
    })
});

module.exports = router;
