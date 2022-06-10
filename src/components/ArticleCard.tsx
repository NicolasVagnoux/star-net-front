import { mdiBookmark, mdiBookmarkOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';

interface IArticle {
  id: number;
  title: string;
  idUser: number;
  mainImage: string;
  mainContent: string;
}

const ArticleCard = ({ title, mainImage, idUser }: IArticle) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  return (
    <div className="articleCard">
      <img className="articleCard__image" src={mainImage} alt="" />
      <div className="articleCard__text">
        <h4 className="articleCard__text__title">{title}</h4>
        <p className="articleCard__text__author">Par Auteur {idUser}, le 05/03/22</p>
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
