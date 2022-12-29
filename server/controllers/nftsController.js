const fs = require('fs');
require('dotenv').config({ path: '../.env' });
const AWS = require('aws-sdk');
const Web3 = require('web3');
const logger = require('../logger');
const Nft = require('../schemas/nfts');
const sds721ABI = require('../web3/ABIs/sds721ABI');
const womanNftABI = require('../web3/ABIs/womanNftABI');

const { SDS721CA, WOMANNFTCA, SEOLPK, GOERLIURI } = process.env;

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const s3Upload = async (fileName) => {
  const s3 = new AWS.S3();
  const fileContent = fs.readFileSync(`./metadataFiles/${fileName}`);
  const params = {
    Bucket: 'sds-721',
    Key: fileName,
    Body: fileContent,
  };
  s3.upload(params, (err, data) => {
    if (err) throw err;
  });
};

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
      logger.error(err);
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
      logger.error(err);
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
      logger.error(err);
      return next(err);
    }
  },
  mintNft: async (req, res, next) => {
    try {
      const { contractAddress } = req.params;
      if (!contractAddress) {
        return res.status(403).json({
          status: 'error',
          message: 'valid contract address must be provided',
        });
      }

      let CA;
      let ABI;
      let PK;

      if (contractAddress === SDS721CA) {
        logger.info('contract is SDS721');
        CA = SDS721CA;
        ABI = sds721ABI;
        PK = SEOLPK;
      } else if (contractAddress === WOMANNFTCA) {
        logger.info('contract is womanNFT');
        CA = WOMANNFTCA;
        ABI = womanNftABI;
        PK = SEOLPK;
      } else {
        return res.status(403).json({
          status: 'error',
          message: 'contractAddress should be registered on server first',
        });
      }

      const web3 = new Web3(new Web3.providers.HttpProvider(GOERLIURI));
      const contract = new web3.eth.Contract(ABI, CA);

      const { recipient, name, description, image, attributes } = req.body;
      if (!recipient && !name && !description && !image && !attributes) {
        return res
          .status(403)
          .json({ status: 'error', message: 'you must input all values' });
      }
      // 2. 정보를 조합해서 json파일로 만든다.
      const uploadMetaData = { name, description, image, attributes };
      const filename = `${Date.now()}.json`;
      fs.writeFileSync(
        `./metadataFiles/${filename}`,
        JSON.stringify(uploadMetaData),
      );
      // 3. 받은 정보를 s3에 업로드한다.
      s3Upload(filename);
      // 4. s3에 업로드된 uri를 가져온다
      const metadataURI = `https://sds-721.s3.ap-northeast-2.amazonaws.com/${filename}`;
      const account = await web3.eth.accounts.privateKeyToAccount(PK);
      const bytedata = await contract.methods
        .mintNFT(recipient, metadataURI)
        .encodeABI(); // 5. 해당 uri로 web3 mint를 호출한다.
      const tx = {
        from: account.address,
        to: CA,
        gas: 1000000,
        gasPrice: '21000000000',
        data: bytedata,
      };
      const signedTx = await account.signTransaction(tx);
      const sentTx = await web3.eth.sendSignedTransaction(
        signedTx.raw || signedTx.rawTransaction,
      );
      logger.info('MINTING SUCCESSFUL');
      logger.info(sentTx);
      // 6. 결과를 반환한다.
      return res.status(200).json({ sentTx });
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  },
};
