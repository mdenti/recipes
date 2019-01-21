const createError = require('http-errors');
const express = require('express');
const expressSession = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const context = require('./context')();
const { configureAuthentication, requireUserLogin } = require('./passport');

const passport = configureAuthentication(context);

const indexRouter = require('./routes/index')(context);
const userRouter = require('./routes/users')(context, passport);
const recipesRouter = require('./routes/recipes')(context);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// TODO: set secret in env+config
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', userRouter);
app.use(requireUserLogin);
app.use('/api/recipes', recipesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler, requires all 4 arguments to work
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('There was an error in the application!');
  console.error(err);
});

module.exports = app;
