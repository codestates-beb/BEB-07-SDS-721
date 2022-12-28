/* eslint-disable no-underscore-dangle */
const Web3 = require('web3');
const axios = require('axios');
const Nft = require('../schemas/nfts');
const User = require('../schemas/users');
const Collection = require('../schemas/collections');
const sds721ABI = require('../chainUtils/sds721ABI');
const womanNftABI = require('../chainUtils/womanNftABI');

const { SDS721CA } = process.env;
const { WOMANNFTCA } = process.env;
const GOERLIWEBSOCKET =
  'wss://goerli.infura.io/ws/v3/f09f2f4de3164c8eb1a057b84bae7113';

// TODO : make below variable
const sdhAddress = '0x7C54f2BC695d540887B0975FEFe36E4a74b66f26';
const kwonAddress = '0x5573A5eD2211BB01F924Ac9303CaEa06883865c1';

const web3 = new Web3(new Web3.providers.WebsocketProvider(GOERLIWEBSOCKET));

const getTokenURIData = async (tokenURI) => {
  try {
    const result = await axios.get(tokenURI);
    console.log(result.data);
    return result.data;
  } catch (err) {
    return null;
  }
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
    const Contract = new web3.eth.Contract(sds721ABI, SDS721CA);
    Contract.events.Transfer().on('data', async (event) => {
      const { transactionHash, address, returnValues } = event;
      const { tokenId, to } = returnValues;
      // get metadata of minted nft with web3 call
      const tokenURI = await Contract.methods.tokenURI(tokenId).call();

      const tokenData = await getTokenURIData(tokenURI);
      tokenData.contractAddress = address;
      tokenData.tokenId = tokenId;
      tokenData.transactionHash = transactionHash;
      tokenData.tokenURI = tokenURI;
      tokenData.owner = to;
      tokenData.creator = sdhAddress; // TODO make variable

      await updateCollectionDB(Contract, tokenData);
      await updateUserDB(tokenData.owner);
      await updateUserDB(tokenData.creator);
      await updateNftDB(tokenData);
    });
  },
  womanNftEventListener: () => {
    const Contract = new web3.eth.Contract(womanNftABI, WOMANNFTCA);
    Contract.events.Transfer().on('data', async (event) => {
      const { transactionHash, address, returnValues } = event;
      const { tokenId, to } = returnValues;
      // get metadata of minted nft with web3 call
      const tokenURI = await Contract.methods.tokenURI(tokenId).call();

      const tokenData = await getTokenURIData(tokenURI);
      tokenData.contractAddress = address;
      tokenData.tokenId = tokenId;
      tokenData.transactionHash = transactionHash;
      tokenData.tokenURI = tokenURI;
      tokenData.owner = to;
      tokenData.creator = kwonAddress; // TODO make variable

      await updateCollectionDB(Contract, tokenData);
      await updateUserDB(tokenData.owner);
      await updateUserDB(tokenData.creator);
      await updateNftDB(tokenData);
    });
  },
};
