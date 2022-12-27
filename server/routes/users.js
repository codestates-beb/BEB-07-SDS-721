const express = require('express');
const {
  login,
  myInfo,
  userInfo,
  userNfts,
} = require('../controllers/usersController');

const router = express.Router();

router.post('/login', login);
router.get('/my', myInfo);
router.get('/:account', userInfo);
router.get('/:account/nfts', userNfts);

module.exports = router;
