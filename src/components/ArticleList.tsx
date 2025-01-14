import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IArticle from '../interfaces/IArticle';
import ArticleCard from './ArticleCard';

// interface props
interface Props {
  id: number;
}

const ArticleList = ({ id }: Props) => {
  const [articleList, setArticleList] = useState<IArticle[]>([]);

  useEffect(() => {
    const getArticleList = async () => {
      const url = `${import.meta.env.VITE_DB_URL}api/packages/${id}/articles`;
      const { data } = await axios.get(url, { withCredentials: true });
      setArticleList(data);
    };
    getArticleList();
  }, []);

  return (
    <div className="articleList">
      <div className="articleList__list">
        {articleList &&
          articleList.map((article) => <ArticleCard key={article.id} {...article} />)}
      </div>
    </div>
  );
};

export default ArticleList;
