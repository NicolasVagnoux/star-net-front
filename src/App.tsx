import './App.scss';

import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Route, Routes } from 'react-router-dom';

import BackgroundParticles from './components/BackgroundParticles';
import Article from './pages/Article';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <BackgroundParticles />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/articles/:idArticle" element={<Article />} />
        </Routes>
      </CookiesProvider>
    </div>
  );
}

export default App;
