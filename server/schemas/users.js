const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  account: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    default: 'anonymous',
  },
  collected: [{ token_id: String }],
  created: [{ token_id: String }],
});

module.exports = mongoose.model('User', userSchema);
