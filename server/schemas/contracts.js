const mongoose = require('mongoose');

const { Schema } = mongoose;
const contractSchema = new Schema({
  contractAddress: { type: String, required: true },
  tokenSymbol: String,
  contractMetaData: String,
});

module.exports = mongoose.model('Contract', contractSchema);
