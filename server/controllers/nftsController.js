const fs = require('fs');
const User = require('../schemas/users');
const Nft = require('../schemas/nfts');

module.exports = {
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
  mintNft: async (req, res, next) => {
    // ipfs uri : https://ipfs.io/ipfs/QmdnbubfpnwV9SVH3f2c6rh2q8QFt76AUdbW8W68UoLid9
    const { contractAddress } = req.params;
    if (!contractAddress) {
      return res.status(403).json({
        status: 'error',
        message: 'valid contract address must be provided',
      });
    }
    const { name, description, image, attributes } = req.body;
    if (!name && !description && !image && !attributes) {
      return res
        .status(403)
        .json({ status: 'error', message: 'input all values' });
    }
    const uploadMetaData = { name, description, image, attributes };
    fs.writeFileSync('../test.json', JSON.stringify(uploadMetaData));
    // 1. req body에서 입력을 받는다.
    // 1-1. img업로드를 대신해줄수도 있다. 이건 나중에 구현한다.
    // 2. 정보를 조합해서 json파일로 만든다.
    // 3. 받은 정보를 s3에 업로드한다.
    // 4. s3에 업로드된 uri를 가져온다
    // 5. 해당 uri로 web3 mint를 호출한다.
    // 6. 결과를 반환한다.
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
