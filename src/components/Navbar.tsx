import CachedIcon from '@mui/icons-material/Cached';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

const Navbar = () => {
  return (
    <div>
      <nav className="main-menu">
        <ul className="main-menu__element">
          <li className="main-menu__element__nav">
            <SearchIcon className="main-menu__element__nav__icon" fontSize="large" />
            <p className="main-menu__element__nav__nav-text">Decouvrir</p>
          </li>
          <li className="main-menu__element__nav">
            <CachedIcon className="main-menu__element__nav__icon" fontSize="large" />
            <p className="main-menu__element__nav__nav-text">Utiliser</p>
          </li>
          <li className="main-menu__element__nav">
            <PersonOutlineIcon
              className="main-menu__element__nav__icon"
              fontSize="large"
            />
            <p className="main-menu__element__nav__nav-text">Mon compte</p>
          </li>
        </ul>

        <ul className="main-menu__element-logout">
          <li className="main-menu__element-logout__nav">
            <LogoutIcon
              className="main-menu__element-logout__nav__icon"
              fontSize="large"
            />
            <p className="main-menu__element-logout__nav__nav-text">Deconnexion</p>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
