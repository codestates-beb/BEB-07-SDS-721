const User = require('../schemas/users');
const Nft = require('../schemas/nfts');
const dummyData = require('../dummyData');

module.exports = {
  uploadDummyNfts: async (req, res, next) => {
    const arr = dummyData.nfts;
    await Nft.create(arr[0]);
    await Nft.create(arr[1]);
    await Nft.create(arr[2]);
    return res
      .status(200)
      .json({ status: 'ok', message: 'nft data imported to db server' });
  },
  getAllNfts: async (req, res, next) => {
    const { theme, sale } = req.query;
    let foundNft;
    try {
      if (theme && sale) {
        foundNft = await Nft.find({ theme, sale });
      } else if (theme) {
        foundNft = await Nft.find({ theme });
      } else if (sale) {
        foundNft = await Nft.find({ sale });
      } else {
        foundNft = await Nft.find({});
      }
      return res.status(200).json(foundNft);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
  getContractNfts: async (req, res, next) => {
    const { contractAddress } = req.params;
    const { theme, sale } = req.query;
    let foundNft;
    try {
      if (theme && sale) {
        foundNft = await Nft.find({ contractAddress, theme, sale });
      } else if (theme) {
        foundNft = await Nft.find({ contractAddress, theme });
      } else if (sale) {
        foundNft = await Nft.find({ contractAddress, sale });
      } else {
        foundNft = await Nft.find({ contractAddress });
      }
      return res.status(200).json(foundNft);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
  getNft: async (req, res, next) => {
    try {
      const { contractAddress, tokenId } = req.params;
      const foundNft = await Nft.findOne({ contractAddress, tokenId });
      if (!foundNft) {
        return res
          .status(404)
          .json({ status: 'error', message: 'no such nft' });
      }
      return res.status(200).json(foundNft);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
  postNft: async (req, res, next) => {
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
};
