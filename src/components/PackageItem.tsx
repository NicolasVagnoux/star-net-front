import React from 'react';

import IPackageItem from '../interfaces/IPackageItem';
import ArticleList from './ArticleList';
import FollowedButton from './FollowedButton';
import RoundButton from './RoundButton';
import TagList from './TagList';

const PackageItem = ({ name, id, description }: IPackageItem) => {
  return (
    <div className="packageitem">
      <div className="packageitem__title">
        <RoundButton />
        <h2 className="packageitem__title__main">
          {' '}
          {name} <span> (5 articles) </span>
        </h2>
        <FollowedButton />
      </div>
      <div className="packageitem__taglist">
        <TagList id={id} name={name} description={description} />
      </div>
      <ArticleList id={id} name={name} description={description} />
    </div>
  );
};

export default PackageItem;
