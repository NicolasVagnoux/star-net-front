import React, { useEffect, useState } from 'react';

import IPackageItem from '../interfaces/IPackageItem';
import ArticleList from './ArticleList';
import FollowedButton from './FollowedButton';
import RoundButton from './RoundButton';
import TagList from './TagList';
import IArticle from '../../interfaces/IArticle';
import axios from 'axios';

const PackageItem = ({ name, id, description }: IPackageItem) => {

  const [articleList, setArticleList] = useState<IArticle[]>([]);

  useEffect(() => {
    const getArticleList = async () => {
      const url = `http://localhost:3000/api/packages/${id}/articles`;
      const { data } = await axios.get(url);
      setArticleList(data);
    };
    getArticleList();
  }, []);

  return (
    <div className="packageitem">
      <div className="packageitem__title">
        <RoundButton />
        <h2 className="packageitem__title__main">
          {name} <span> ({articleList.length} articles) </span>
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
