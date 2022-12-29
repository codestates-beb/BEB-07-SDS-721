import './Mint.css';
import { useState } from 'react';
import NftCard2 from 'components/features/NftCard_2';
import { Buffer } from 'buffer';
import IpfsAPI from 'ipfs-api';
import spinner from 'img/loading.gif';

import profile_sample from 'img/profile_sample.jpg';

import Contract from 'web3-eth-contract';
import dogNftABI from 'chainUtils/dogNftABI';

const Mint = ({ account, web3 }) => {
  // const projectId = process.env.REACT_APP_PROJECT_ID;
  // const projectSecret = process.env.REACT_APP_PROJECT_SECRET;
  const projectId = '2JWdyQN1UEFEdzya3a30jPQVb97';
  const projectSecret = '36d47b82182e7e1d41db4ee5f9e0ce8d';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

  const ipfs = IpfsAPI({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

  const [ipfsHash, setIpfsHash] = useState('');
  const [imgCheck, setImgCheck] = useState(false);
  const [nftName, setNftName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setLoading] = useState(false);

  const captureFile = (event) => {
    setLoading(true);
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
    ipfs.files.add(buffer, (err, file) => {
      if (err) {
        console.log(err);
      }
      // console.log(file[0].hash);
      setIpfsHash(file[0].hash);
      setImgCheck(true);
      setLoading(false);
    });
  };

  async function mint(metaUri) {
    try {
      console.log(metaUri);
      const abi = dogNftABI;
      const address = '0x697db94F18759deef144af868Fd657E85738B87D';
      Contract.setProvider(web3);
      const contract = new Contract(abi, address);
      const result = await contract.methods
        .mintNFT(account, metaUri)
        .send({ from: account });
      return result;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

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
    e.preventDefault();
    if (!city || !description || !nftName) {
      alert('please write all field!');
      return;
    }

    try {
      setLoading(true);

      const data = JSON.stringify({
        recipient: account,
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

      // console.log(data);

      ipfs.files.add(Buffer.from(data), (err, file) => {
        if (err) {
          console.log(err);
        }
        // console.log(file[0].hash);
        mint(`https://ipfs.io/ipfs/${file[0].hash}`).then((res) => {
          console.log(res);
          setLoading(false);
        });
      });

      // const res = await fetch(
      //   `${process.env.REACT_APP_SERVER}/nfts/0x16022D988442C70682e3566d09cd67d86e1b79e4`,
      //   {
      //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //     mode: 'cors', // no-cors, *cors, same-origin
      //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //     credentials: 'same-origin', // include, *same-origin, omit
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     redirect: 'follow',
      //     referrerPolicy: 'no-referrer',
      //     body: JSON.stringify(data),
      //   },
      // );

      // setLoading(false);
    } catch {
      alert('error!');
      setLoading(false);
    }
  };

  return (
    <div className="mint">
      <div
        className={`fixed top-0 z-50 flex ${
          isLoading ? '' : 'hidden'
        } h-[100vh] w-[100vw] items-center justify-center bg-black/10`}
      >
        <img className="" src={spinner} alt="no img"></img>
      </div>
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
                className="flex w-[100%] justify-center text-gray-light hover:cursor-pointer hover:text-gray"
                htmlFor="file-input"
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
            <p className="mx-[5px] h-8 text-xl font-normal">
              Welcome! Enter Your Details And Start Creating.
            </p>
          </div>

          <form className="flex flex-col">
            <input
              placeholder="Name"
              className="mb-2 h-12 rounded-2xl border-2 border-gray-light px-4 py-5 drop-shadow-md"
              onChange={inputChange}
            ></input>
            <input
              placeholder="City"
              className="mb-2 h-12 rounded-2xl border-2 border-gray-light px-4 py-5 drop-shadow-md"
              onChange={cityChange}
            ></input>
            <textarea
              placeholder="Description"
              className="description mb-4 h-[165px] rounded-2xl border-2 border-gray-light px-4 py-5 drop-shadow-md"
              onChange={descriptChange}
            ></textarea>
            <button
              onClick={submit}
              className="h-[45px] rounded-2xl border-2 bg-blue shadow-black"
            >
              <h1 className="font-semibold text-white  drop-shadow-md">
                Create NFT
              </h1>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Mint;
