import './Mint.css';
import { useState } from 'react';
import NftCard2 from 'components/features/NftCard_2';

import profile_sample from 'img/profile_sample.jpg';

const Mint = () => {
  const [ipfsHash, setIpfsHash] = useState('');
  const [buffer, setBuffer] = useState(null);

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const buf = await Buffer.from(reader.result);
      setBuffer(buf);
      console.log(buffer);
    };
  };

  return (
    <div className="mint">
      <div className="mint-inner mx-auto flex w-2/3 justify-center pt-20">
        <div className="mr-24">
          <NftCard2
            nft_name="Will be NFT Name"
            artist_profile={profile_sample}
            artist_name="test"
          />
          <form>
            <input type="file" onChange={captureFile} />
          </form>
        </div>
        <div className="w-[600px]">
          <div className="mb-12">
            <h1 className="mb-2 h-[98px] w-[483px] text-[80px] font-bold">
              Create NFT
            </h1>
            <p className="h-8 text-xl font-normal">
              Welcome! Enter Your Details And Start Creating.
            </p>
          </div>

          <form className="flex flex-col">
            <input
              placeholder="Name"
              className="mb-4 h-12 rounded-2xl border-2 border-gray-light px-4 py-5 drop-shadow-xl"
            ></input>
            <textarea
              placeholder="Description"
              className="mb-4 h-[187px] rounded-2xl border-2 border-gray-light px-4 py-5 drop-shadow-xl"
            ></textarea>
            <button className="shadow-black h-[45px] rounded-2xl border-2 bg-blue">
              <h1 className="font-semibold text-white">Create NFT</h1>
            </button>
          </form>
          {/* <div>
            <input>Name</input>
            <textarea placeholder='description'></textarea>
            <button>Create NFT</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Mint;
