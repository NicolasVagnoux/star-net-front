import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import IUser from '../../interfaces/IUser';

interface Props {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ setHasAccount }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();

  const redirectHome = () => {
    navigate('/home');
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data } = await axios.post<IUser>(
        'http://localhost:3000/api/login',
        { email, password },
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      console.log(data);
      setErrorMessage('');
      redirectHome();
    } catch (err: any) {
      console.log(err.response.status);
      console.log(err.response.data.message);
      if (err.response?.status === 401) {
        setErrorMessage('Mot de passe incorrect');
      }
      if (err.response?.status === 404) {
        setErrorMessage("Cet utilisateur n'existe pas");
      }
      if (err.response?.status === 422) {
        if (err.response.data.message.includes('password')) {
          setErrorMessage('Le mot de passe doit contenir 6 caractères minimum');
        } else {
          setErrorMessage('Email incorrect');
        }
      }
    }
  };
  console.log(errorMessage);

  return (
    <div className="loginForm">
      <h1 className="loginForm__title">Connexion</h1>
      <h2 className="loginForm__smallTitle">Connectez vous à votre compte *NET</h2>
      <form
        className="loginForm__form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          login(e);
        }}>
        <div className="loginForm__form__email">
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
        <div className="loginForm__form__password">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
        <div className="loginForm__form__check">
          <input type="checkbox" id="check" />
          <label htmlFor="check">Rester connecté sur le site.</label>
        </div>
        {errorMessage && <span className="loginForm__form__error">{errorMessage}</span>}
        <input className="loginForm__form__submit" type="submit" value="Me Connecter" />
      </form>
      <button
        className="loginForm__noAccount"
        onClick={() => {
          setHasAccount(false);
        }}
        type="button">
        Je n&apos;ai pas encore de compte
      </button>
    </div>
  );
};

export default LoginForm;
