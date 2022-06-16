import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import IArticle from '../../interfaces/IArticle';
import IUser from '../../interfaces/IUser';

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
    <Link to={`/articles/${id}`} style={{ textDecoration: 'none' }}>
      <div className="articleCard">
        <img className="articleCard__image" src={mainImage} alt="" />
        <div className="articleCard__text">
          <h4 className="articleCard__text__title">{title}</h4>
          <p className="articleCard__text__author">
            Par {userData?.firstName} {userData?.lastName}, le{' '}
            {lastUpdateDate.toLocaleString('en-GB').slice(0, 10)}
          </p>
        </div>
        <div className="articleCard__bookmark">
          <button
            className="articleCard__bookmark__svg"
            onClick={() => {
              setIsBookmarked(!isBookmarked);
            }}>
            {isBookmarked && <BookmarkIcon />}
          </button>
          <button
            className="articleCard__bookmark__svg"
            onClick={() => {
              setIsBookmarked(!isBookmarked);
            }}>
            {!isBookmarked && <BookmarkBorderIcon />}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
