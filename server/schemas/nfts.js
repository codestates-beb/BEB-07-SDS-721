const mongoose = require('mongoose');

const { Schema } = mongoose;
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
  collected: [{ token_id: String }],
  created: [{ token_id: String }],
});

module.exports = mongoose.model('Nft', nftSchema);
