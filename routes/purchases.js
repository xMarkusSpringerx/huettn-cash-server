var express = require('express');
var db = require('../settings/db.js');
var router = express.Router();

/* USER-ID is optional */
router.get('/getAllPaidPurchases', function (req, res, next) {

    if (req.query.userId) {
        db.all("SELECT * FROM drinksPurchased WHERE paid = 1 AND userId = ?", [req.query.userId], function (err, rows) {
            if (err) {
                res.send(err);
                return;
            }
            res.send(rows);
        });
    } else {
        db.all("SELECT * FROM drinksPurchased WHERE paid = 1", function (err, rows) {
            if (err) {
                res.send(err);
                return;
            }
            res.send(rows);
        });
    }
});

/* USER-ID is optional */
router.get('/getAllOpenPurchases', function (req, res, next) {
    if (req.query.userId) {
        db.all("SELECT * FROM drinksPurchased WHERE paid = 0 AND userId = ?", [req.query.userId], function (err, rows) {
            if (err) {
                res.send(err);
                return;
            }
            res.send(rows);
        });
    } else {
        db.all("SELECT * FROM drinksPurchased WHERE paid = 0", function (err, rows) {
            if (err) {
                res.send("Error");
                return;
            }
            res.send(rows);
        });
    }
});

/* NEW PURCHASE*/
router.post('/', function (req, res) {
    db.run("INSERT INTO drinksPurchased (date, userid, drinkId, paid) VALUES(datetime('now'),?,?,?)", [req.body.userId, req.body.drinkId, req.body.paid], function (err) {
        res.send(err);
    });
    res.send("");
});

module.exports = router;