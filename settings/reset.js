var db = require('./db.js');


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

var usernames = [
    {
        username: "Markus"
    },
    {
        username: "Sebastian"
    },
    {
        username: "Stefan"
    },
    {
        username: "Korbi"
    },
    {
        username: "Ente"
    }
];

var reset = db.serialize(function () {

    db.run('DROP TABLE IF EXISTS drinks');
    db.run('DROP TABLE IF EXISTS users');

    console.log("------ DRINKS ------");
    // DRINKS
    db.run('CREATE TABLE drinks(name NOT NULL, price NOT NULL)');
    allDrinks.forEach(function (elem) {

        db.run("INSERT INTO drinks (name, price) VALUES(?,?)", elem.name, elem.costs);
        console.log(elem.name + " für " + elem.costs + "€ eingefügt");
    });

    console.log("------ USERS ------");

    // USERS
    db.run('CREATE TABLE users(id INTEGER PRIMARY KEY, username NOT NULL)');
    usernames.forEach(function (elem) {

        db.run("INSERT INTO users (username) VALUES(?)", elem.username);
        console.log(elem.username + " eingefügt");
    });

});

module.exports = reset;


