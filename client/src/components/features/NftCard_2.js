import './NftCard_2.css';

const NftCard2 = (props) => {
  return (
    <div className="card flex w-[490px] flex-col overflow-hidden rounded-2xl bg-white drop-shadow-md">
      {props.img_check ? (
        <img
          src={`https://ipfs.io/ipfs/${props.ipfs_hash}`}
          alt="sample"
          className="h-[390px] w-[100%]"
        ></img>
      ) : (
        <div className="h-[390px] w-[100%] bg-gray-light"></div>
      )}

      <div className="card-info flex h-[120px] grow justify-center pt-[25px]">
        <div className="nft-info w-10/12">
          <div className="mb-6 flex h-[60px] w-[100%] flex-col items-start">
            <p className="mb-1 text-[22px]">{props.nft_name}</p>
            <div className="flex items-center">
              <img
                src={props.artist_profile}
                alt="none"
                className="h-6 w-6 overflow-hidden rounded-full"
              ></img>
              <div className="ml-2 font-mono font-normal">
                {props.artist_name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard2;
