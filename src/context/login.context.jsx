import React, { createContext, useContext, useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '../helper/constants/constant.ts';
import { useNavigate } from 'react-router-dom';
import { PathName } from '../helper/constants/pathNames.ts';

// Create a context with initial values
const LoginContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  token : '',
  setToken : (token)=>{},

});

// Create a provider component that will wrap your app
export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const jwtToken = localStorage.getItem(ACCESS_TOKEN);
  const [token, setT] = useState(jwtToken || null)
  const setToken = (token) => {
    if (token) {
      setT(token)
      localStorage.setItem(ACCESS_TOKEN, token);
    }
  }

  useEffect( ()=> {
    console.log("token change", token)
    // or check for valid token
    if (!token) {
      navigate(PathName.loginPath)
    }
  }, [token, navigate]);
  const login = (user) => {
    // Perform login logic (validate credentials, etc.)
    // For simplicity, let's just set a user when login is successful
    setUser(user);
  };

  const logout = () => {
    // Perform logout logic (clear user, etc.)
    setUser(null);
    setToken(null);
    localStorage.setItem(ACCESS_TOKEN, '');
  };

  // Provide the context value to the components
  const contextValue = {
    user,
    login,
    logout,
    token, setToken
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};

// Create a custom hook to access the context
export const useLogin = () => {
  return useContext(LoginContext);
};
