import React from 'react';
import FollowedButton from '../components/FollowedButton';
import TagItem from '../components/TagItem';
import TagList from '../components/TagList';

import ArticleList from '../components/ArticleList';

const Home = () => {
  return (
    <div>
      <h1>HELLO HOME</h1>
      <FollowedButton />
      <FollowedButton />
      <TagList />
      <ArticleList />
    </div>
  );
};

export default Home;
