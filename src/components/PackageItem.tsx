import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IArticle from '../../interfaces/IArticle';
import IPackageItem from '../interfaces/IPackageItem';
import ArticleList from './ArticleList';
import CompletionChart from './CompletionChart';
import FollowedButton from './FollowedButton';
import TagList from './TagList';

const PackageItem = ({ name, id, description }: IPackageItem) => {
  // Function and API call to get articlesList lenght and display it to users
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
        <CompletionChart />
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
