import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IArticle from '../interfaces/IArticle';
import ArticleList from './ArticleList';
import CompletionChart from './CompletionChart';
import FollowedButton from './FollowedButton';
import TagList from './TagList';

// interface props
interface Props {
  id: number;
  name: string;
  description: string;
}

const PackageItem = ({ name, id, description }: Props) => {
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
      <div className="packageitem__container">
        <CompletionChart />
        <div className="packageitem__container__title">
          <h2 className="packageitem__container__title__main">
            {name} <span> ({articleList.length} articles) </span>
          </h2>
          <div className="packageitem__container__title__button">
            <FollowedButton />
          </div>
        </div>
      </div>
      <div className="packageitem__taglist">
        <TagList id={id} name={name} description={description} />
      </div>
      <ArticleList id={id} />
    </div>
  );
};

export default PackageItem;
