import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React, { useState } from 'react';

interface Props {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupForm = ({ setHasAccount }: Props) => {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  return (
    <div className="signupForm">
      <h1 className="signupForm__title">Inscription</h1>
      <h2 className="signupForm__smallTitle">Créez votre compte *NET</h2>
      <form className="signupForm__form">
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
        <div className="signupForm__form__password2">
          <label htmlFor="password2">Confirmation de mot de passe</label>
          <input
            type="password"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
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
          <input type="checkbox" id="check" />
          <label htmlFor="check">
            J&apos;ai lu et j&apos;accepte les{' '}
            <span>Conditions Générales d&apos;Utilisation</span>.
          </label>
        </div>
        <input className="signupForm__form__submit" type="submit" value="M'inscrire" />
      </form>
      <button
        className="signupForm__gotAccount"
        onClick={() => {
          setHasAccount(true);
        }}
        type="button">
        J&apos;ai déjà un compte
      </button>
    </div>
  );
};

export default SignupForm;
