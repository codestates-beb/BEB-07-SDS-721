import './NftCard.css';

const NftCard = (props) => {
  return (
    <div className="card flex w-[300px] flex-col overflow-hidden rounded-2xl bg-white drop-shadow-md transition-all hover:scale-110">
      <img
        src={props.nft_img}
        alt="sample"
        className="h-[230px] w-[100%]"
      ></img>
      <div className="card-info flex h-[160px] grow justify-center pt-[20px]">
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
          <div>
            <p className="font-mono text-xs font-normal leading-[1.1] text-gray">
              price
            </p>
            <p className="font-mono text-base font-normal">{`${props.price} ETH`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
