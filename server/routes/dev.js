/* eslint-disable no-restricted-syntax */
const express = require('express');

const router = express.Router();
const { users, nfts } = require('../dummyData');

// nft routers
router.get('/nfts', (req, res, next) => {
  let data = nfts;
  if (req.query.sale === 'true') {
    data = data.filter((nft) => nft.sale === true);
  } else if (req.query.sale === 'false') {
    data = data.filter((nft) => nft.sale === false);
  }
  if (req.query.theme) {
    data = data.filter((nft) => nft.theme === req.query.theme);
  }
  return res.status(200).json(data);
});

router.get('/nfts/:tokenId', (req, res, next) => {
  const { tokenId } = req.params;
  const data = nfts.filter((nft) => nft.token_id === tokenId);
  if (data.length === 0) {
    return res
      .status(404)
      .json({ message: `no matching token_id : ${tokenId}` });
  }
  return res.status(200).json(data);
});

router.post('/nfts/:tokenId', (req, res, next) => {
  const { tokenId } = req.params;
  const data = nfts.filter((nft) => nft.token_id === tokenId)[0];
  if (data) {
    for (const key of Object.keys(req.body)) {
      data[key] = req.body[key];
    }
  }
  return res.status(200).json(data);
});

router.post('/nfts', (req, res, next) => {
  const { tokenId, imgLink, name, description, theme } = req.body;
  const nft = {
    token_id: tokenId,
    img_link: imgLink,
    name,
    description,
    theme,
    sale: false,
    price: -1,
    owner: 'u1',
    create: 'u1',
    transactions: ['tx7'],
  };
  nfts.push(nft);
  return res.status(201).json(nft);
});

// user routers
router.get('/users/my', (req, res, next) => {
  return res.status(200).json(users[0]);
});

router.post('/users', (req, res, next) => {
  const { nickname } = req.body;
  users.push({
    nickname,
    account: 'u4',
    collected: [],
    created: [],
  });
  return res.status(200).json(users[users.length - 1]);
});

router.post('/users/my', (req, res, next) => {
  const { nickname } = req.body;
  users[0].nickname = nickname;
  return res.status(200).json(users[0]);
});

router.get('/users/my/nfts', (req, res, next) => {
  const data = nfts.filter((nft) => nft.owner === users[0].account);
  return res.status(200).json(data);
});

router.get('/users/:account', (req, res, next) => {
  const { account } = req.params;
  const data = users.filter((user) => user.account === account);
  if (data.length === 0) {
    return res
      .status(404)
      .json({ message: `no matching user account : ${account}` });
  }
  return res.status(200).json(data);
});

// error routers
router.get('/error', (req, res, next) => {
  return res.status(400).json({ message: '400 error api called' });
});

router.get('/error/404', (req, res, next) => {
  return res.status(404).json({ message: '404 error api called' });
});

router.get('/error/500', (req, res, next) => {
  return res.status(500).json({ message: '500 error api called' });
});

module.exports = router;
