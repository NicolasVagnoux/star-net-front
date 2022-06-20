import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ReturnButton = () => {
  return (
    <div className="return">
      <a href="/home" className="return__content">
        <ArrowBackIosNewIcon fontSize="small" />
        <div className="return__content__text"> Retour </div>
      </a>
    </div>
  );
};

export default ReturnButton;
