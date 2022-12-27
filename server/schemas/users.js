const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
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
  collected: [String],
  created: [String],
});

module.exports = mongoose.model('User', userSchema);
