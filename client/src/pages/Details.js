import './Details.css';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import NftCard from 'components/features/NftCard';

import profile_sample from 'img/profile_sample.jpg';

const Details = ({ account }) => {
  const location = useLocation();
  const { pathname } = location;

  const id = location.state.id;
  const address = location.state.address;
  const [nft, setDetailNFT] = useState([]);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    fetch(`http://3.38.208.33/nfts/${address}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setDetailNFT(res);
        console.log(res);
        console.log(account);
        if (account === res.owner) {
          setOwner(true);
        }
      });
  }, []);

  return (
    <div className="details flex h-screen gap-4">
      <div className="sidebar ml-[7rem] w-[400px] shrink-0 flex-col">
        <div className="m-[50px]">
          <NftCard
            nft_img={nft.image}
            nft_name={nft.name}
            artist_name={nft.creator}
            artist_profile={profile_sample}
            price="1.63"
          />
        </div>
        <div>
          {owner ? (
            <button className="mx-[50px] h-[45px] w-[300px] rounded-2xl border-2 bg-blue font-semibold text-white shadow-black transition-all hover:scale-105 hover:cursor-pointer">
              Buy This NFT !
            </button>
          ) : (
            <button className="hidden font-semibold text-black">
              You are not owner!!!!!!!!!!!!!
            </button>
          )}
        </div>
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
