import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import IArticle from '../interfaces/IArticle';
import IUser from '../interfaces/IUser';

const ArticleCard = ({ title, mainImage, idUser, lastUpdateDate, id }: IArticle) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>();
  const cookie = useCookies(['user_token'])[0];
  const user: IUser = jwt_decode(cookie.user_token);

  useEffect(() => {
    const getUserData = async () => {
      const url = `http://localhost:3000/api/users/${idUser}`;
      const { data } = await axios.get(url);
      setUserData(data);
    };

    const getBookmarkOrNot = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/users/${user.id}/bookmarks/${id}`,
        { withCredentials: true },
      );
      data ? setIsBookmarked(true) : setIsBookmarked(false);
    };

    getUserData();
    getBookmarkOrNot();
  }, []);

  interface IBookmark {
    idArticle: number;
  }

  const addBookmark = async (e: React.FormEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await axios.post<IBookmark>(
        `http://localhost:3000/api/users/${user.id}/bookmarks`,
        { idArticle: id },
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      setIsBookmarked(true);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBookmark = async (e: React.FormEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await axios.delete<IBookmark>(
        `http://localhost:3000/api/users/${user.id}/bookmarks/${id}`,
        { withCredentials: true },
      );
      setIsBookmarked(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="articleContainer">
      <Link to={`/articles/${id}`} style={{ textDecoration: 'none' }}>
        <div className="articleContainer__articleCard">
          <img className="articleContainer__articleCard__image" src={mainImage} alt="" />
          <div className="articleContainer__articleCard__text">
            <h4 className="articleContainer__articleCard__text__title">{title}</h4>
            <p className="articleContainer__articleCard__text__author">
              Par {userData?.firstName} {userData?.lastName}, le{' '}
              {lastUpdateDate.toLocaleString('en-GB').slice(0, 10)}
            </p>
          </div>
        </div>
      </Link>

      <div className="articleContainer__bookmark">
        {isBookmarked && (
          <button
            className="articleContainer__bookmark__svg"
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
              deleteBookmark(e);
            }}>
            <BookmarkIcon />
          </button>
        )}
        {!isBookmarked && (
          <button
            className="articleContainer__bookmark__svg"
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
              addBookmark(e);
            }}>
            <BookmarkBorderIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
