const mongoose = require('mongoose');
const logger = require('../logger');

const connect = () => {
  if (process.env.SERVER_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  mongoose.set('strictQuery', false);

  mongoose.connect(
    process.env.MONGO_URI,
    {
      // dbName: 'SDS-721',
      dbName: 'Production',
      useNewUrlParser: true,
    },
    (err) => {
      if (err) {
        logger.error('MongoDB connection Fail', err);
      } else {
        logger.info('MongoDB connection successful');
      }
    },
  );

  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB connection Error', err);
  });

  mongoose.connection.on('disconnect', () => {
    logger.error('MongoDB disconnected. Try connection');
    connect();
  });
};

module.exports = connect;
