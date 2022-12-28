const express = require('express');
const {
  getAllNfts,
  getContractNfts,
  postNft,
  getNft,
  uploadDummyNfts,
} = require('../controllers/nftsController');

const router = express.Router();

router.get('/', getAllNfts);
router.get('/:contractAddress', getContractNfts);
router.get('/:contractAddress/:tokenId', getNft);
router.post('/:contractAddress/:tokenId', postNft);

module.exports = router;
