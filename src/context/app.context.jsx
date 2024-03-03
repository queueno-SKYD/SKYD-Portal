import React, { createContext, useContext, useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '../helper/constants/constant.ts';
import { useNavigate } from 'react-router-dom';
import { PathName } from '../helper/constants/pathNames.ts';
import {
  Routes,
  Route,
} from "react-router-dom";
import useAxios, { AxiosProvider } from '../api/restClient.jsx';
import url from "../api/url.ts"

import Login from "../pages/login/index.jsx";
import ChatList from "../pages/chatList/index.jsx";
import DocumentList from "../pages/documentList/index.jsx";
import UserList from "../pages/userList/index.jsx";
import RegisterSuccessFully from "../pages/registerSuccessFully/index.jsx";
import Register from "../pages/register/index.jsx";
import LoginSuccessFully from "../pages/loginSuccessFully/index.jsx";
import ShareDocument from "../pages/shareDocument/index.jsx";
import NotFound from "../pages/notFound/index.jsx";
import Navbar from "../navigation/navbar/index.jsx";
import { Logo } from '../components/Icons/index.js';
import Home from '../pages/home/index.jsx';
import ForgotPassword from '../pages/forgotPassword/index.jsx';
import Welcome from '../pages/welcome/index.jsx';
import NetworkStatusIndicator from './networkProvider.jsx';
import { dangerToast } from '../components/customToast/index.js';

function UnauthenticatedRoutes() {
  return (
    <Routes>
      <Route path={PathName.loginPath} element={<Login />} />
      <Route path={PathName.registerPath} element={<Register />} />
      <Route path={PathName.forgotPassword} element={<ForgotPassword />} />
      <Route path={PathName.notFoundPath} element={<NotFound />} />
      <Route path={PathName.homePath} element={<Welcome />} />
      {/* <Route
        path={PathName.registerSuccessPath}
        element={<RegisterSuccessFully />}
      /> */}
    </Routes>
  );
}

function AuthenticatedRoutes() {
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const { setUser, token } = useAppContext();
  const getMyDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get(url.Me)
      if (response.data) {
        setUser(response.data);
      } else {
        dangerToast(response?.message || "not found user")
      }
    } catch (error) {
      dangerToast(error?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMyDetails();
  }, [token]);

  return (
    <Routes>
      <Route element={<Navbar loading={loading} />}>
        <Route path={PathName.homePath} element={<Home />} />
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
export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const jwtToken = localStorage.getItem(ACCESS_TOKEN);
  const [token, setT] = useState(jwtToken || null)
  const [isMobilenavHideen, setMobilenavHideenD] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const setToken = (token) => {
    if (token) {
      setT(token)
      localStorage.setItem(ACCESS_TOKEN, token);
    }
  }
  const setMobilenavHideen = (value) => {
    if (value) {
      setMobilenavHideenD(value)
      document.documentElement.style.setProperty('--bottom-nav-size', '0px')
    } else {
      setMobilenavHideenD(value)
      document.documentElement.style.setProperty('--bottom-nav-size', '50px')
    }
  }
  const publicPath = [PathName.loginPath, PathName.registerPath, PathName.forgotPassword];

  useEffect( ()=> {
    console.log("token change2", token)
    // or check for valid token
    if (!token) {
      // navigate(PathName.loginPath)
      if(!publicPath.includes(window.location.pathname)){
        navigate(PathName.loginPath)
      }
    }
  }, [token]);
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
    token,
    setToken,
    isMobilenavHideen,
    setMobilenavHideen,
    isMobile,
    setUser
  };

  return (
    <LoginContext.Provider value={contextValue}>
      <AxiosProvider>
        <NetworkStatusIndicator />
        <div id='headroom' className='center'>
          <hr />
          <Logo />
        </div>
        {token ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
        {children}
      </AxiosProvider>
    </LoginContext.Provider>
  );
};

// Create a custom hook to access the context
export const useAppContext = () => {
  return useContext(LoginContext);
};
