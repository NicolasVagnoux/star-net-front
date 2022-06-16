import React, { useState } from 'react';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Login = () => {
  const [hasAccount, setHasAccount] = useState<boolean>(true);

  return (
    <div className="loginSignup">
      {hasAccount ? (
        <LoginForm setHasAccount={setHasAccount} />
      ) : (
        <SignupForm setHasAccount={setHasAccount} />
      )}
    </div>
  );
};

export default Login;
