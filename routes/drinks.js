var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });

    var allDrinks = [
        {
            name: "Bier",
            costs: 1.5
        },
        {
            name: "Cola",
            costs: 1.5
        },
        {
            name: "Weizen",
            costs: 1.5
        },
        {
            name: "Jacky Cola",
            costs: 1.5
        },
        {
            name: "Wodka Bull",
            costs: 1.5
        },
        {
            name: "Goasmaß",
            costs: 1.5
        },
        {
            name: "Humpn",
            costs: 1.5
        }
    ];
    res.send(allDrinks);

});

module.exports = router;
