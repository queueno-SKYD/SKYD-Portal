import axios from "axios"

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAppContext } from "../context/app.context.jsx";
import { dangerToast, warningToast } from "../components/customToast";
import url from "./url.ts";

export const getHeaders = (token, file=false)=>{
  if (file) {
    if(token){
      return {
        'Authorization': token,
        'Content-Type': 'multipart/form-data'
      }
    }else{
      return {
        'Content-Type': 'multipart/form-data'
      }
    }
  }
  if(token){
    return {
      'Authorization': token,
      'Content-Type': 'application/json',
    }
  }else{
    return {
      'Content-Type': 'application/json',
    }
  }
}

// Create the context
<<<<<<< Updated upstream
const AxiosContext = createContext({get: async (url="", showGlobalMsg = true) => {}, post: async (url="", body={}, showGlobalMsg = true) => {}, uploadFile: async (selectedFile, fileType) => {}});
export const endPoint = 'http://localhost:3001';
=======
const AxiosContext = createContext({get: async (url="", showGlobalMsg = true) => {}, post: async (url="", body={}, showGlobalMsg = true) => {}, uploadFile: (selectedFile, fileType) => {}});
const endPoint = 'http://localhost:3004';
>>>>>>> Stashed changes

// Provider component
export const AxiosProvider = ({ children }) => {
  const { token } = useAppContext();
  const [error, setError] = useState(null);

  // Axios instance with default configuration
  const axiosInstance = axios.create({
    baseURL: endPoint,
    // Add any other default configurations here
  });

  // Global error handling
  const handleError = (error) => {
    setError(error);
  };

  // Interceptors for global error handling
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        handleError(error);
        return Promise.reject(error);
      }
    );
  }, [axiosInstance]);

  // Axios functions
  const post = async (url, body, showGlobalMsg = true, file=false) => {
    const headers = getHeaders(token, file)
    try {
      if (!navigator.onLine) {
        return
      }
      const response = await axiosInstance.post(url, body, {headers});
      return response?.data;
    } catch (error) {
      console.debug("🚀 --------------------------🚀")
      console.debug("🚀 ~ post ~ error:", error)
      console.debug("🚀 --------------------------🚀")
      if (showGlobalMsg) {
        handleError(error);
        if (error.code === "ERR_NETWORK") {
          warningToast("Sorry for inconveniance our server is down")
        }
      }
      return error?.response?.data ? error?.response?.data : undefined;
    }
  };

  const get = async (url, showGlobalMsg = true) => {
    const headers = getHeaders(token)
    try {
      if (!navigator.onLine) {
        return
      }
      const response = await axiosInstance.get(url, {headers});
      return response?.data;
    } catch (error) {
      if (showGlobalMsg) {
        handleError(error);
        if (error.code === "ERR_NETWORK") {
          warningToast("Sorry for inconveniance our server is down")
        }
      }
      return error?.response?.data ? error?.response?.data : undefined;
    }
  };

  const uploadFile = async (selectedFile, fileType='image', showGlobalMsg=true) => {
    const formData = new FormData();
    formData.append(fileType, selectedFile);

    const headers = getHeaders(token, true)
    try {
      if (!navigator.onLine) {
        return
      }
      const response = await axiosInstance.post(url.UploadFile, formData, {headers});
      return response?.data;
    } catch (error) {
      if (showGlobalMsg) {
        handleError(error);
        if (error.code === "ERR_NETWORK") {
          warningToast("Sorry for inconveniance our server is down")
        }
      }
      return error?.response?.data ? error?.response?.data : undefined;
    }
  };

  // Provide the functions and error state
  return (
    <AxiosContext.Provider value={{ post, get, uploadFile, error }}>
      {children}
    </AxiosContext.Provider>
  );
};

// Export useAxios hook
const useAxios = () => useContext(AxiosContext);

export default useAxios;


// {
//   "timeStamp": "Thu Feb 01 2024 23:46:01 GMT+0530 (India Standard Time)",
//   "httpStatus": "OK",
//   "statusCode": 200,
//   "message": "User created",
//   "data": {
//       "userData": {
//           "userId": 20,
//           "firstName": "Ram",
//           "lastName": "Singh",
//           "email": "abcd@gmail.com",
//           "imageURL": null,
//           "createdAt": "2024-02-01T18:16:01.000Z",
//           "createdBy": null,
//           "deleted": 0,
//           "deleteBy": null,
//           "userType": 1
//       },
//       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwLCJpYXQiOjE3MDY4MTEzNjF9.6bdlHSvSb3fk7w5UDeYaJs8pD0D_Mxy52pQiMjwKIgI"
//   }
// }