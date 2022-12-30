import './Header.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = ({ connectWallet, account, disconnectWallet }) => {
  const navigate = useNavigate();

  const myPageClick = async (e) => {
    if (!account) {
      e.preventDefault();
      await connectWallet();
      if (account) navigate('/mypage');
    }
  };

  const mintPageClick = async (e) => {
    if (!account) {
      e.preventDefault();
      await connectWallet();
      if (account) navigate('/mint');
    }
  };

  return (
    <div className="header sticky top-0 z-50 bg-blue">
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
                className="bg-blue-light hover:text-blue-light mr-[10px] flex h-[100%] w-[140px] items-center justify-center rounded-3xl hover:cursor-pointer hover:bg-blue"
                onClick={disconnectWallet}
              >
                Log Out
              </button>
            ) : (
              <button
                className="bg-blue-light hover:text-blue-light mr-[10px] flex h-[100%] w-[140px] items-center justify-center rounded-3xl hover:cursor-pointer hover:bg-blue"
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
