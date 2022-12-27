const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const nftSchema = new Schema({
  contractAddress: {
    type: String,
    required: true,
  },
  tokenId: {
    type: String,
    required: true,
  },
  imageLink: {
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
    ref: 'User',
  },
  creator: {
    type: String,
    ref: 'User',
  },
  transactions: [String],
  created: {
    type: String,
    ref: 'User',
  },
});

module.exports = mongoose.model('Nft', nftSchema);
