import './App.scss';

import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import BackgroundParticles from './components/BackgroundParticles';
import Article from './pages/Article';
import Bookmarks from './pages/Bookmarks';
import Home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account';

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <BackgroundParticles />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/articles/:idArticle" element={<Article />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/myaccount" element={<Account />} />
        </Routes>
        <ToastContainer />
      </CookiesProvider>
    </div>
  );
}

export default App;
