import './App.scss';
import { Route, Routes } from 'react-router-dom';

import React from 'react';
import Home from './pages/Home';
import Article from './pages/Article';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:idArticle" element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;
