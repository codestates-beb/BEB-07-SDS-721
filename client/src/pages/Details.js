import './Details.css';

import { useState, useEffect } from 'react';

import NftCard from 'components/features/NftCard';

import profile_sample from 'img/profile_sample.jpg';

const Details = () => {
  const [nft, setDetailNFT] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER}/nfts/0x16022D988442C70682e3566d09cd67d86e1b79e4/1`,
    )
      .then((res) => res.json())
      .then((res) => {
        setDetailNFT(res);
        console.log(res);
      });
  }, []);

  return (
    <div className="details flex min-h-screen gap-4">
      <div className="sidebar w-[400px] shrink-0 flex-col">
        <div className="m-[50px]">
          <NftCard
            nft_img={nft.image}
            nft_name={nft.name}
            artist_name={nft.creator}
            artist_profile={profile_sample}
            price="1.63"
          />
        </div>
        <input
          className="shadow-black mx-[50px] my-[10px] h-[45px] w-[300px] rounded-2xl border-2 font-semibold"
          placeholder="                  Enter your NFT price"
        ></input>
        <button className="shadow-black mx-[50px] h-[45px] w-[300px] rounded-2xl border-2 bg-blue">
          <h1 className="font-semibold text-white">Set a price</h1>
        </button>
      </div>
      <div className="description m-[50px] grow">
        <div className="mb-[5px] text-7xl">{nft.name}</div>
        <div className="text-1xl mt-[5px] font-extralight text-gray">
          Minted On Sep 30, 2022
        </div>
        <div className="mt-[30px] text-3xl text-gray">Created By</div>
        <div className="mt-[5px]">{nft.creator}</div>
        <div className="mt-[30px] text-3xl text-gray">Description</div>
        <div className="mt-[5px] text-3xl">{nft.description}</div>
      </div>
    </div>
  );
};

export default Details;
