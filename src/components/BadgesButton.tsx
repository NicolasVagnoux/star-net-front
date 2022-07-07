import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import React from 'react';
import { Link } from 'react-router-dom';

const BadgesButton = () => {
  return (
    <div className="badgesbutton">
      <Link to="/rewards">
        <WorkspacePremiumIcon />
      </Link>
    </div>
  );
};

export default BadgesButton;
