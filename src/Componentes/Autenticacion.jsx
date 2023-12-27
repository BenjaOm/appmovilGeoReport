import React, { useState, createContext, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  const signIn = (token) => {
    // Guarda el token en el estado y en el almacenamiento seguro si es necesario
    setUserToken(token);
  };

  const signOut = () => {
    // Elimina el token del estado y del almacenamiento seguro si es necesario
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
