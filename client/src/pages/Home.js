import './Home.css';
import NftCard from 'components/features/NftCard';
import { useState, useEffect } from 'react';

import sample1 from 'img/card_sample_1.jpg';
import sample2 from 'img/card_sample_2.jpg';
import sample3 from 'img/card_sample_3.jpg';
import sample4 from 'img/card_sample_4.jpg';
import profile_sample from 'img/profile_sample.jpg';

const Home = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetch('http://snowdelver.iptime.org/nfts')
      .then((res) => res.json())
      .then((res) => {
        setNfts([...res]);
        console.log(res);
      });
  }, []);

  return (
    <div className="home">
      <div className="home-inner mx-auto mt-[19px] w-10/12">
        <p className="mx-auto mb-8 flex h-[84px] w-[876px] items-center justify-center text-6xl font-semibold">
          Explore, collect, and sell NFTs
        </p>
        <div className="grid grid-cols-fill-25 justify-center gap-y-12">
          {nfts.map((nft) => (
            <div className="mx-auto">
              <NftCard
                nft_img={nft.image}
                nft_name={nft.name}
                artist_name={nft.creater}
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
