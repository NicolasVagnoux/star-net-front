import './App.scss';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Article from './pages/Article';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:idArticle" element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;
