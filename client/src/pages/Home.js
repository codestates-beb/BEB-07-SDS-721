import './Home.css';
import NftCard from 'components/features/NftCard';
import ScrollButton from 'components/features/ScrollButton';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import profile_sample from 'img/profile_sample.jpg';

const Home = ({ isHome }) => {
  const location = useLocation();

  const category = location.state !== null ? location.state.category : '';

  const navigate = useNavigate();
  const [nfts, setNfts] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(8);
  const initialnfts = nfts.slice(0, index);
  // const [home, setHome] = useState(isHome);

  useEffect(() => {
    console.log('test!');
    //getData
    fetch('http://3.38.208.33/nfts')
      .then((res) => res.json())
      .then((res) => {
        if (isHome) {
          setNfts([...res]);
          console.log(res);
        } else {
          setNfts([
            ...res.filter((el) => {
              if (el.attributes[0]) return el.attributes[0].value === category;
              else {
                return false;
              }
            }),
          ]);
        }
      });
  }, []);

  const loadMore = () => {
    setIndex(index + 4);
    // console.log(index);
    if (index >= nfts.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  const cardClick = (id, address) => {
    navigate('/details', { state: { id, address } });
  };

  return (
    <div className="home">
      <div className="home-inner mx-auto mt-[19px] w-10/12">
        <p className="mx-auto mb-8 flex h-[84px] w-[900px] items-center justify-center text-6xl font-semibold">
          Explore, collect, and sell NFTs
        </p>
        <div className="grid grid-cols-fill-25 justify-center gap-y-12">
          {initialnfts.map((nft) => {
            return (
              <div
                className="mx-auto"
                key={nft.transactionHash}
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
            );
          })}
        </div>
      </div>
      <div className="mt-[5rem] flex justify-center">
        {isCompleted ? (
          <button onClick={loadMore} type="button" className="hidden"></button>
        ) : (
          <button
            onClick={loadMore}
            type="button"
            className="h-16 w-44 rounded-3xl bg-gray-light text-center drop-shadow-md transition-all hover:scale-110"
          >
            Load More
          </button>
        )}
      </div>
      <div className="fixed bottom-11 right-11">
        <ScrollButton />
      </div>
    </div>
  );
};

export default Home;
