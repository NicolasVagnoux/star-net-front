import React from 'react';
import BookmarksButton from '../components/BookmarksButton';
import BadgesButton from '../components/BadgesButton';
import PackageList from '../components/PackageList';

const Home = () => {
  return (
    <div className="home">
      <h1> Lisez, découvrez, apprenez </h1>
      <PackageList />
      <div className="home__button">
        <BookmarksButton />
        <BadgesButton />
      </div>
    </div>
  );
};

export default Home;
