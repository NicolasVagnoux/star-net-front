import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import ArticleCard from '../components/ArticleCard';
import Navbar from '../components/Navbar';
import ReturnButton from '../components/ReturnButton';
import IArticle from '../interfaces/IArticle';
import IUser from '../interfaces/IUser';

const Bookmarks = () => {
  const cookie = useCookies(['user_token'])[0];
  const user: IUser = jwt_decode(cookie.user_token);
  const [bookmarkList, setBookmarkList] = useState<IArticle[]>([]);

  useEffect(() => {
    const getBookmarksList = async () => {
      const url = `${import.meta.env.VITE_DB_URL}api/users/${user.id}/articles`;
      const { data } = await axios.get(url, { withCredentials: true });
      setBookmarkList(data);
    };
    getBookmarksList();
  }, []);
  console.log(bookmarkList);

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
