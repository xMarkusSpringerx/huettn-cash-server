var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./settings/db.js');

/* ROUTES */
var index = require('./routes/index');
var drinks = require('./routes/drinks');
var users = require('./routes/users');
var shopping = require('./routes/shopping');

var reset = require('./settings/reset');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

db.serialize(function () {

    // Uncomment if production

    //db.run('CREATE TABLE drinks (name TEXT, price REAL)');

    reset;

    /*
     var stmt = db.prepare('INSERT INTO lorem VALUES (?)');
     for (var i = 0; i < 10; i++) {
     stmt.run('Ipsum ' + i)
     }
     stmt.finalize();
     */

});


/* ROUTES */
app.use('/', index);
app.use('/drinks', drinks);
app.use('/users', users);
app.use('/shopping', shopping);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
