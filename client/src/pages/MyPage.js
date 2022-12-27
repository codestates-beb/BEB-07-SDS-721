import './MyPage.css';

import NftCard from 'components/features/NftCard';
import MyPageSample1 from 'img/myPage_sample_1.png';
import MyPageSample2 from 'img/myPage_sample_2.png';

import sample1 from 'img/card_sample_1.jpg';

const MyPage = () => {
  return (
    <div className="mypage">
      <figure className="relative">
        <img
          className="mypageBackGround object-fit: cover w-screen"
          alt="mypageBackGround"
          src={MyPageSample1}
        />
        <img
          className="ProfilePic absolute bottom-[-10rem] ml-[10em] h-auto w-52 max-w-full rounded-[2.5rem] border-2"
          alt="ProfilePic"
          src={MyPageSample2}
        />
      </figure>

      <div className="mypage-inner ml-[10em]">
        <div className="ProfileInfo mt-[15rem]">
          <div className="text-6xl">Atoye</div>
          <div className="mt-10">
            <div className="text-3xl text-gray">Bio</div>
            <div>The Blockchain's Creative Engineer</div>
          </div>
          <div className="mt-10">
            <div className="text-3xl text-gray">Account</div>
            <div>0x247b669cbdd58fca982dbf337c5d94880852e3fa</div>
          </div>
        </div>

        <div className="mt-[10rem] h-7 w-28 rounded-md border-2 bg-gray-light text-center">
          Collected
        </div>

        <div className="mt-[3rem] grid grid-cols-fill-25 justify-start">
          <div className="">
            <NftCard
              nft_img={sample1}
              nft_name="NFT Name"
              artist_name="NFT Artist"
              price="1.63"
            />
          </div>
        </div>

        <div className="mt-[10rem] h-7 w-28 rounded-md border-2 bg-gray-light text-center">
          Created
        </div>

        <div className="mt-[3rem] grid grid-cols-fill-25 justify-start gap-y-12">
          <div className="">
            <NftCard
              nft_img={sample1}
              nft_name="NFT Name"
              artist_name="NFT Artist"
              price="1.63"
            />
          </div>
          <div className="">
            <NftCard
              nft_img={sample1}
              nft_name="NFT Name"
              artist_name="NFT Artist"
              price="1.63"
            />
          </div>
          <div className="">
            <NftCard
              nft_img={sample1}
              nft_name="NFT Name"
              artist_name="NFT Artist"
              price="1.63"
            />
          </div>
          <div className="">
            <NftCard
              nft_img={sample1}
              nft_name="NFT Name"
              artist_name="NFT Artist"
              price="1.63"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
