const express = require('express');
const {
  login,
  myInfo,
  userInfo,
  allUserNfts,
  createdUserNfts,
  collectedUserNfts,
} = require('../controllers/usersController');

const router = express.Router();

router.post('/login', login);
router.get('/my', myInfo);
router.get('/:account', userInfo);
router.get('/:account/nfts', allUserNfts);
router.get('/:account/created', createdUserNfts);
router.get('/:account/collected', collectedUserNfts);

module.exports = router;
