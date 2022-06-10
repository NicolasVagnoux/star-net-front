import { mdiBookmark, mdiBookmarkOutline } from '@mdi/js';
import Icon from '@mdi/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IArticle from '../../interfaces/IArticle';
import IUser from '../../interfaces/IUser';

const ArticleCard = ({ title, mainImage, idUser, lastUpdateDate }: IArticle) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    const getUserData = async () => {
      const url = `http://localhost:3000/api/users/${idUser}`;
      const { data } = await axios.get(url);
      setUserData(data);
    };
    getUserData();
  }, []);
  console.log(userData);

  return (
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
          {isBookmarked && <Icon path={mdiBookmark} size={1.6} color="#6a8eae" />}
        </button>
        <button
          className="articleCard__bookmark__svg"
          onClick={() => {
            setIsBookmarked(!isBookmarked);
          }}>
          {!isBookmarked && <Icon path={mdiBookmarkOutline} size={1.6} color="#6a8eae" />}
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
