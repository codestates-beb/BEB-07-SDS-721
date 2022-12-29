import './Footer.css';

const Footer = () => {
  return (
    <div className="footer mt-20 bg-blue-footer pt-10 text-white">
      <div className="footer-inner mx-auto w-2/3">
        <div className="h-194 mb-12 flex justify-between">
          <div className="market-info w-[300px]">
            <h1 className="mb-5 h-[42px] text-3xl font-bold">OpenSea</h1>
            <p className="h-[132px] font-workSans text-base">
              SDS - 721 We combined <br /> the names of each team member <br />
              and inspired by the ERC-721 <br /> token, decided the team <br />
              name as 'SDS-721'.
            </p>
          </div>
          <div className="subcribe w-[420px]">
            <h1 className="mb-6 h-[35px] font-mono text-[22px] font-bold leading-relaxed">
              Join Our NFT Market
            </h1>
            <p className="font-workSans text-base">
              Get exclusive promotions & updates <br />
              straight to your inbox.
            </p>
            <form>
              <input
                className="my-[1rem] h-[2rem] w-[17rem] rounded-md font-semibold"
                placeholder="   Enter your email here"
              ></input>
            </form>
          </div>
        </div>
        <p className="border-t-2 border-gray-light pb-5 pt-4">
          Ⓒ 2022-2023 SDS-721, Inc
        </p>
      </div>
    </div>
  );
};

export default Footer;
