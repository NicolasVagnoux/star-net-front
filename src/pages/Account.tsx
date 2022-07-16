import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import React, { useContext, useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

import Navbar from '../components/Navbar';
import CurrentUserContext from '../contexts/CurrentUser';
import IUser from '../interfaces/IUser';

const Account = () => {
  // Collect idUser connected with the cookie
  // const cookie = useCookies(['user_token'])[0];
  // const user: IUser = jwt_decode(cookie.user_token); -> Old version with token
  const { userId } = useContext(CurrentUserContext);

  const [userData, setUserData] = useState<IUser>();

  // useState to edit your firstname
  const [firstname, setFirstname] = useState<string>('');
  // useState to edit your lastname
  const [lastname, setLastname] = useState<string>('');
  // useState to edit your new password
  const [newpassword, setNewPassword] = useState<string>('');
  // useState to confirm your new password
  const [newpassword2, setNewPassword2] = useState<string>('');
  // usestate to check newpassword and newpassword2 are equal
  const [newPasswordsEqual, setNewPasswordsEqual] = useState<boolean>(true);
  // usestate to set error messages
  const [errorMessage, setErrorMessage] = useState<string>('');

  console.log(errorMessage);

  // useEffect to catch user connected data
  useEffect(() => {
    const getData = async () => {
      // get user data
      const { data } = await axios.get<IUser>(
        `${import.meta.env.VITE_DB_URL}api/users/${userId}`,
        { withCredentials: true },
      );
      setUserData(data);
      setFirstname(data.firstName);
      setLastname(data.lastName);
    };
    getData();
  }, []);

  // function to compare newpassword and newpassword2
  const verifyDoublePassword = () => {
    newpassword === newpassword2
      ? setNewPasswordsEqual(true)
      : setNewPasswordsEqual(false);
    setErrorMessage('');
  };

  // Notify success update
  const notifySuccess = () =>
    toast.info('Les données ont bien été modifiées !', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });

  // update user data edit in DB with axios , handling with/out password
  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await axios.put<IUser>(
        `${import.meta.env.VITE_DB_URL}api/users/${userId}`,
        newpassword && newpassword2 && newPasswordsEqual
          ? { firstName: firstname, lastName: lastname, password: newpassword2 }
          : { firstName: firstname, lastName: lastname },
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      notifySuccess();
      setErrorMessage('');
    } catch (err: any) {
      if (err.response?.status === 422) {
        console.log(err.response.data.message);
        if (err.response.data.message.includes('password')) {
          setErrorMessage('Le mot de passe doit contenir entre 6 et 50 caractères');
        } else {
          setErrorMessage('Format de données invalide');
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="account">
        <div className="account__myaccount">
          <h1 className="account__myaccount__title">Mon Compte</h1>
          <h2 className="account__myaccount__secondtitle">Modifier mes données</h2>
          <form
            className="account__myaccount__form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              newPasswordsEqual ? updateUser(e) : e.preventDefault();
            }}>
            {/* firstname */}
            <div className="account__myaccount__form__firstname">
              <label htmlFor="firstname">Prénom</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                placeholder={userData?.firstName}
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

            {/* lastname */}
            <div className="account__myaccount__form__lastname">
              <label htmlFor="lastname">Nom</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                placeholder={userData?.lastName}
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

            {/* newpassword */}
            <div className="account__myaccount__form__newpassword">
              <label htmlFor="newpassword">Mon nouveau mot de passe</label>
              <input
                type="text"
                value={newpassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                placeholder="*********"
                id="newpassword"
              />
              <button
                type="button"
                onClick={() => {
                  setNewPassword('');
                }}>
                <HighlightOffIcon />
              </button>
            </div>

            {/* newpassword2 */}
            <div
              className={`account__myaccount__form__newpassword2 ${
                !newPasswordsEqual && 'account__myaccount__form__newpassword2--wrong'
              } `}>
              <label htmlFor="newpassword2">
                {' '}
                {newPasswordsEqual
                  ? 'Confirmez mon nouveau mot de passe'
                  : 'Le mot de passe de confirmation doit être identique'}{' '}
              </label>
              <input
                type="text"
                value={newpassword2}
                onChange={(e) => {
                  setNewPassword2(e.target.value);
                }}
                //  onBlur ?
                onBlur={verifyDoublePassword}
                placeholder="*********"
                id="newpassword2"
              />
              <button
                type="button"
                onClick={() => {
                  setNewPassword2('');
                }}>
                <HighlightOffIcon />
              </button>
            </div>
            <input
              className="account__myaccount__form__submit"
              type="submit"
              value="Sauvegarder"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Account;
