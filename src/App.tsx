import './App.scss';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import BackgroundParticles from './components/BackgroundParticles';
import Article from './pages/Article';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BackgroundParticles />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/articles/:idArticle" element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;
