import './MyPage.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import NftCard from 'components/features/NftCard';
import ScrollButton from 'components/features/ScrollButton';
import MyPageSample1 from 'img/myPage_sample_1.png';
import MyPageSample2 from 'img/myPage_sample_2.png';
import profile_sample from 'img/profile_sample.jpg';

const MyPage = ({ account }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [collected, setCollect] = useState([]);
  const [created, setCreate] = useState([]);

  useEffect(() => {
    fetch(`http://3.38.208.33/users/${account}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
        // console.log(res);
      });

    fetch(`http://3.38.208.33/users/${account}/collected`)
      .then((res) => res.json())
      .then((res) => {
        setCollect([...res]);
        // console.log(res);
      });

    fetch(`http://3.38.208.33/users/${account}/created`)
      .then((res) => res.json())
      .then((res) => {
        setCreate([...res]);
        // console.log(res);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardClick = (id, address) => {
    navigate('/details', { state: { id, address } });
  };

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
          <div className="text-6xl">{user.nickname}</div>
          <div className="mt-10">
            <div className="text-3xl text-gray">Account</div>
            <div>{user.account}</div>
          </div>
        </div>

        <div className="mt-[10rem] h-7 w-28 rounded-xl border-2 bg-gray-light text-center shadow-2xl shadow-inner">
          Collected
        </div>

        <div className="my-[5rem] mt-[3rem] grid grid-cols-fill-25 justify-start gap-y-12">
          {collected.map((nft) => (
            <div
              className=""
              key={nft._id}
              onClick={() => {
                cardClick(nft.tokenId, nft.contractAddress);
              }}
            >
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

        <div className="mt-[10rem] h-7 w-28 rounded-xl border-2 bg-gray-light text-center">
          Created
        </div>

        <div className="my-[5rem] mt-[3rem] grid grid-cols-fill-25 justify-start gap-y-12">
          {created.map((nft) => (
            <div
              className=""
              key={nft._id}
              onClick={() => {
                cardClick(nft.tokenId, nft.contractAddress);
              }}
            >
              <NftCard
                nft_img={nft.image}
                nft_name={nft.name}
                artist_name={nft.creator}
                artist_profile={profile_sample}
                price={nft.price}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-11 right-11">
        <ScrollButton />
      </div>
    </div>
  );
};

export default MyPage;
