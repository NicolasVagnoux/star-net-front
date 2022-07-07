import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { Link } from 'react-router-dom';

const CatalogButton = () => {
  return (
    <Link to="/catalog">
      <div className="catalogButton">
        <SearchIcon />
      </div>
    </Link>
  );
};

export default CatalogButton;
