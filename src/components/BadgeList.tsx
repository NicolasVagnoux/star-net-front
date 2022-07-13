import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import AndroidOutlinedIcon from '@mui/icons-material/AndroidOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import CurrencyBitcoinOutlinedIcon from '@mui/icons-material/CurrencyBitcoinOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import OnlinePredictionOutlinedIcon from '@mui/icons-material/OnlinePredictionOutlined';
import SchoolIcon from '@mui/icons-material/School';
import StarsIcon from '@mui/icons-material/Stars';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import axios from 'axios';
import IUser from '../interfaces/IUser';
import IArticle from '../interfaces/IArticle';

const BadgeList = () => {
  // Get user info 
  const cookie = useCookies(['user_token'])[0];
  const user: IUser = jwt_decode(cookie.user_token);

  // Get current state (reward rule included) for each icons 
  const [articleCompleted, setArticleCompleted] = useState<IArticle[]>([]);
  const [packageFollowed, setPackageFollowed] = useState<IArticle[]>([]);

  // Axios calls to collect completed articles by user 
  useEffect(() => {
    const getCompletedArticles = async () => {
      const url = `${import.meta.env.VITE_DB_URL}api/users/${user.id}/completedarticles`;
      const { data } = await axios.get(url, { withCredentials: true });
      setArticleCompleted(data);
    };
    getCompletedArticles();
    console.log(articleCompleted);
  }, []);

  // Axios calls to collect followed packages by user 
  useEffect(() => {
    const getFollowedPackages = async () => {
      const url = `${import.meta.env.VITE_DB_URL}api/users/${user.id}/followedpackages`;
      const { data } = await axios.get(url, { withCredentials: true });
      setPackageFollowed(data);
    };
    getFollowedPackages();
    console.log(packageFollowed);
  }, []);


  return (
    <div className="badgeList">
      <div className="badgeList__icons">
        <StarsIcon sx={articleCompleted.length > 0 ? { fontSize: 100, color: 'red' } : { fontSize: 100, color: 'black' } } />
        <WorkspacePremiumIcon sx={articleCompleted.length > 4 ? { fontSize: 100, color: 'red' }: { fontSize: 100, color: 'black' }} />
        <SchoolIcon sx={packageFollowed.length > 0? { fontSize: 100, color: 'red' } : { fontSize: 100, color: 'black' }} />
        <MilitaryTechIcon sx={{ fontSize: 100, color: 'black' }} />
        <LocalPoliceOutlinedIcon sx={{ fontSize: 100, color: 'black' }} />
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
        <AndroidOutlinedIcon sx={{ fontSize: 100, color: 'black' }} />
      </div>
    </div>
  );
};

export default BadgeList;
