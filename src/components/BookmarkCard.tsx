import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import IArticle from '../interfaces/IArticle';
import IUser from '../interfaces/IUser';

const BookmarkCard = ({ id, idUser, lastUpdateDate, title, mainImage }: IArticle) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(true);
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    const getUserData = async () => {
      const url = `http://localhost:3000/api/users/${idUser}`;
      const { data } = await axios.get(url);
      setUserData(data);
    };
    getUserData();
  }, []);

  return (
    <div className="bookmarkContainer">
      <Link to={`/articles/${id}`} style={{ textDecoration: 'none' }}>
        <div className="bookmarkContainer__bookmarkCard">
          <img
            className="bookmarkContainer__bookmarkCard__image"
            src={mainImage}
            alt="articleImage"
          />
          <div className="bookmarkContainer__bookmarkCard__text">
            <h4 className="bookmarkContainer__bookmarkCard__text__title">{title}</h4>
            <p className="bookmarkContainer__bookmarkCard__text__author">
              Par {userData?.firstName} {userData?.lastName},<br /> le{' '}
              {lastUpdateDate.toLocaleString('en-GB').slice(0, 10)}
            </p>
          </div>
        </div>
      </Link>

      <div className="bookmarkContainer__bookmark">
        <button
          className="bookmarkContainer__bookmark__svg"
          onClick={() => {
            setIsBookmarked(!isBookmarked);
          }}>
          {isBookmarked && <BookmarkIcon />}
        </button>
        <button
          className="bookmarkContainer__bookmark__svg"
          onClick={() => {
            setIsBookmarked(!isBookmarked);
          }}>
          {!isBookmarked && <BookmarkBorderIcon />}
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;
