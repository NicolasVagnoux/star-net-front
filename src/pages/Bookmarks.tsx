import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import ArticleCard from '../components/ArticleCard';
import Navbar from '../components/Navbar';
import ReturnButton from '../components/ReturnButton';
import CurrentUserContext from '../contexts/CurrentUser';
import IArticle from '../interfaces/IArticle';

const Bookmarks = () => {
  const { userId, redirectToLogin } = useContext(CurrentUserContext);
  const [bookmarkList, setBookmarkList] = useState<IArticle[]>([]);

  useEffect(() => {
    const getBookmarksList = async () => {
      const url = `${import.meta.env.VITE_DB_URL}api/users/${userId}/articles`;
      const { data } = await axios.get(url, { withCredentials: true });
      setBookmarkList(data);
    };
    getBookmarksList();
  }, []);

  //Redirige directement au login si on n'est pas connecté
  useEffect(() => {
    !userId && redirectToLogin();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bookmarks">
        <div className="bookmarks__return">
          <ReturnButton />
        </div>
        <h1 className="bookmarks__title">Mes articles sauvegardés</h1>
        <h2 className="bookmarks__count">
          {bookmarkList.length === 1
            ? `${bookmarkList.length} article sauvegardé`
            : `${bookmarkList.length} articles sauvegardés`}
        </h2>
        <div className="bookmarks__list">
          {bookmarkList.length &&
            bookmarkList.map((bookmark) => (
              <ArticleCard key={bookmark.id} {...bookmark} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
