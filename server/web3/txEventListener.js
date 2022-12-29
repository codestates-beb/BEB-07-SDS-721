/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
const Web3 = require('web3');
const axios = require('axios');
const wait = require('wwait');
const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

const Nft = require('../schemas/nfts');
const User = require('../schemas/users');
const Collection = require('../schemas/collections');
const sds721ABI = require('../chainUtils/sds721ABI');
const womanNftABI = require('../chainUtils/womanNftABI');
const dogNftABI = require('../chainUtils/dogNftABI');

const { SDS721CA, WOMANNFTCA, DOGNFTCA, GOERLIWEBSOCKET, GOERLIURI } =
  process.env;

// const GOERLIWEBSOCKET =
//   'wss://goerli.infura.io/ws/v3/f09f2f4de3164c8eb1a057b84bae7113';
// const { GOERLIURI } = process.env;

const web3Socket = new Web3(
  new Web3.providers.WebsocketProvider(GOERLIWEBSOCKET),
);
const web3Http = new Web3(new Web3.providers.HttpProvider(GOERLIURI));

const getTxData = async (txHash) => {
  const result = await web3Http.eth.getTransaction(txHash);
  return result;
};

const getTokenURIData = async (tokenURI) => {
  console.log({ tokenURI });
  const data = await fetch(tokenURI, {
    retries: 10,
    retryDelay: 5000,
  });
  // while (!data) {
  //   wait(2000);
  //   try {
  //     const result = await axios.get(tokenURI);
  //     console.log('getTokendata get request result', result);
  //     data = result.data;
  //   } catch (err) {
  //     data = null;
  //     console.log(Date.now());
  //     console.log('getTokenUriData error thrown', err);
  //   }
  // }
  console.log('found data from tokenURI', data);
  return data;
};

const updateUserDB = async (account) => {
  // 1. db에서 유저 조회한다.
  let user = await User.findOne({ account });
  if (!user) {
    user = await User.create({ account });
  }
  return user;
};

const updateNftDB = async (tokenData) => {
  const { contractAddress, tokenId, creator, owner } = tokenData;
  let nft = await Nft.findOne({ contractAddress, tokenId });
  console.log('is nft found?', nft);
  if (!nft) {
    console.log('no such nft found');
    nft = await Nft.create(tokenData);
  } else {
    console.log('nft found, update existing one');
    nft.updateOne({ tokenData }); // TODO: potential bug point, NOT FIXED.
  }
  await User.updateOne(
    { account: creator },
    { $addToSet: { created: nft._id } },
  );
  await User.updateOne(
    { account: owner },
    { $addToSet: { collected: nft._id } },
  );
  return nft;
};

const updateCollectionDB = async (Contract, tokenData) => {
  const { contractAddress } = tokenData;
  let collection = await Collection.findOne({ contractAddress });
  if (!collection) {
    console.log('collection not found on db, creating');
    const name = await Contract.methods.name().call();
    const symbol = await Contract.methods.symbol().call();
    const owner = await Contract.methods.owner().call();
    collection = await Collection.create({
      contractAddress,
      name,
      symbol,
      owner,
    });
  }
  return collection;
};

module.exports = {
  sds721EventListener: () => {
    try {
      const Contract = new web3Socket.eth.Contract(sds721ABI, SDS721CA);
      Contract.events.Transfer().on('data', async (event) => {
        const { transactionHash, address, returnValues } = event;
        const { tokenId, to } = returnValues;
        const tokenURI = await Contract.methods.tokenURI(tokenId).call();

        const txData = await getTxData(transactionHash);
        const tokenData = await getTokenURIData(tokenURI);

        tokenData.contractAddress = address;
        tokenData.tokenId = tokenId;
        tokenData.transactionHash = transactionHash;
        tokenData.tokenURI = tokenURI;
        tokenData.owner = to;
        tokenData.creator = txData.from; // TODO make variable

        await updateCollectionDB(Contract, tokenData);
        await updateUserDB(tokenData.owner);
        await updateUserDB(tokenData.creator);
        await updateNftDB(tokenData);
      });
    } catch (err) {
      console.error(err);
    }
  },
  womanNftEventListener: () => {
    try {
      const Contract = new web3Socket.eth.Contract(womanNftABI, WOMANNFTCA);
      Contract.events.Transfer().on('data', async (event) => {
        const { transactionHash, address, returnValues } = event;
        const { tokenId, to } = returnValues;
        // get metadata of minted nft with web3 call
        const tokenURI = await Contract.methods.tokenURI(tokenId).call();

        const txData = await getTxData(transactionHash);
        const tokenData = await getTokenURIData(tokenURI);

        tokenData.contractAddress = address;
        tokenData.tokenId = tokenId;
        tokenData.transactionHash = transactionHash;
        tokenData.tokenURI = tokenURI;
        tokenData.owner = to;
        tokenData.creator = txData.from; // TODO make variable

        await updateCollectionDB(Contract, tokenData);
        await updateUserDB(tokenData.owner);
        await updateUserDB(tokenData.creator);
        await updateNftDB(tokenData);
      });
    } catch (err) {
      console.error(err);
    }
  },
  dogNftEventListener: () => {
    try {
      const Contract = new web3Socket.eth.Contract(dogNftABI, DOGNFTCA);
      Contract.events.Transfer().on('data', async (event) => {
        const { transactionHash, address, returnValues } = event;
        const { tokenId, to } = returnValues;
        // get metadata of minted nft with web3 call
        const tokenURI = await Contract.methods.tokenURI(tokenId).call();

        const txData = await getTxData(transactionHash);
        const tokenData = await getTokenURIData(tokenURI);

        tokenData.contractAddress = address;
        tokenData.tokenId = tokenId;
        tokenData.transactionHash = transactionHash;
        tokenData.tokenURI = tokenURI;
        tokenData.owner = to;
        tokenData.creator = txData.from; // TODO make variable

        await updateCollectionDB(Contract, tokenData);
        await updateUserDB(tokenData.owner);
        await updateUserDB(tokenData.creator);
        await updateNftDB(tokenData);
      });
    } catch (err) {
      console.error(err);
    }
  },
};
