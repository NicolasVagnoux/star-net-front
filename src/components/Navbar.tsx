import CachedIcon from '@mui/icons-material/Cached';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [removeCookie] = useCookies(['user_token']);
  const navigate: NavigateFunction = useNavigate();
  const [isLogoutModalOpened, setIsLoginModalOpened] = useState<boolean>(false);

  const logout = () => {
    removeCookie('user_token');
    navigate('/');
  };

  return (
    <div>
      <nav className="main-menu">
        <ul className="main-menu__element">
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <li className="main-menu__element__nav">
              <SearchIcon className="main-menu__element__nav__icon" fontSize="large" />
              <p className="main-menu__element__nav__nav-text">Decouvrir</p>
            </li>
          </Link>
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
          <hr className="main-menu__element-logout__border" />
          <button
            className="main-menu__element-logout__nav"
            type="button"
            onClick={() => {
              setIsLoginModalOpened(true);
            }}>
            <LogoutIcon
              className="main-menu__element-logout__nav__icon"
              fontSize="large"
            />
            <p className="main-menu__element-logout__nav__nav-text">Deconnexion</p>
          </button>
        </ul>
      </nav>
      {isLogoutModalOpened && (
        <div className="main-menu__logout-modal">
          <div className="main-menu__logout-modal__content">
            <p>Êtes-vous sûr(e) de vouloir vous déconnecter ?</p>
            <div className="main-menu__logout-modal__content__buttons">
              <button type="button" onClick={logout}>
                OUI
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLoginModalOpened(false);
                }}>
                NON
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
