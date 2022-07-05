import axios from 'axios';
import React, { useEffect, useState } from 'react';
import IArticle from '../interfaces/IArticle';
import ICompletedArticle from '../interfaces/ICompletedArticle';
import ArticleList from './ArticleList';
import CompletionChart from './CompletionChart';
import FollowedButton from './FollowedButton';
import TagList from './TagList';
import IUser from '../interfaces/IUser';
import jwt_decode from 'jwt-decode';
import { useCookies } from 'react-cookie';

// interface props
interface Props {
  id: number ;
  name: string;
  description: string;
}

const PackageItem = ({ name, id, description }: Props) => {
  // We Collect the userId (the one connected) with the cookie
  const cookie = useCookies(['user_token'])[0];
  const user: IUser = jwt_decode(cookie.user_token);

  // Function and API call to get articlesList lenght and display it to users
  const [articleList, setArticleList] = useState<IArticle[]>([]);
  const [completedArticle, setCompletedArticles] = useState<ICompletedArticle[]>([]);
  const [completion, setCompletion] = useState<number|any>();
  useEffect(() => {
    const getArticleList = async () => {
      const articleListResponse = await axios.get<IArticle[]>(
        `http://localhost:3000/api/packages/${id}/articles`,
        { withCredentials: true },
      );
      setArticleList(articleListResponse.data);
      // Function and API call to get completedArticleLenght

      const completedArticlesResponse = await axios.get(
        `http://localhost:3000/api/users/${user.id}/packages/${id}/completedArticles`,
        { withCredentials: true },
      );
      setArticleList(completedArticlesResponse.data);

      setCompletion(Math.round((completedArticlesResponse.data.length) / (articleListResponse.data.length)*100));
    };
    getArticleList();
  }, []);

  return (
    <div className="packageitem">
      <div className="packageitem__container">
        <CompletionChart value={completion} />
        <div className="packageitem__container__title">
          <h2 className="packageitem__container__title__main">
            {name} <span> ({articleList.length} articles) </span>
          </h2>
          <FollowedButton />
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
