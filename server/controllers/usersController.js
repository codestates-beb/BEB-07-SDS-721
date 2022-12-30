const User = require('../schemas/users');
const Nft = require('../schemas/nfts');
const logger = require('../logger');

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
      logger.error(err);
      return next(err);
    }
  },
  myInfo: async (req, res, next) => {
    const myInfo = 'a1'; // TODO: make variable
    const foundAccount = await User.findOne({ account: myInfo });
    if (!foundAccount) {
      return res.status(404).json({ status: 'error', message: 'no such user' });
    }
    return res.json(foundAccount);
  },
  userInfo: async (req, res, next) => {
    try {
      const { account } = req.params;
      const queryResult = await User.findOne({ account });
      if (!queryResult) {
        return res
          .status(404)
          .json({ status: 'error', message: 'no such user' });
      }
      return res.status(200).json(queryResult);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  },

  allUserNfts: async (req, res, next) => {
    try {
      const { account } = req.params;
      const queryResult = await User.findOne({ account });
      if (!queryResult) {
        return res
          .status(404)
          .json({ status: 'error', message: 'no such user' });
      }
      const nfts = await Nft.find({
        _id: [...queryResult.collected, ...queryResult.created],
      });
      return res.status(200).json(nfts);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  },
  createdUserNfts: async (req, res, next) => {
    try {
      const { account } = req.params;
      const queryResult = await User.findOne({ account });
      if (!queryResult) {
        return res
          .status(404)
          .json({ status: 'error', message: 'no such user' });
      }
      const nfts = await Nft.find({
        _id: [...queryResult.created],
      });
      return res.status(200).json(nfts);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  },
  collectedUserNfts: async (req, res, next) => {
    try {
      const { account } = req.params;
      const queryResult = await User.findOne({ account });
      if (!queryResult) {
        return res
          .status(404)
          .json({ status: 'error', message: 'no such user' });
      }
      const nfts = await Nft.find({
        _id: [...queryResult.collected],
      });
      return res.status(200).json(nfts);
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  },
};
