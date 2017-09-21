var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('huettn.db');


module.exports = db;