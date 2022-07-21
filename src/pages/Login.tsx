import 'react-toastify/dist/ReactToastify.css';

import React, { useContext, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import CurrentUserContext from '../contexts/CurrentUser';

const Login = () => {
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const { userId } = useContext(CurrentUserContext);
  const navigate: NavigateFunction = useNavigate();

  const notifySuccess = () =>
    toast.info('Votre inscription a bien été prise en compte !', {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });

  const redirectHome = () => {
    navigate('/home');
  };

  useEffect(() => {
    if (userId) {
      redirectHome();
    }
  }, []);

  return (
    <div className="loginSignup">
      {hasAccount ? (
        <LoginForm setHasAccount={setHasAccount} />
      ) : (
        <SignupForm setHasAccount={setHasAccount} notifySuccess={notifySuccess} />
      )}
    </div>
  );
};

export default Login;
