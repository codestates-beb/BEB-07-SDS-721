const express = require('express');
require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');
const ejs = require('ejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('./logger');

const connect = require('./schemas');

connect();

const nftsRouter = require('./routes/nfts');
const usersRouter = require('./routes/users');
const { MarketNftEventListener } = require('./web3/txEventListener');

const app = express();
app.set('port', process.env.PORT || 5050);
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
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

app.use('/users', usersRouter);
app.use('/nfts', nftsRouter);
app.use('/', (req, res) => {
  return res.json({
    status: 'ok',
    message: 'this is api for sds-721 project, please make valid api call',
  });
});

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
  logger.info(app.get('port'), 'is up and listening');
});

MarketNftEventListener();
module.exports = app;
