var express = require('express');
var multer = require('multer');
var db = require('../settings/db.js');
var router = express.Router();


/* GET SHOPPING */
router.get('/', function (req, res, next) {

    db.all("SELECT * FROM shopping ORDER BY date DESC", function (err, rows) {
        if (err) {
            res.send("Error");
            return;
        }
        res.send(rows);
    });

});

router.post('/', function (req, res) {

    var totalCosts = req.body.userId;

    if (req.body.totalCosts) {
        db.run("INSERT INTO shopping (userId, totalCosts, date) VALUES(?,?,datetime(now))", req.body.userId, req.body.totalCosts);
    } else {
        db.run("INSERT INTO shopping (userId, date) VALUES(?,datetime(now))", req.body.userId);
    }

    res.send("");

});


/* MIDDLEWARE FOR FILEUPLOAD */
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/files/shopping/')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
});

var uploading = multer({
    storage: storage,
});

router.post('/upload', uploading.array('shopping'), function (req, res) {
    console.log(req.files);
    res.send("erfolgreich hochgeladen");
});


module.exports = router;
