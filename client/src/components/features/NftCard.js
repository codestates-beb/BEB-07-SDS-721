import './NftCard.css';

const NftCard = (props) => {
  return (
    <div className="card flex h-[387px] w-[100%] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
      <img
        src={props.nft_img}
        alt="sample"
        className="h-[209px] w-[100%]"
      ></img>
      <div className="card-info flex grow justify-center bg-orange pt-[20px]">
        <div className="nft-info w-10/12 bg-green">
          <div className="flex h-[60px] w-[100%] flex-col items-start">
            <p className="mb-1 text-[22px]">{props.nft_name}</p>
            <div>
              <img></img>
              <div className="font-mono font-normal">{props.artist_name}</div>
            </div>
          </div>
          <div>
            <p className="font-mono">price</p>
            <p>{`${props.price} ETH`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
