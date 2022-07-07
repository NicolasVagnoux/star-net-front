import React from 'react';

import BadgesList from '../components/BadgeList';
import LevelBar from '../components/LevelBar';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import ReturnButton from '../components/ReturnButton';

const Rewards = () => {
  return (
    <div className="rewards">
      <Navbar />
      <ReturnButton />
      <h1>Recompenses decouverte</h1>
      <LevelBar />
      <ProgressBar />
      <BadgesList />
    </div>
  );
};

export default Rewards;
