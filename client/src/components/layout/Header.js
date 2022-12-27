import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header bg-blue">
      <div className="header-inner relative mx-auto h-20 w-5/6">
        <div className="logo absolute inset-y-0 my-auto h-[57px] text-[40px] text-white">
          Opensea
        </div>
        <ul className="category absolute inset-y-0 right-0 my-auto flex h-[60px] items-center text-xl text-white">
          <Link to="/explore" className="category-item ">
            <li>Explore</li>
          </Link>
          <Link to="/mint" className="category-item">
            <li>Mint</li>
          </Link>
          <Link to="/mypage" className="category-item">
            <li>MyPage</li>
          </Link>
          <li className="h-[100%]">
            <button className="mr-[10px] flex h-[100%] w-[140px] items-center justify-center rounded-lg bg-blue-light hover:cursor-pointer hover:bg-white hover:text-blue-light">
              Log In
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
