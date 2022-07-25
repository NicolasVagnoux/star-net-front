import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';

import ArticleRating from '../components/ArticleRating';
import Comments from '../components/Comments';
import Navbar from '../components/Navbar';
import ReturnButton from '../components/ReturnButton';
import TagListArticle from '../components/TagListArticle';
import CurrentUserContext from '../contexts/CurrentUser';
import IArticle from '../interfaces/IArticle';
import IUser from '../interfaces/IUser';

const Article = () => {
  // we gather param idArticle from url
  const { idArticle } = useParams<string>();
  const idArticleNumber = Number(idArticle);
  // we gather the article matching id from API
  const [article, setArticle] = useState<IArticle>();
  // we gather the autor of the article
  const [author, setAuthor] = useState<IUser>();
  // we gather the article completion
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const { userId, redirectToLogin } = useContext(CurrentUserContext);

  useEffect(() => {
    const getArticleInfos = async () => {
      // get articles by id
      // get response and sets data to article
      const articleResponse = await axios.get<IArticle>(
        `${import.meta.env.VITE_DB_URL}api/articles/${idArticle}`,
        { withCredentials: true },
      );
      // we use setArticle param on url to squeeze the await from url
      setArticle(articleResponse.data);
      // once we have article's information, fetch author info
      const userResponse = await axios.get(
        `${import.meta.env.VITE_DB_URL}api/users/${articleResponse.data.idUser}`,
      );
      setAuthor(userResponse.data);
    };

    // check if article is completed/read
    const getCompletedOrNot = async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_DB_URL
        }api/users/${userId}/completedarticles/${idArticleNumber}`,
        { withCredentials: true },
      );
      data ? setIsCompleted(true) : setIsCompleted(false);
    };

    getArticleInfos();
    getCompletedOrNot();
  }, []);

  //Redirige directement au login si on n'est pas connecté
  useEffect(() => {
    !userId && redirectToLogin();
  }, []);

  return (
    <>
      <Navbar />
      <article className="article">
        {article && userId && (
          <>
            <div className="article__button">
              <ReturnButton />
            </div>
            <div className="article__title">
              <h1 className="article__title__articletitle">{article.title}</h1>
            </div>
            <div className="article__desc">
              <h2 className="article__desc__articledesc">
                Par {author?.firstName} {author?.lastName}, le{' '}
                {article.lastUpdateDate
                  .toLocaleString('fr-FR')
                  .slice(0, 10)
                  .split('-')
                  .reverse()
                  .join('/')}
              </h2>
            </div>
            <div className="article__tag">
              <h3 className="article__tag__articletag">
                <TagListArticle id={idArticleNumber} />
              </h3>
            </div>
            <div className="article__image">
              <img
                className="article__image__articleimage"
                src={article.mainImage}
                alt="articleimg"
              />
            </div>
            <div className="article__text">
              <p className="article__text__articletext">
                <ReactMarkdown>{article.mainContent}</ReactMarkdown>
              </p>
            </div>
            <div className="article__ranking">
              {!isCompleted ? (
                <ArticleRating id={idArticleNumber} setIsCompleted={setIsCompleted} />
              ) : (
                <div className="article__read">
                  <p>Article complété</p>
                  <Link to="/home">
                    <button type="button">RETOUR A L&apos;ACCUEIL</button>
                  </Link>
                </div>
              )}
            </div>
            <Comments idArticle={idArticleNumber} userId={userId} />
          </>
        )}
      </article>
    </>
  );
};

export default Article;
