import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import ArticleCard from '../components/ArticleCard';
import Navbar from '../components/Navbar';
import ReturnButton from '../components/ReturnButton';
import TagItemArticle from '../components/TagItemArticle';
import CurrentUserContext from '../contexts/CurrentUser';
import IArticle from '../interfaces/IArticle';
import ITagItemArticle from '../interfaces/ITagItemArticle';

const Catalog = () => {
  const [articleList, setArticleList] = useState<IArticle[]>([]);
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [tagList, setTagList] = useState<ITagItemArticle[]>([]);
  const [tagFilter, setTagFilter] = useState<number>();

  //Call for the article list
  useEffect(() => {
    const getArticleList = async () => {
      let url = `${import.meta.env.VITE_DB_URL}api/articles`;
      if (titleFilter) {
        url += `?titleFilter=${titleFilter}`;
      }
      if (tagFilter) {
        if (titleFilter) {
          url += `&tagFilter=${tagFilter}`;
        } else {
          url += `?tagFilter=${tagFilter}`;
        }
      }
      const { data } = await axios.get(url);
      setArticleList(data);
    };
    getArticleList();
  }, [titleFilter, tagFilter]);

  //Call for the category list
  useEffect(() => {
    const getTagList = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_DB_URL}api/categories`);
      setTagList(data);
    };
    getTagList();
  }, []);

  // Function that handle sort by article name
  const sortByDate = (a: IArticle, b: IArticle) => {
    if (a.lastUpdateDate < b.lastUpdateDate) {
      return -1;
    }
    if (a.lastUpdateDate > b.lastUpdateDate) {
      return 1;
    }
    return 0;
  };

  const { userId, redirectToLogin } = useContext(CurrentUserContext);
  //Redirige directement au login si on n'est pas connecté
  useEffect(() => {
    !userId && redirectToLogin();
  }, []);

  return (
    <>
      <Navbar />
      <div className="catalog">
        <div className="catalog__return">
          <ReturnButton />
        </div>
        <h1 className="catalog__title">Découvrez tous les articles</h1>
        <div className="catalog__search">
          <h2 className="catalog__search__title">Rechercher un article :</h2>
          <div className="catalog__search__input">
            <SearchIcon />
            <input
              type="text"
              value={titleFilter}
              onChange={(e) => {
                setTitleFilter(e.target.value);
              }}
            />
            {titleFilter && (
              <button
                onClick={() => {
                  setTitleFilter('');
                }}
                type="button">
                <HighlightOffIcon />
              </button>
            )}
          </div>
        </div>
        <div className="catalog__tagList">
          <h2 className="catalog__tagList__title">Filtrer par catégorie :</h2>
          <div className="catalog__tagList__list">
            {tagList &&
              tagList.map((tag) => (
                <button
                  key={tag.id}
                  className={`catalog__tagList__list__tag ${
                    tagFilter === tag.id && 'catalog__tagList__list__tag--active'
                  }`}
                  onClick={() => setTagFilter(tag.id)}
                  type="button">
                  <TagItemArticle {...tag} />
                </button>
              ))}
            <button
              className="catalog__tagList__list__reset"
              onClick={() => setTagFilter(0)}
              type="button">
              Réinitialiser les filtres
            </button>
          </div>
        </div>
        <div className="catalog__articleList">
          {articleList &&
            articleList
              .sort(sortByDate)
              .reverse()
              .map((article) => <ArticleCard key={article.id} {...article} />)}
        </div>
      </div>
    </>
  );
};

export default Catalog;
