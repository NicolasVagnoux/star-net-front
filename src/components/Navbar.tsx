import CachedIcon from '@mui/icons-material/Cached';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import React, { useContext, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUser';

const Navbar = () => {
  const navigate: NavigateFunction = useNavigate();
  const [isLogoutModalOpened, setIsLoginModalOpened] = useState<boolean>(false);
  const { setUserId } = useContext(CurrentUserContext);

  const logout = () => {
    setUserId(0); // remet immédiatement l'id du contexte à 0
    localStorage.clear(); // vide le local storage
    sessionStorage.clear(); // vide le session storage
    navigate('/');
  };

  return (
    <div>
      <nav className="main-menu">
        <ul className="main-menu__element">
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <li className="main-menu__element__nav">
              <HomeOutlinedIcon className="main-menu__element__nav__icon" fontSize="large" />
              <p className="main-menu__element__nav__nav-text">Découvrir</p>
            </li>
          </Link>
          <li className="main-menu__element__nav">
            <CachedIcon className="main-menu__element__nav__icon" fontSize="large" />
            <p className="main-menu__element__nav__nav-text">Utiliser</p>
          </li>
          <Link to="/myaccount" style={{ textDecoration: 'none' }}>
            <li className="main-menu__element__nav">
              <PersonOutlineIcon
                className="main-menu__element__nav__icon"
                fontSize="large"
              />
              <p className="main-menu__element__nav__nav-text">Mon compte</p>
            </li>
          </Link>
        </ul>
        <Link to="/support" className="main-menu__element-contact">
          <button type="button">
            <ContactSupportOutlinedIcon />
            <p>Contacter l&apos;équipe *Net</p>
          </button>
        </Link>
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
            <p className="main-menu__element-logout__nav__nav-text">Déconnexion</p>
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
