const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const ejs = require('ejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const devRouter = require('./routes/dev.js');
// const nftsRouter = require('./routes/nfts');
// const usersRouter = require('./routes/users');

const app = express();
app.set('port', process.env.PORT || 5050);
app.set('view engine', 'ejs');
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

app.use('/dev', devRouter);
// app.use('/nfts', nftsRouter);
// app.use('/users', usersRouter);

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} There is no Router`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.json(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'is up and listening');
});

module.exports = app;
