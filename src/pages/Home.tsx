import React from 'react';

import BadgesButton from '../components/BadgesButton';
import BookmarksButton from '../components/BookmarksButton';
import Navbar from '../components/Navbar';
import PackageList from '../components/PackageList';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <h1> Lisez, découvrez, apprenez </h1>
        <PackageList />
        <div className="home__button">
          <BookmarksButton />
          <BadgesButton />
        </div>
      </div>
    </>
  );
};

export default Home;
