import 'react-toastify/dist/ReactToastify.css';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

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

  //toast when a bookmark is created
  const notifyBookmark = () =>
    toast.success("L'article a été sauvegardé avec succès !", {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });

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
      notifyBookmark();
    } catch (err) {
      console.error(err);
    }
  };

  //toast when a bookmark is deleted
  const notifyDeletedBookmark = () =>
    toast.success("L'article a bien été supprimé des articles sauvegardés", {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });

  const deleteBookmark = async (e: React.FormEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await axios.delete<IBookmark>(
        `http://localhost:3000/api/users/${user.id}/bookmarks/${id}`,
        { withCredentials: true },
      );
      setIsBookmarked(false);
      notifyDeletedBookmark();
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
              Par {userData?.firstName} {userData?.lastName},<br /> le{' '}
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
