require('dotenv').config({ path: '../.env' });
const Web3 = require('web3');
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
    console.log(tx);
  },

  getBlockInfo: async (blockNum) => {
    const blockInfo = await web3.eth.getBlock(blockNum);
    console.log(blockInfo);
  },

  getBalanceOf: async (address) => {
    const balance = await web3.eth.getBalance(address);
    console.log(balance);
  },

  blockListener: async () => {
    const blockSubscription = web3Socket.eth.subscribe(
      'newBlockHeaders',
      (err, blockHeader) => {
        console.log(blockHeader);
      },
    );
  },

  txListener: async () => {
    const txSubscription = web3Socket.eth.subscribe(
      'pendingTransactions',
      (err, txHash) => {
        console.log(txHash);
      },
    );
  },

  // not working, may be I should specify events from abi
  contractListener: async (abi, ca, from) => {
    const Contract = new web3Socket.eth.Contract(abi, ca);
    // console.log(contract.methods.say);
    Contract.events
      .say({}, (err, event) => console.log(err))
      .on('data', (event) => {
        console.log('data set: ');
        console.log(event);

        console.log('extracting required data: ');
        console.log(event.returnValues);
      });
  },
};
// blockListener();
// txListener();
// contractListener(abi, mungCA, ADDRESS);
