import React from 'react';

const LevelBar = () => {
  return (
    <div className="levelBar">
      <p className="levelBar__title">Niveau 1: Neophyte</p>
      <div className="levelBar__background">
        <div className="levelBar__xp">75/100 xp</div>
      </div>
    </div>
  );
};

export default LevelBar;
