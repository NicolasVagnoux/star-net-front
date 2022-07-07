import BookmarksIcon from '@mui/icons-material/Bookmarks';
import React from 'react';
import { Link } from 'react-router-dom';

const BookmarksButton = () => {
  return (
    <Link to="/bookmarks">
      <div className="bookmarksbutton">
        <BookmarksIcon />
      </div>
    </Link>
  );
};

export default BookmarksButton;
