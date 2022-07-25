import 'react-toastify/dist/ReactToastify.css';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import CurrentUserContext from '../contexts/CurrentUser';
import IArticle from '../interfaces/IArticle';
import IUser from '../interfaces/IUser';

const ArticleCard = ({ title, mainImage, idUser, lastUpdateDate, id }: IArticle) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>();
  const { userId } = useContext(CurrentUserContext);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const getUserData = async () => {
      const url = `${import.meta.env.VITE_DB_URL}api/users/${idUser}`;
      const { data } = await axios.get(url);
      setUserData(data);
    };

    const getBookmarkOrNot = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_DB_URL}api/users/${userId}/bookmarks/${id}`,
        { withCredentials: true },
      );
      data ? setIsBookmarked(true) : setIsBookmarked(false);
    };

    const getCompletedOrNot = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_DB_URL}api/users/${userId}/completedarticles/${id}`,
        { withCredentials: true },
      );
      data ? setIsCompleted(true) : setIsCompleted(false);
    };

    getUserData();
    getBookmarkOrNot();
    getCompletedOrNot();
  }, []);

  interface IBookmark {
    idArticle: number;
  }

  //toast when a bookmark is created
  const notifyBookmark = () =>
    toast.info("L'article a été sauvegardé avec succès !", {
      position: 'bottom-right',
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
        `${import.meta.env.VITE_DB_URL}api/users/${userId}/bookmarks`,
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
    toast.info("L'article a bien été supprimé des articles sauvegardés", {
      position: 'bottom-right',
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
        `${import.meta.env.VITE_DB_URL}api/users/${userId}/bookmarks/${id}`,
        { withCredentials: true },
      );
      setIsBookmarked(false);
      notifyDeletedBookmark();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`articleContainer ${isCompleted && 'articleContainer--completed'}`}>
      <Link to={`/articles/${id}`} style={{ textDecoration: 'none' }}>
        <div className="articleContainer__articleCard">
          <img className="articleContainer__articleCard__image" src={mainImage} alt="" />
          <div className="articleContainer__articleCard__text">
            <h4 className="articleContainer__articleCard__text__title">{title}</h4>
            <p className="articleContainer__articleCard__text__author">
              Par {userData?.firstName} {userData?.lastName},<br /> le{' '}
              {lastUpdateDate
                .toLocaleString('fr-FR')
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('/')}
            </p>
          </div>
        </div>
      </Link>

      <div className="articleContainer__bookmark">
        {isCompleted && (
          <div className="articleContainer__bookmark__check">
            <CheckIcon />
          </div>
        )}
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
