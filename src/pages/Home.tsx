import React from 'react';

import BackgroundParticles from '../components/BackgroundParticles';
import BadgesButton from '../components/BadgesButton';
import BookmarksButton from '../components/BookmarksButton';
import PackageList from '../components/PackageList';

const Home = () => {
  return (
    <>
      <BackgroundParticles />
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
