const express = require('express');

const router = express.Router();
const User = require('../schemas/users');

console.log(User);
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;
