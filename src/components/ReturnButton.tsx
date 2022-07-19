import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React from 'react';

const ReturnButton = () => {
  return (
    <div className="return">
      <button
        onClick={() => {
          window.history.back();
        }}
        className="return__content"
      >
        <ArrowBackIosNewIcon fontSize="small" />
        <div className="return__content__text"> Retour </div>
      </button>
    </div>
  );
};

export default ReturnButton;
