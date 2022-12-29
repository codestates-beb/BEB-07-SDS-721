const mongoose = require('mongoose');

const { Schema } = mongoose;

const nftSchema = new Schema(
  {
    contractAddress: {
      type: String,
      required: true,
      index: true,
    },
    tokenId: {
      type: String,
      required: true,
      index: true,
    },
    image: {
      type: String,
    },
    attributes: {
      type: Array,
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
      default: true,
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
    transactionHash: {
      type: String,
    },
  },
  {
    collation: { locale: 'ko', strength: 2 },
  },
);

module.exports = mongoose.model('Nft', nftSchema);
