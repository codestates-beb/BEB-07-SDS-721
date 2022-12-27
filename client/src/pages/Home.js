import './Home.css';
import NftCard from 'components/features/NftCard';

import sample1 from 'img/card_sample_1.jpg';
import sample2 from 'img/card_sample_2.jpg';
import sample3 from 'img/card_sample_3.jpg';
import sample4 from 'img/card_sample_4.jpg';
import profile_sample from 'img/profile_sample.jpg';

const Home = () => {
  return (
    <div className="home mb-28">
      <div className="home-inner mx-auto mt-[19px] w-4/5">
        <p className="mx-auto mb-8 flex h-[84px] w-[876px] items-center justify-center text-6xl font-semibold">
          Explore, collect, and sell NFTs
        </p>
        <div className="flex h-[387px] ">
          <div className="mr-[50px] flex-1">
            <NftCard
              nft_img={sample1}
              nft_name="NFT Name"
              artist_name="NFT Artist"
              artist_profile={profile_sample}
              price="1.63"
            />
          </div>
          <div className="mr-[50px] flex-1">
            <NftCard
              nft_img={sample2}
              nft_name="NFT Name"
              artist_name="NFT Artist"
              artist_profile={profile_sample}
              price="1.63"
            />
          </div>
          <div className="mr-[50px] flex-1">
            <NftCard
              nft_img={sample3}
              nft_name="NFT Name"
              artist_name="NFT Artist"
              artist_profile={profile_sample}
              price="1.63"
            />
          </div>
          <div className="flex-1">
            <NftCard
              nft_img={sample4}
              nft_name="NFT Name"
              artist_name="NFT Artist"
              artist_profile={profile_sample}
              price="1.63"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
