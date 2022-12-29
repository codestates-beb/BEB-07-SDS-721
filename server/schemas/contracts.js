const mongoose = require('mongoose');

const { Schema } = mongoose;
const contractSchema = new Schema(
  {
    contractAddress: { type: String, required: true },
    tokenSymbol: String,
    contractMetaData: String,
    ABI: String,
  },
  {
    collation: { locale: 'ko', strength: 2 },
  },
);

module.exports = mongoose.model('Contract', contractSchema);
