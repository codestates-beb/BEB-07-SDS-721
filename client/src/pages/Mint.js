import './Mint.css';
import { useState } from 'react';
import NftCard2 from 'components/features/NftCard_2';
import { Buffer } from 'buffer';
import IpfsAPI from 'ipfs-api';
import axios from 'axios';

import profile_sample from 'img/profile_sample.jpg';

const Mint = () => {
  const [ipfsHash, setIpfsHash] = useState('');
  const [imgCheck, setImgCheck] = useState(false);
  const [nftName, setNftName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const buf = await Buffer.from(reader.result);
      uploadIpfs(buf);
    };
  };

  const uploadIpfs = (buffer) => {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const projectSecret = process.env.REACT_APP_PROJECT_SECRET;
    const auth =
      'Basic ' +
      Buffer.from(projectId + ':' + projectSecret).toString('base64');

    const ipfs = IpfsAPI({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    });

    ipfs.files.add(buffer, (err, file) => {
      if (err) {
        console.log(err);
      }
      console.log(file[0].hash);
      setIpfsHash(file[0].hash);
      setImgCheck(true);
    });

    console.log(ipfsHash);
  };

  const inputChange = (e) => {
    setNftName(e.target.value);
  };

  const cityChange = (e) => {
    setCity(e.target.value);
  };

  const descriptChange = (e) => {
    setDescription(e.target.value);
  };

  const submit = async (e) => {
    if (!city || !description || !nftName) alert('please write all field!');

    try {
      await axios.post('url', {
        name: nftName,
        description: description,
        image: `https://ipfs.io/ipfs/${ipfsHash}`,
        attributes: [
          {
            trait_type: 'city',
            value: city,
          },
        ],
      });
    } catch {
      alert('error!');
    }
  };

  return (
    <div className="mint">
      <div className="mint-inner mx-auto flex w-2/3 justify-center pt-20">
        <div className="relative mr-24">
          <NftCard2
            img_check={imgCheck}
            ipfs_hash={ipfsHash}
            nft_name={nftName ? nftName : 'Will be NFT Name'}
            artist_profile={profile_sample}
            artist_name="anonymous"
          />
          {imgCheck ? (
            <></>
          ) : (
            <form className="absolute inset-y-0 inset-x-0 my-[170px] mx-auto h-[60px] w-[60px] rounded-full bg-white text-6xl text-white">
              <label
                className="block flex w-[100%] justify-center text-gray-light hover:cursor-pointer hover:text-gray"
                for="file-input"
              >
                <div>+</div>
              </label>
              <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                onChange={captureFile}
              />
            </form>
          )}
        </div>
        <div className="w-[600px]">
          <div className="mb-8">
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
              className="mb-2 h-12 rounded-2xl border-2 border-gray-light px-4 py-5 drop-shadow-xl"
              onChange={inputChange}
            ></input>
            <input
              placeholder="City"
              className="mb-2 h-12 rounded-2xl border-2 border-gray-light px-4 py-5 drop-shadow-xl"
              onChange={cityChange}
            ></input>
            <textarea
              placeholder="Description"
              className="mb-4 h-[165px] rounded-2xl border-2 border-gray-light px-4 py-5 drop-shadow-xl"
              onChange={descriptChange}
            ></textarea>
            <button
              onClick={submit}
              className="shadow-black h-[45px] rounded-2xl border-2 bg-blue"
            >
              <h1 className="font-semibold text-white">Create NFT</h1>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Mint;
