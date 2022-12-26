const dummyData = {
  nfts: [
    {
      token_id: 't1',
      img_link: 'https://aws.com/seolNft.png',
      name: 'seol_nft',
      description: 'seol_nft_desc',
      sale: false,
      price: -1,
      theme: 'artist',
      owner: 'u1',
      creater: 'u1',
      transactsions: ['tx1', 'tx4'],
    },
    {
      token_id: 't2',
      img_link: 'https://aws.com/kwonNft.png',
      name: 'kwon',
      description: 'kwon_nft_desc',
      sale: true,
      price: 3,
      theme: 'video',
      owner: 'u2',
      creater: 'u2',
      transactsions: ['tx2', 'tx5'],
    },
    {
      token_id: 't3',
      img_link: 'https://aws.com/hongNft.png',
      name: 'hong_nft',
      description: 'hong_nft_desc',
      sale: false,
      price: -1,
      theme: 'sports',
      owner: 'u3',
      creater: 'u3',
      transactsions: ['tx3', 'tx6'],
    },
  ],
  users: [
    {
      nickname: 'seol',
      account: 'u1',
      collected: ['t1'],
      created: ['t1'],
    },
    {
      nickname: 'kwon',
      account: 'u2',
      collected: ['t2'],
      created: ['t2'],
    },
    {
      nickname: 'hong',
      account: 'u3',
      collected: ['t3'],
      created: ['t3'],
    },
  ],
};

module.exports = dummyData;
