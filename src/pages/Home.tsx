import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import BadgesButton from '../components/BadgesButton';
import BookmarksButton from '../components/BookmarksButton';
import CatalogButton from '../components/CatalogButton';
import Navbar from '../components/Navbar';
import PackageList from '../components/PackageList';
import IUser from '../interfaces/IUser';

const Home = () => {
  // Get information from connected user to display a personalized homepage
  const cookie = useCookies(['user_token'])[0];
  const user: IUser = jwt_decode(cookie.user_token);
  const [userInfo, setUserInfo] = useState<IUser>();
  const getUserInfo = async () => {
    const url = `${import.meta.env.VITE_DB_URL}api/users/${user.id}`;
    const { data } = await axios.get(url, { withCredentials: true });
    setUserInfo(data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar />
      <div className="home">
        <h1>Hello {userInfo?.firstName} </h1>
        <h2> Lisez, découvrez, apprenez </h2>
        <PackageList />
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
