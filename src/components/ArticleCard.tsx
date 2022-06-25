import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import IArticle from '../interfaces/IArticle';
import IUser from '../interfaces/IUser';

const ArticleCard = ({ title, mainImage, idUser, lastUpdateDate, id }: IArticle) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>();
  console.log(id);

  useEffect(() => {
    const getUserData = async () => {
      const url = `http://localhost:3000/api/users/${idUser}`;
      const { data } = await axios.get(url);
      setUserData(data);
    };
    getUserData();
  }, []);

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
        <button
          className="articleContainer__bookmark__svg"
          onClick={() => {
            setIsBookmarked(!isBookmarked);
          }}>
          {isBookmarked && <BookmarkIcon />}
        </button>
        <button
          className="articleContainer__bookmark__svg"
          onClick={() => {
            setIsBookmarked(!isBookmarked);
          }}>
          {!isBookmarked && <BookmarkBorderIcon />}
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
