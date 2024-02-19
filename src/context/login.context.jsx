import React, { createContext, useContext, useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '../helper/constants/constant.ts';
import { useNavigate } from 'react-router-dom';
import { PathName } from '../helper/constants/pathNames.ts';
import {
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/login";
import ChatList from "../pages/chatList";
import DocumentList from "../pages/documentList";
import UserList from "../pages/userList";
import RegisterSuccessFully from "../pages/registerSuccessFully";
import Register from "../pages/register";
import LoginSuccessFully from "../pages/loginSuccessFully";
import ShareDocument from "../pages/shareDocument";
import NotFound from "../pages/notFound";
import Navbar from "../navigation/navbar";
import { Logo } from '../components/Icons';

function UnauthenticatedRoutes() {
  return (
    <Routes>
      <Route path={PathName.loginPath} element={<Login />} />
      <Route path={PathName.registerPath} element={<Register />} />
      <Route path={PathName.notFoundPath} element={<NotFound />} />
      {/* <Route path={PathName.loginSuccessPath} element={<LoginSuccessFully />} /> */}
      {/* <Route
        path={PathName.registerSuccessPath}
        element={<RegisterSuccessFully />}
      /> */}
    </Routes>
  );
}

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path={PathName.homePath} element={<ChatList />} />
        <Route path={PathName.documentListPath} element={<DocumentList />} />
        <Route path={PathName.userListPath} element={<UserList />} />
        <Route path={PathName.registerPath} element={<Register  />} />
        <Route
          path={PathName.registerSuccessPath}
          element={<RegisterSuccessFully />}
        />
        <Route path={PathName.loginSuccessPath} element={<LoginSuccessFully />} />
        <Route path={PathName.shareDoc} element={<ShareDocument />} />
        <Route path={PathName.notFoundPath} element={<NotFound isAuthenticated={true}/>} />
      </Route>
    </Routes>
  );
}

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
    console.log("token change2", token)
    // or check for valid token
    // if (!token) {
    //   navigate(PathName.loginPath)
    // }
  }, [token, navigate]);
  const login = (user) => {
    // Perform login logic (validate credentials, etc.)
    // For simplicity, let's just set a user when login is successful
    setUser(user);
  };

  const logout = () => {
    // Perform logout logic (clear user, etc.)
    console.log("clicked logout")
    localStorage.removeItem(ACCESS_TOKEN);
    setUser(null);
    setT(null);
    navigate(PathName.loginPath)
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
      <div id='headroom' className='center'>
        <hr />
        <Logo />
      </div>
      {token ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
      {children}
    </LoginContext.Provider>
  );
};

// Create a custom hook to access the context
export const useLogin = () => {
  return useContext(LoginContext);
};
