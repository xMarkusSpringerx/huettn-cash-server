var express = require('express');
var db = require('../settings/db.js');
var router = express.Router();



/* GET USERS */
router.get('/', function (req, res, next) {

    db.all("SELECT * FROM shopping", function (err, rows) {
        if(err) {
            res.send("Error");
            return;
        }
        res.send(rows);
    });
});

router.post('/', function(req, res) {

    var totalCosts = req.body.userId;

    if(req.body.totalCosts) {
        db.run("INSERT INTO shopping (userId, totalCosts, date) VALUES(?,?,datetime(now))", req.body.userId, req.body.totalCosts);
    } else {
        db.run("INSERT INTO shopping (userId, date) VALUES(?,datetime(now))", req.body.userId);
    }

    res.send("");

});


module.exports = router;