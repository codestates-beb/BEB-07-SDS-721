const mongoose = require('mongoose');

const { Schema } = mongoose;
const transactionSchema = new Schema(
  {
    transactionHash: {
      type: String,
      required: true,
      unique: false,
    },
  },
  { collation: { locale: 'ko', strength: 2 } },
);

module.exports = mongoose.model('Transaction', transactionSchema);
