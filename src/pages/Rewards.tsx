import React, { useContext, useEffect } from 'react';

import BadgesList from '../components/BadgeList';
import LevelBar from '../components/LevelBar';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import ReturnButton from '../components/ReturnButton';
import CurrentUserContext from '../contexts/CurrentUser';

const Rewards = () => {
  const { userId, redirectToLogin } = useContext(CurrentUserContext);
  //Redirige directement au login si on n'est pas connecté
  useEffect(() => {
    !userId && redirectToLogin();
  }, []);

  return (
    <div className="rewards">
      <Navbar />
      <ReturnButton />
      <h1>Recompenses decouverte</h1>

      <ProgressBar />
      <BadgesList />
      <LevelBar />
    </div>
  );
};

export default Rewards;
