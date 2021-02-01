var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
const carRouter = require('./routes/carRoute');
const rentRouter = require('./routes/rentRoute');
const clientRouter = require('./routes/clientRoute');

const clientApiRouter = require('./routes/api/ClientApiRoute');
const carApiRouter = require('./routes/api/CarApiRoute');
const rentApiRouter = require('./routes/api/RentApiRoute');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));

const i18n = require('i18n');
i18n.configure({
    locales : ['pl', 'en'],
    register:global,
    directory:path.join(__dirname, 'locales'),
    defaultLocale: "pl",
    objectNotation : true,
    cookie: 'dow-lang',
});
app.use(i18n.init);

app.use((req, res, next) => {
    if(!res.locals.lang) {
        const currentLang = req.cookies['dow-lang'];
        res.locals.lang = currentLang;
    }
    next();
});


app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));
app.use(flash());

app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if(!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
});

const authUtil = require("./util/authUtils");

app.use('/', indexRouter);
app.use('/cars', authUtil.permitAuthenticatedUser, carRouter);
app.use('/rents', authUtil.permitAuthenticatedUser,rentRouter);
app.use('/clients', authUtil.permitAuthenticatedUser, clientRouter);

app.use('/api/clients', clientApiRouter);
app.use('/api/cars', carApiRouter);
app.use('/api/rents', rentApiRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
      console.log(err);
    });

app.use( function(req, res, next) {

    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
        return res.sendStatus(204);
    }

    return next();

});

module.exports = app;
