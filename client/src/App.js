import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';

import Explore from 'pages/Explore';
import Home from 'pages/Home';
import Mint from 'pages/Mint';
import MyPage from 'pages/MyPage';
import Details from 'pages/Details';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/mint" element={<Mint />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/details" element={<Details />}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
