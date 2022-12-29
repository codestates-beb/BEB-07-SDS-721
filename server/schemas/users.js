const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    account: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    nickname: {
      type: String,
      default: 'anonymous',
    },
    collected: {
      type: [Schema.Types.ObjectId],
      ref: 'Nft',
    },
    created: [Schema.Types.ObjectId],
  },
  { collation: { locale: 'ko', strength: 2 } },
);

module.exports = mongoose.model('User', userSchema);
