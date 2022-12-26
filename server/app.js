const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
app.set('port', process.env.PORT || 80);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);

app.use((req, res, next) => {
  const error = new Error(`${req.mothod} ${req.url} There is no Router`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'is up and listening');
});
module.exports = app;
