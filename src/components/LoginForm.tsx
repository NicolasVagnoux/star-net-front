import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React, { useState } from 'react';

interface Props {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ setHasAccount }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className="loginForm">
      <h1 className="loginForm__title">Connexion</h1>
      <h2 className="loginForm__smallTitle">Connectez vous à votre compte *NET</h2>
      <form className="loginForm__form">
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
