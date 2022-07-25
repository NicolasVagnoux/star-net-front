// import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
// import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
// import AndroidOutlinedIcon from '@mui/icons-material/AndroidOutlined';
// import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
// import CurrencyBitcoinOutlinedIcon from '@mui/icons-material/CurrencyBitcoinOutlined';
// import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
// import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
// import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
// import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
// import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
// import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
// import OnlinePredictionOutlinedIcon from '@mui/icons-material/OnlinePredictionOutlined';
// import SchoolIcon from '@mui/icons-material/School';
import StarsIcon from '@mui/icons-material/Stars';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import CurrentUserContext from '../contexts/CurrentUser';
import IArticle from '../interfaces/IArticle';
import IPackageItem from '../interfaces/IPackageItem';

const BadgeList = () => {
  // Get user id with context
  const { userId } = useContext(CurrentUserContext);

  // Collect article completed by user and followed package
  const [completedArticles, setCompletedArticles] = useState<IArticle[]>();
  const [followedPackage, setFollowedPackages] = useState<IPackageItem[]>();

  const getCompletedArticles = async () => {
    const url = `${import.meta.env.VITE_DB_URL}api/users/${userId}/completedarticles`;
    const { data } = await axios.get(url, { withCredentials: true });
    setCompletedArticles(data);
  };

  const getFollowedPackages = async () => {
    const url = `${import.meta.env.VITE_DB_URL}api/users/${userId}/followedpackages`;
    const { data } = await axios.get(url, { withCredentials: true });
    setFollowedPackages(data);
  };

  useEffect(() => {
    getFollowedPackages();
    getCompletedArticles();
  }, []);

  // Defining conditions to obtain badges

  return (
    <div className="badgeList">
      <div className="badgeList__list">
        {/* First badge : 1 article completed */}
        {completedArticles && (
          <div className="badgeList__list__icon">
            <StarsIcon
              sx={
                completedArticles?.length >= 1
                  ? { fontSize: 100, color: 'blue' }
                  : { fontSize: 100, color: 'black' }
              }
            />
            <h2
              className="badgeList__list__icon__description"
              style={
                completedArticles?.length >= 1 ? { color: 'purple' } : { color: 'grey' }
              }>
              {' '}
              1 article complété
            </h2>
          </div>
        )}
        {/* Second badge : 5 articles completed */}
        {completedArticles && (
          <div className="badgeList__list__icon">
            <WorkspacePremiumIcon
              sx={
                completedArticles?.length >= 5
                  ? { fontSize: 100, color: 'blue' }
                  : { fontSize: 100, color: 'black' }
              }
            />
            <h2
              className="badgeList__list__icon__description"
              style={
                completedArticles?.length >= 5 ? { color: 'purple' } : { color: 'grey' }
              }>
              {' '}
              5 articles complétés
            </h2>
          </div>
        )}
        {/* Third badge : 1 followed packages */}
        {followedPackage && (
          <div className="badgeList__list__icon">
            <MilitaryTechIcon
              sx={
                followedPackage?.length >= 1
                  ? { fontSize: 100, color: 'blue' }
                  : { fontSize: 100, color: 'black' }
              }
            />
            <h2
              className="badgeList__list__icon__description"
              style={
                followedPackage?.length >= 1 ? { color: 'purple' } : { color: 'grey' }
              }>
              {' '}
              1 package suivi{' '}
            </h2>
          </div>
        )}
        {/* <LocalPoliceOutlinedIcon sx={{ fontSize: 100, color: 'black' }} />
        <EmojiEventsOutlinedIcon sx={{ fontSize: 100, color: 'black' }} />
        <FactCheckOutlinedIcon sx={{ fontSize: 100, color: 'black' }} />
        <AnalyticsOutlinedIcon sx={{ fontSize: 100, color: 'black' }} />
        <CurrencyExchangeOutlinedIcon sx={{ fontSize: 100, color: 'black' }} />
        <CurrencyBitcoinOutlinedIcon sx={{ fontSize: 100, color: 'black' }} />
        <AutoGraphOutlinedIcon sx={{ fontSize: 100, color: 'black' }} />
        <InsertEmoticonOutlinedIcon sx={{ fontSize: 100, color: 'black' }} />
        <OnlinePredictionOutlinedIcon sx={{ fontSize: 100, color: 'black' }} />
        <NotificationsActiveOutlinedIcon sx={{ fontSize: 100, color: 'black' }} />
        <AllInclusiveOutlinedIcon sx={{ fontSize: 100, color: 'black' }} />
        <AndroidOutlinedIcon sx={{ fontSize: 100, color: 'black' }} /> */}
      </div>
    </div>
  );
};

export default BadgeList;
