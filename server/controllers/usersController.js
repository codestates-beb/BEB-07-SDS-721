const { query } = require('express');
const User = require('../schemas/users');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { account } = req.body;
      let foundAccount = await User.findOne({ account });
      if (!foundAccount) {
        foundAccount = await User.create({ account });
      }
      return res.status(200).json(foundAccount);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
  myInfo: async (req, res, next) => {
    const myInfo = 'a12';
    const foundAccount = await User.findOne({ account: myInfo });
    if (!foundAccount) {
      return res.status(404).json({ message: 'no such user' });
    }
    console.log(foundAccount);
    return res.json(foundAccount);
  },
  userInfo: async (req, res, next) => {
    try {
      const { account } = req.params;
      const queryResult = await User.findOne({ account });
      if (!queryResult) {
        return res.status(404).json({ message: 'no such user' });
      }
      return res.status(200).json(queryResult);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
  userNfts: async (req, res, next) => {
    try {
      const { account } = req.params;
      const queryResult = await User.findOne({ account });
      if (!queryResult) {
        return res.status(404).json({ message: 'no such user' });
      }
      return res.status(200).json(queryResult.collected);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
};
