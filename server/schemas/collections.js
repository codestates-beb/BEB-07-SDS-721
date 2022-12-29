const mongoose = require('mongoose');

const { Schema } = mongoose;
const collectionSchema = new Schema({
  contractAddress: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
  },
  symbol: {
    type: String,
  },
  owner: {
    type: String,
  },
});

module.exports = mongoose.model('Collection', collectionSchema);
