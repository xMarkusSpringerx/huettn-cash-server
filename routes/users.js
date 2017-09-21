var express = require('express');
var db = require('../settings/db.js');
var router = express.Router();

/* GET USERS */
router.get('/', function (req, res, next) {

    db.all("SELECT * FROM users", function (err, rows) {
        if(err) {
            res.send("Error");
            return;
        }
        res.send(rows);
    });
});


router.get('/nfc-tags', function (req, res, next) {
    var userId = req.query.userId;
    console.log("UserId: " + userId);
    db.all("SELECT * FROM nfctags WHERE userId = ?", [userId], function (err, rows) {
        if(err) {
            res.send("Error");
            return;
        }
        res.send(rows);
    });
});


router.post('/', function(req, res) {
    var username = req.body.username;

    db.run("INSERT INTO users (username) VALUES(?,?)", username);

    res.send("");
});

module.exports = router;
