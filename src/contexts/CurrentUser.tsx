import React, { createContext, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type UserContent = {
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  redirectToLogin: () => void;
  stayLogged: boolean;
  setStayLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = { children: React.ReactNode };

const CurrentUserContext = createContext<UserContent>({
  userId: 0,
  setUserId: () => {},
  redirectToLogin: () => {},
  stayLogged: false,
  setStayLogged: () => {},
});

export const CurrentUserContextProvider: React.FC<Props> = ({ children }) => {
  interface IMyUser {
    id: number;
  }

  const [stayLogged, setStayLogged] = useState<boolean>(false);

  const MyUser = JSON.parse(
    localStorage.getItem('myUser') || sessionStorage.getItem('myUser') || '{"id": 0}',
  ) as unknown as IMyUser; // c) définit une constante qui récupère le local storage
  const [userId, setUserId] = useState<number>(MyUser.id); // d) useState id qui, à chaque actualisation, prend la valeur du local storage

  const navigate: NavigateFunction = useNavigate();
  const redirectToLogin = () => {
    navigate('/');
  };

  return (
    <CurrentUserContext.Provider
      value={{ userId, setUserId, redirectToLogin, stayLogged, setStayLogged }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
