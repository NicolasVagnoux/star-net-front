import BookmarksIcon from '@mui/icons-material/Bookmarks';
import React from 'react';
import { Link } from 'react-router-dom';

const BookmarksButton = () => {
  return (
    <div className="bookmarksbutton">
      <Link to="/bookmarks">
        <BookmarksIcon />
      </Link>
    </div>
  );
};

export default BookmarksButton;
