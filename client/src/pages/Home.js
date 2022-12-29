import './Home.css';
import NftCard from 'components/features/NftCard';
import { useState, useEffect } from 'react';

import profile_sample from 'img/profile_sample.jpg';

const Home = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetch('http://3.38.208.33/nfts')
      .then((res) => res.json())
      .then((res) => {
        setNfts([...res]);
        console.log(res);
      });
  }, []);

  return (
    <div className="home">
      <div className="home-inner mx-auto mt-[19px] w-10/12">
        <p className="mx-auto mb-8 flex h-[84px] w-[900px] items-center justify-center text-6xl font-semibold">
          Explore, collect, and sell NFTs
        </p>
        <div className="grid grid-cols-fill-25 justify-center gap-y-12">
          {nfts.map((nft) => (
            <div className="mx-auto" key={nft.transactionHash}>
              <NftCard
                nft_img={nft.image}
                nft_name={nft.name}
                artist_name={nft.owner}
                artist_profile={profile_sample}
                price={nft.price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
