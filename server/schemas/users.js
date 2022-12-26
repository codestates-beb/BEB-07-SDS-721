const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  account: {
    type: String,
  },
  nickname: {
    type: String,
  },
  collected: [{ token_id: String }],
  created: [{ token_id: String }],
});

module.exports = mongoose.model('User', userSchema);
