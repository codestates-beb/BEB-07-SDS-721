import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Web3 from 'web3';

import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';

import Explore from 'pages/Explore';
import Home from 'pages/Home';
import Mint from 'pages/Mint';
import MyPage from 'pages/MyPage';
import Details from 'pages/Details';

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState(sessionStorage.getItem('account'));

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      // window.ethereum이 있다면
      try {
        const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      sessionStorage.setItem('account', accounts[0]);
      setAccount(accounts[0]);
    } catch (e) {}
  };

  const disconnectWallet = async () => {
    console.log('disconnect');
    // const accounts = await window.ethereum
    //   .request({
    //     method: 'wallet_requestPermissions',
    //     params: [
    //       {
    //         eth_accounts: {},
    //       },
    //     ],
    //   })
    //   .then(() =>
    //     window.ethereum.request({
    //       method: 'eth_requestAccounts',
    //     }),
    //   );

    // setAccount(accounts[0]);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          account={account}
        />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route
            path="/mint"
            element={<Mint account={account} web3={web3} />}
          ></Route>
          <Route path="/mypage" element={<MyPage account={account} />}></Route>
          <Route path="/details" element={<Details />}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

// this comment added to test githubaction
