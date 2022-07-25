import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import BadgesButton from '../components/BadgesButton';
import BookmarksButton from '../components/BookmarksButton';
import CatalogButton from '../components/CatalogButton';
import Navbar from '../components/Navbar';
import PackageList from '../components/PackageList';
import CurrentUserContext from '../contexts/CurrentUser';
import IUser from '../interfaces/IUser';

const Home = () => {
  // Get information from connected user to display a personalized homepage
  const { userId, redirectToLogin } = useContext(CurrentUserContext);
  const [userInfo, setUserInfo] = useState<IUser>();

  useEffect(() => {
    const getUserInfo = async () => {
      const url = `${import.meta.env.VITE_DB_URL}api/users/${userId}`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUserInfo(data);
    };
    getUserInfo();
  }, []);

  //Redirige directement au login si on n'est pas connecté
  useEffect(() => {
    !userId && redirectToLogin();
  }, []);

  return (
    <>
      <Navbar />
      <div className="home">
        <h1>Bonjour {userInfo?.firstName} </h1>
        <h2> Lisez, découvrez, apprenez </h2>
        <PackageList userId={userId} />
        <div className="home__button">
          <CatalogButton />
          <BookmarksButton />
          <BadgesButton />
        </div>
      </div>
    </>
  );
};

export default Home;
