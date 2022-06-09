import React from 'react';
import FollowedButton from '../components/FollowedButton';
import TagItem from '../components/TagItem';
import TagList from '../components/TagList';

const Home = () => {
  return (
    <div>
      <h1>HELLO HOME</h1>
      <FollowedButton />
      <FollowedButton />
      <TagList />
    </div>
  );
};

export default Home;
