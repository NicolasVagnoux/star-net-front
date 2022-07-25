import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import React from 'react';
import { Link } from 'react-router-dom';

const BadgesButton = () => {
  return (
    <Link to="/rewards">
      <div className="badgesbutton">
        <WorkspacePremiumIcon />
      </div>
    </Link>
  );
};

export default BadgesButton;
