const mongoose = require('mongoose');

const connect = () => {
  if (process.env.SERVER_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  mongoose.set('strictQuery', false);

  mongoose.connect(
    process.env.MONGO_URI,
    {
      dbName: 'SDS-721',
      // dbName: 'Production',
      useNewUrlParser: true,
    },
    (err) => {
      if (err) {
        console.log('MongoDB connection Fail', err);
      } else {
        console.log('MongoDB connection successful');
      }
    },
  );

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection Error', err);
  });

  mongoose.connection.on('disconnect', () => {
    console.error('MongoDB disconnected. Try connection');
    connect();
  });
};

module.exports = connect;
