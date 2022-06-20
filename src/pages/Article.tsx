import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
<<<<<<< Updated upstream

import ArticleRating from '../components/ArticleRating';
import Navbar from '../components/Navbar';
import IArticle from '../interfaces/IArticle';
import IUser from '../interfaces/IUser';
=======
import IArticle from '../interfaces/IArticle';
import IUser from '../interfaces/IUser';
import ArticleRating from '../components/ArticleRating';
import Navbar from '../components/Navbar';
import BackgroundParticles from '../components/BackgroundParticles';
import ReturnButton from '../components/ReturnButton';
>>>>>>> Stashed changes

const Article = () => {
  // we gather param idArticle from l'url
  const { idArticle } = useParams<string>();
  // we gather the article matching id from API
  const [article, setArticle] = useState<IArticle>();
  // we gather the autor of the article
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const getArticleInfos = async () => {
      // get articles by id
      // get response and sets data to article
      const articleResponse = await axios.get<IArticle>(
        `http://localhost:3000/api/articles/${idArticle}`,
        { withCredentials: true },
      );
      // we use setArticle param on url to squeeze the await from url
      setArticle(articleResponse.data);
      // once we have article's information, fetch author info
      const userResponse = await axios.get(
        `http://localhost:3000/api/users/${articleResponse.data.idUser}`,
      );
      setUser(userResponse.data);
    };

    getArticleInfos();
  }, []);

  return (
    <>
      <Navbar />
      <BackgroundParticles />
      <article className="article">
        {article && user && (
          <>
            <div className="article__button">
              <ReturnButton />
            </div>
            <div className="article__title">
              <h1 className="article__title__articletitle">{article.title}</h1>
            </div>
            <div className="article__desc">
              <h2 className="article__desc__articledesc">
                Par {user?.firstName} {user?.lastName}, le {article.lastUpdateDate}
              </h2>
            </div>
            <div className="article__tag">
              <h3 className="article__tag__articletag"></h3>
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
                {article.mainContent}
                {`Une cryptomonnaie repose sur une blockchain, un registre distribué (ou grand
          livre de comptes), consultable par tous, qui répertorie l'ensemble des actions
          du réseau depuis l'origine. Les informations à ajouter sont appelées
          transactions, et sont groupées dans des blocs4. Une transaction peut par exemple
          être un transfert de cryptomonnaie d'une personne à une autre. Les acteurs du
          réseau, appelés nœuds, possèdent, stockent et vérifient leurs propres versions
          de la chaine, depuis le tout premier bloc (appelé bloc genèse). Une blockchain
          est considérée comme valide lorsqu’il est possible de la vérifier totalement en
          partant du bloc genèse. Comme il n'y a pas d'autorité centrale ou de tiers de
          confiance, le système est dit décentralisé. Pour garantir l'immuabilité de la
          chaine, c'est-à-dire qu'il n'y a pas eu de modification dans un ancien bloc,
          ceux-ci sont chainés entre eux par des fonctions cryptographiques de hachage.
          Chaque nœud étant en réalité un ordinateur connecté au réseau par internet, le
          système n'opère pas en temps réel car il peut y avoir des temps de latence
          importants lors de l'envoi ou la réception de transactions et blocs à travers le
          réseau. Dans le cas où différentes versions d'une même chaine existent, la règle
          est de choisir la chaine valide la plus longue.`}
              </p>
            </div>
            <div className="ranking_container">
              <ArticleRating />
            </div>
          </>
        )}
      </article>
    </>
  );
};

export default Article;
