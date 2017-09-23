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
        username: "Markus",
        pin: "0000"
    },
    {
        username: "Sebastian",
        pin: "0000"
    },
    {
        username: "Stefan",
        pin: "0000"
    },
    {
        username: "Korbi",
        pin: "0000"
    },
    {
        username: "Ente",
        pin: "0000"
    }
];

var nfcTags = [
    {
        userId: 1,
        nfcTag : "asdlfkjaeoisjdoiwej"
    },
    {
        userId: 2,
        nfcTag : "wesdweasdf"
    },
    {
        userId: 3,
        nfcTag : "hrethsfghdsrth"
    },
    {
        userId: 4,
        nfcTag : "rhsecrtew4tcw4c"
    },
    {
        userId: 5,
        nfcTag : "q23rq34tcwe5ct"
    },
    {
        userId: 1,
        nfcTag : "arew34ctweta"
    }
];

var shopping = [
    {

        userId: 1,
        costs: 200
    },
    {

        userId: 2,
        costs: 112.4
    },
    {

        userId: 3
    },
    {

        userId: 4
    }
];

var reset = db.serialize(function () {

    db.run('DROP TABLE IF EXISTS drinks');
    db.run('DROP TABLE IF EXISTS users');
    db.run('DROP TABLE IF EXISTS nfctags');
    db.run('DROP TABLE IF EXISTS shopping');
    db.run('DROP TABLE IF EXISTS shoppingImages');

    console.log("------ DRINKS ------");
    // DRINKS
    db.run('CREATE TABLE drinks(id INTEGER PRIMARY KEY AUTOINCREMENT,name NOT NULL, price NOT NULL)');
    allDrinks.forEach(function (elem) {

        db.run("INSERT INTO drinks (name, price) VALUES(?,?)", elem.name, elem.costs);
        console.log(elem.name + " für " + elem.costs + "€ eingefügt");
    });



    console.log("------ USERS ------");
    // USERS
    db.run('CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, username NOT NULL)');
    usernames.forEach(function (elem) {

        db.run("INSERT INTO users (username) VALUES(?)", elem.username);
        console.log(elem.username + " eingefügt");
    });



    console.log("------ NFC-TAGS ------");
    // NFC-TAGS
    db.run('CREATE TABLE nfctags(id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, nfctag TEXT NOT NULL,' +
        'FOREIGN KEY(userId) REFERENCES users(id))');
    nfcTags.forEach(function (elem) {
        db.run("INSERT INTO nfctags (userId, nfctag) VALUES(?,?)", elem.userId, elem.nfcTag);
        console.log("UserId: " + elem.userId + "  mit NFCTag: " + elem.nfcTag + " eingefügt.");
    });


    console.log("------ SHOPPING ------");
    db.run('CREATE TABLE shopping(id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, totalCost REAL, date TEXT NOT NULL, ' +
        'FOREIGN KEY(userId) REFERENCES users(id))');

    shopping.forEach(function(elem) {
        if(elem.costs) {
            db.run("INSERT INTO shopping (userId, date, totalCost) VALUES(?,datetime('now'),?)", elem.userId, elem.costs);
            console.log("UserId: " + elem.userId + "  hat für " + elem.costs + "€ eingekauft.");
        } else {
            db.run("INSERT INTO shopping (userId, date) VALUES(?,datetime('now'))", elem.userId);
            console.log("UserId: " + elem.userId + "  hat eingekauft.");
        }
    });


    console.log("----- SHOPPING-IMAGES ------");
    db.run('CREATE TABLE shoppingImages(shoppingId INTEGER, fileUrl text, ' +
        'FOREIGN KEY(shoppingId) REFERENCES shopping(id))');


});

module.exports = reset;


