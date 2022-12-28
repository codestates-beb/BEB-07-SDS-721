import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ connectWallet, account, disconnectWallet }) => {
  const myPageClick = (e) => {
    if (!account) {
      e.preventDefault();
      connectWallet();
    }
  };

  const mintPageClick = (e) => {
    if (!account) {
      e.preventDefault();
      connectWallet();
    }
  };

  return (
    <div className="header bg-blue">
      <div className="header-inner relative mx-auto h-20 w-5/6">
        <Link to="/">
          <div className="logo absolute inset-y-0 my-auto h-[57px] text-[40px] text-white">
            Opensea
          </div>
        </Link>
        <ul className="category absolute inset-y-0 right-0 my-auto flex h-[60px] items-center text-xl text-white">
          <Link to="/explore" className="category-item ">
            <li>Explore</li>
          </Link>
          <Link to="/mint" className="category-item" onClick={mintPageClick}>
            <li>Mint</li>
          </Link>
          <Link to="/mypage" className="category-item" onClick={myPageClick}>
            <li>MyPage</li>
          </Link>
          <li className="h-[100%]">
            {account ? (
              <button
                className="mr-[10px] flex h-[100%] w-[140px] items-center justify-center rounded-3xl bg-blue-light hover:cursor-pointer hover:bg-white hover:text-blue-light"
                onClick={disconnectWallet}
              >
                Log Out
              </button>
            ) : (
              <button
                className="mr-[10px] flex h-[100%] w-[140px] items-center justify-center rounded-lg bg-blue-light hover:cursor-pointer hover:bg-white hover:text-blue-light"
                onClick={connectWallet}
              >
                Log In
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
