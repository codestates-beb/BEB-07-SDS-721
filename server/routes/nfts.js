const express = require('express');
const {
  getAllNfts,
  getContractNfts,
  mintNft,
  getNft,
} = require('../controllers/nftsController');

const router = express.Router();

router.get('/', getAllNfts);
router.get('/:contractAddress', getContractNfts);
router.get('/:contractAddress/:tokenId', getNft);
router.post('/:contractAddress', mintNft);

module.exports = router;
