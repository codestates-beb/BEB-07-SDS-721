const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const nftSchema = new Schema({
  token_id: {
    type: String,
  },
  image_link: {
    type: String,
  },
  name: {
    type: String,
    default: 'unknown',
  },
  description: {
    type: String,
  },
  sale: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: -1,
  },
  theme: {
    type: String,
  },
  owner: {
    type: String,
  },
  creator: {
    type: String,
  },
  transactions: [String],
  created: {
    type: String,
    ref: 'User',
  },
});

module.exports = mongoose.model('Nft', nftSchema);
