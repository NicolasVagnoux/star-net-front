import React, { createContext, useState } from 'react';

type UserContent = {
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
};

type Props = { children: React.ReactNode };

const CurrentUserContext = createContext<UserContent>({
  userId: 0,
  setUserId: () => {},
});

export const CurrentUserContextProvider: React.FC<Props> = ({ children }) => {
  const [userId, setUserId] = useState<number>(0);

  return (
    <CurrentUserContext.Provider value={{ userId, setUserId }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
