var express = require('express');
var db = require('../settings/db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    db.all("SELECT * FROM drinks", function (err, rows) {
        if(err) {
            res.send("Error");
            return;
        }
        res.send(rows);
    });

});

router.post('/', function(req, res) {
    var name = req.body.name;
    var price = req.body.price;

    db.run("INSERT INTO drinks (name, price) VALUES(?,?)", name, price);

    res.send("");

});


module.exports = router;