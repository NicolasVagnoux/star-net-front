import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUser';
import IUser from '../interfaces/IUser';
import BeGuided from './BeGuided';

interface Props {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  notifySuccess: () => void;
}

const SignupForm = ({ setHasAccount, notifySuccess }: Props) => {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [passwordsAreEqual, setPasswordsAreEqual] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isGuideOpened, setIsGuideOpened] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const { setUserId } = useContext(CurrentUserContext);

  const redirectHome = () => {
    navigate('/home');
  };

  const verifyDoublePassword = () => {
    if (password2) {
      password === password2 ? setPasswordsAreEqual(true) : setPasswordsAreEqual(false);
    }
    setErrorMessage('');
  };

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const url = `${import.meta.env.VITE_DB_URL}api/users`;
      e.preventDefault();
      // Add user route
      await axios.post<IUser>(
        url,
        { firstName: firstname, lastName: lastname, email: email, password: password2 },
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      setErrorMessage('');
      // Login route
      const { data } = await axios.post<IUser>(
        `${import.meta.env.VITE_DB_URL}api/login`,
        { email: email, password: password2 },
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      setIsGuideOpened(true);
      notifySuccess();
      setUserId(data.id);
      localStorage.setItem('myUser', JSON.stringify({ id: data.id }));
    } catch (err: any) {
      if (err.response?.status === 409) {
        setErrorMessage('Cet email est déjà utilisé');
      }
      if (err.response?.status === 422) {
        console.log(err.response.data.message);
        if (err.response.data.message.includes('password')) {
          setErrorMessage('Le mot de passe doit contenir entre 6 et 50 caractères');
        } else if (err.response.data.message.includes('email')) {
          setErrorMessage('Email invalide');
        } else {
          setErrorMessage('Format de données invalide');
        }
      }
    }
  };

  return (
    <>
      <div className="signupForm">
        <h1 className="signupForm__title">Inscription</h1>
        <h2 className="signupForm__smallTitle">Créez votre compte *NET</h2>
        <form
          className="signupForm__form"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            passwordsAreEqual ? signup(e) : e.preventDefault();
          }}>
          <div className="signupForm__form__name">
            <div className="signupForm__form__name__firstname">
              <label htmlFor="firstname">Prénom</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                placeholder="John"
                id="firstname"
                required
              />
              <button
                type="button"
                onClick={() => {
                  setFirstname('');
                }}>
                <HighlightOffIcon />
              </button>
            </div>
            <div className="signupForm__form__name__lastname">
              <label htmlFor="lastname">Nom</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                placeholder="Doe"
                id="lastname"
                required
              />
              <button
                type="button"
                onClick={() => {
                  setLastname('');
                }}>
                <HighlightOffIcon />
              </button>
            </div>
          </div>
          <div className="signupForm__form__email">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="johndoe@gmail.com"
              id="email"
              required
            />
            <button
              type="button"
              onClick={() => {
                setEmail('');
              }}>
              <HighlightOffIcon />
            </button>
          </div>
          <div className="signupForm__form__password1">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onBlur={verifyDoublePassword}
              placeholder="**********"
              id="password"
              required
            />
            <button
              type="button"
              onClick={() => {
                setPassword('');
              }}>
              <HighlightOffIcon />
            </button>
          </div>
          <div
            className={`signupForm__form__password2 ${
              !passwordsAreEqual && 'signupForm__form__password2--wrong'
            }`}>
            <label htmlFor="password2">
              {passwordsAreEqual
                ? 'Confirmation de mot de passe'
                : 'Le mot de passe de confirmation doit être identique'}
            </label>
            <input
              type="password"
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
              onBlur={verifyDoublePassword}
              placeholder="**********"
              id="password2"
              required
            />
            <button
              type="button"
              onClick={() => {
                setPassword2('');
              }}>
              <HighlightOffIcon />
            </button>
          </div>
          <div className="signupForm__form__cgu">
            <input type="checkbox" id="check" required />
            <label htmlFor="check">
              J&apos;ai lu et j&apos;accepte les{' '}
              <span>Conditions Générales d&apos;Utilisation</span>.
            </label>
          </div>
          <input className="signupForm__form__submit" type="submit" value="M'inscrire" />
        </form>
        {!errorMessage && (
          <button
            className="signupForm__gotAccount"
            onClick={() => {
              setHasAccount(true);
            }}
            type="button">
            J&apos;ai déjà un compte
          </button>
        )}
        {errorMessage && <span className="signupForm__error">{errorMessage}</span>}
      </div>
      {isGuideOpened && <BeGuided redirectHome={redirectHome} />}
    </>
  );
};

export default SignupForm;
