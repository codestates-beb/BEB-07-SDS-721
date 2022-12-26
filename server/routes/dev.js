const express = require('express');
const router = express.Router();
const { users, nfts } = require('../dummyData');

router.get('/nfts', (req, res, next) => {
  return res.status(200).json(nfts);
});

router.get('/nfts/:token_id', (req, res, next) => {
  const token_id = req.params.token_id;
  const data = nfts.filter((nft) => nft.token_id === token_id);
  if (data.length === 0) {
    return res
      .status(404)
      .json({ message: `no matching token_id : ${token_id}` });
  }
  return res.status(200).json(data);
});

router.post('/nfts', (req, res, next) => {
  const { token_id, img_link, name, description, theme } = req.body;
  const nft = {
    token_id,
    img_link,
    name,
    description,
    theme,
    sale: false,
    price: -1,
    owner: 'u1',
    create: 'u1',
    transactions: ['tx7'],
  };
  return res.status(201).json(nft);
});
router.get('/users/:account', (req, res, next) => {
  const account = req.params.account;
  const data = users.filter((user) => user.account === account);
  if (data.length === 0) {
    return res
      .status(404)
      .json({ message: `no matching user account : ${account}` });
  }
  return res.status(200).json(data);
});

router.get('/users', (req, res, next) => {
  return res.status(200).json(users);
});
// router.get('/nfts/:id');
// router.post('/nfts');
// router.get('/users/my');
// router.get('/users/my/nft');
// router.get('/users/:id');
// router.get('/error/404');
// router.get('/error/500');

module.exports = router;
