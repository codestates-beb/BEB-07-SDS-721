import './Details.css';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import marketABI from 'chainUtils/marketNftABI';
import Contract from 'web3-eth-contract';

import NftCard from 'components/features/NftCard';

import profile_sample from 'img/profile_sample.jpg';
import spinner from 'img/loading.gif';

const Details = ({ account, web3 }) => {
  const location = useLocation();
  const { pathname } = location;

  const id = location.state.id;
  const address = location.state.address;
  const [nft, setDetailNFT] = useState([]);
  const [owner, setOwner] = useState(true);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    fetch(`http://3.38.27.39/nfts/${address}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setDetailNFT(res);
        // console.log(res);
        // console.log(account.toUpperCase);
        // console.log(res.owner.toUpperCase);
        if (!account || account.toUpperCase() === res.owner.toUpperCase()) {
          setOwner(false);
        }
      });
  }, []);

  async function buy() {
    try {
      const abi = marketABI;
      const address = '0x928f95240c039996F069358B2867903FDaf8afAb';
      Contract.setProvider(web3);
      const contract = new Contract(abi, address);
      const result = await contract.methods.executeSale(nft.tokenId).send({
        from: account,
        gasPrice: 6000000000,
        gas: 2100000,
        value: nft.price,
      });
      return result;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  const buyClick = async (e) => {
    setLoading(true);
    const res = await buy();
    setLoading(false);
    console.log(res);
  };

  return (
    <div className="details flex h-screen gap-4">
      <div
        className={`fixed top-0 flex ${
          isLoading ? '' : 'hidden'
        } z-50 h-[100vh] w-[100vw] items-center justify-center bg-black/10`}
      >
        <img className="" src={spinner} alt="no img"></img>
      </div>
      <div className="sidebar ml-[7rem] w-[400px] shrink-0 flex-col">
        <div className="m-[50px]">
          <NftCard
            nft_img={nft.image}
            nft_name={nft.name}
            artist_name={nft.owner}
            artist_profile={profile_sample}
            price={nft.price}
          />
        </div>
        <div>
          {owner ? (
            <button
              className="mx-[50px] h-[45px] w-[300px] rounded-2xl border-2 bg-blue font-semibold text-white shadow-black transition-all hover:scale-105 hover:cursor-pointer"
              onClick={buyClick}
            >
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
