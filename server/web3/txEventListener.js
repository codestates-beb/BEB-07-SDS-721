/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
const Web3 = require('web3');
const axios = require('axios');

const logger = require('../logger');
const Nft = require('../schemas/nfts');
const User = require('../schemas/users');
const Transaction = require('../schemas/transactions');
const Collection = require('../schemas/collections');
const marketV2ABI = require('./ABIs/marketV2ABI');

const { MARKETV2CA, GOERLIWEBSOCKET, GOERLIURI } = process.env;

const web3Socket = new Web3(
  new Web3.providers.WebsocketProvider(GOERLIWEBSOCKET),
);
const web3Http = new Web3(new Web3.providers.HttpProvider(GOERLIURI));

const getTxData = async (txHash) => {
  const result = await web3Http.eth.getTransaction(txHash);
  return result;
};

const getTokenURIData = async (tokenURI) => {
  logger.info({ tokenURI });
  const result = await axios.get(tokenURI);
  return result.data;
};

const updateUserDB = async (account) => {
  const user = await User.findOneAndUpdate(
    { account },
    {
      upsert: true,
    },
  );
  return user;
};

const updateNftDB = async (tokenData) => {
  if (tokenData.txType === 'mint') {
    const { contractAddress, tokenId, creator, owner } = tokenData;
    const nft = await Nft.findOneAndUpdate(
      { contractAddress, tokenId },
      tokenData,
      {
        upsert: true,
      },
    );
    await User.updateOne(
      { account: creator },
      { $addToSet: { created: nft._id } },
    );
    await User.updateOne(
      { account: owner },
      { $addToSet: { collected: nft._id } },
    );
    return nft;
  }
  const { contractAddress, tokenId, owner } = tokenData;
  let nft = await Nft.findOne({ contractAddress, tokenId });
  if (!nft) {
    logger.info('Sale TX no such nft found');
    return null;
  }
  logger.info('Sale TX nft found, update existing one');
  const newOwner = owner;
  const oldOwner = nft.owner;
  tokenData.creator = nft.creator;
  nft = await Nft.findOneAndUpdate({ contractAddress, tokenId }, tokenData);

  await User.updateOne(
    { account: oldOwner },
    { $pull: { collected: nft._id } },
  );
  await User.updateOne(
    { account: newOwner },
    { $addToSet: { collected: nft._id } },
  );
  return nft;
};

const updateCollectionDB = async (Contract, tokenData) => {
  const { contractAddress } = tokenData;
  let collection = await Collection.findOne({ contractAddress });
  if (!collection) {
    logger.info('collection not found on db, creating');
    const name = await Contract.methods.name().call();
    const symbol = await Contract.methods.symbol().call();

    let owner;
    const pattern = /Market/;
    if (pattern.test(name)) {
      owner = await Contract.methods.getOwner().call();
    } else {
      owner = await Contract.methods.owner().call();
    }
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
  MarketNftEventListener: () => {
    try {
      const Contract = new web3Socket.eth.Contract(marketV2ABI, MARKETV2CA);
      Contract.events.Transfer().on('data', async (event) => {
        const { transactionHash, address, returnValues } = event;
        const isExist = await Transaction.findOne({ transactionHash });
        if (isExist) {
          logger.info(`TransactionHash : ${transactionHash} Already processed`);
          return;
        }
        await Transaction.create({ transactionHash });

        const { tokenId } = returnValues;
        // get metadata of minted nft with web3 call
        const tokenURI = await Contract.methods.tokenURI(tokenId).call();

        const txData = await getTxData(transactionHash);
        const tokenData = await getTokenURIData(tokenURI);
        // logger.info({ event });
        // logger.info({ txData });

        const queryTokenData = await Contract.methods
          .getListedTokenForId(tokenId)
          .call();
        logger.info(queryTokenData);
        console.assert(
          tokenId === queryTokenData[0],
          'tokenId and data is not matching',
        );

        tokenData.contractAddress = address;
        tokenData.tokenId = tokenId;
        tokenData.transactionHash = transactionHash;
        tokenData.tokenURI = tokenURI;
        tokenData.sale = queryTokenData.currentlyListed;
        tokenData.price = queryTokenData.price;

        if (txData.input.length >= 330) {
          tokenData.txType = 'mint';
          tokenData.creator = txData.from;
          tokenData.owner = queryTokenData.seller;
        } else {
          tokenData.txType = 'sale';
          tokenData.owner = txData.from;
          tokenData.creator = null;
        }
        logger.info({ tokenData });

        await updateCollectionDB(Contract, tokenData);
        await updateUserDB(tokenData.owner);
        if (tokenData.creator) {
          await updateUserDB(tokenData.creator);
        }
        await updateNftDB(tokenData);
      });
    } catch (err) {
      logger.error(err);
    }
  },
};
