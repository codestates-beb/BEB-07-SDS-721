require('dotenv').config({ path: '../.env' });
const Web3 = require('web3');
const logger = require('../logger');
// const HDWalletProvider = require('@truffle/hdwallet-provider');

const { NETWORK, ADDRESS, PK, MNEMONIC, GOERLIURI, GOERLIWEBSOCKET } =
  process.env;
// const { abi, bytecode } = require('../build/contracts/Mung.json');

// const mungCA = '0x27431E26C75E5D60FA8b8c324d51EaAb66f222ae';
const web3 = new Web3(new Web3.providers.HttpProvider(GOERLIURI));
const web3Socket = new Web3(
  new Web3.providers.WebsocketProvider(GOERLIWEBSOCKET),
);

module.exports = {
  getTxInfo: async (txHash) => {
    const tx = await web3.eth.getTransaction(txHash);
    logger.info(tx);
  },

  getBlockInfo: async (blockNum) => {
    const blockInfo = await web3.eth.getBlock(blockNum);
    logger.info(blockInfo);
  },

  getBalanceOf: async (address) => {
    const balance = await web3.eth.getBalance(address);
    logger.info(balance);
  },

  blockListener: async () => {
    const blockSubscription = web3Socket.eth.subscribe(
      'newBlockHeaders',
      (err, blockHeader) => {
        logger.info(blockHeader);
      },
    );
  },

  txListener: async () => {
    const txSubscription = web3Socket.eth.subscribe(
      'pendingTransactions',
      (err, txHash) => {
        logger.info(txHash);
      },
    );
  },

  // not working, may be I should specify events from abi
  contractListener: async (abi, ca, from) => {
    const Contract = new web3Socket.eth.Contract(abi, ca);
    // logger.info(contract.methods.say);
    Contract.events
      .say({}, (err, event) => logger.info(err))
      .on('data', (event) => {
        logger.info('data set: ');
        logger.info(event);

        logger.info('extracting required data: ');
        logger.info(event.returnValues);
      });
  },
};
// blockListener();
// txListener();
// contractListener(abi, mungCA, ADDRESS);
