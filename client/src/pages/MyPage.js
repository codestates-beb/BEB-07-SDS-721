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

      <div className="ProfileInfo ml-[10em] mt-[15rem]">
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

      <div className="ml-[10em] mt-[10rem] h-7 w-28 rounded-md border-2 bg-gray text-center">
        Collected
      </div>

      <div className=" ml-[10em] flex flex-wrap">
        <div className="mr-[5rem] mt-[3rem]">
          <NftCard
            nft_img={sample1}
            nft_name="NFT Name"
            artist_name="NFT Artist"
            price="1.63"
          />
        </div>
      </div>

      <div className="ml-[10em] mt-[10rem] h-7 w-28 rounded-md border-2 bg-gray text-center">
        Created
      </div>

      <div className=" ml-[10em] mb-12 flex flex-wrap">
        <div className="mr-[5rem] mt-[3rem]">
          <NftCard
            nft_img={sample1}
            nft_name="NFT Name"
            artist_name="NFT Artist"
            price="1.63"
          />
        </div>
        <div className="mr-[5rem] mt-[3rem]">
          <NftCard
            nft_img={sample1}
            nft_name="NFT Name"
            artist_name="NFT Artist"
            price="1.63"
          />
        </div>
        <div className="mr-[5rem] mt-[3rem]">
          <NftCard
            nft_img={sample1}
            nft_name="NFT Name"
            artist_name="NFT Artist"
            price="1.63"
          />
        </div>
        <div className="mr-[5rem] mt-[3rem]">
          <NftCard
            nft_img={sample1}
            nft_name="NFT Name"
            artist_name="NFT Artist"
            price="1.63"
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
