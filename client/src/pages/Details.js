import './Details.css';

import NftCard from 'components/features/NftCard';

import sample4 from 'img/card_sample_4.jpg';
import profile_sample from 'img/profile_sample.jpg';

const Details = () => {
  return (
    <div className="details flex min-h-screen gap-4">
      <div className="sidebar w-[400px] shrink-0 flex-col">
        <div className="m-[50px]">
          <NftCard
            nft_img={sample4}
            nft_name="NFT Name"
            artist_name="NFT Artist"
            artist_profile={profile_sample}
            price="1.63"
          />
        </div>
        <input
          className="shadow-black mx-[50px] my-[10px] h-[45px] w-[300px] rounded-2xl border-2 font-semibold"
          placeholder="                  Enter your NFT price"
        ></input>
        <button className="shadow-black mx-[50px] h-[45px] w-[300px] rounded-2xl border-2 bg-blue">
          <h1 className="font-semibold text-white">Set a price</h1>
        </button>
      </div>
      <div className="description m-[50px] grow">
        <div className="mb-[5px] text-7xl">The Whale Shark</div>
        <div className="text-1xl mt-[5px] font-extralight text-gray">
          Minted On Sep 30, 2022
        </div>
        <div className="mt-[30px] text-3xl text-gray">Created By</div>
        <div className="mt-[5px]">NotoriousHong</div>
        <div className="mt-[30px] text-3xl text-gray">Description</div>
        <div className="mt-[5px] text-3xl">
          The whale shark (Rhincodon typus) is a slow-moving, filter-feeding
          carpet shark and the largest known extant fish species. The largest
          confirmed individual had a length of 18.8 m (61.7 ft).[9] The whale
          shark holds many records for size in the animal kingdom, most notably
          being by far the largest living nonmammalian vertebrate. It is the
          sole member of the genus Rhincodon and the only extant member of the
          family Rhincodontidae, which belongs to the subclass Elasmobranchii in
          the class Chondrichthyes. Before 1984 it was classified as Rhiniodon
          into Rhinodontidae. The whale shark is found in open waters of the
          tropical oceans and is rarely found in water below 21 °C (70 °F).[2]
          Studies looking at vertebral growth bands and the growth rates of
          free-swimming sharks have estimated whale shark lifespans at 80–130
          years.[10][11][12] Whale sharks have very large mouths and are filter
          feeders, which is a feeding mode that occurs in only two other sharks,
          the megamouth shark and the basking shark. They feed almost
          exclusively on plankton and small fishes, and pose no threat to
          humans.
        </div>
      </div>
    </div>
  );
};

export default Details;
