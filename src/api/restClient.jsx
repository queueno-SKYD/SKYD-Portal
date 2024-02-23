import axios from "axios"

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLogin } from "../context/login.context";
import { dangerToast } from "../components/customToast";

export const getHeaders = (token)=>{
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
const AxiosContext = createContext({get: async (url="", showGlobalMsg = true) => {}, post: async (url="", body={}, showGlobalMsg = true) => {}});
const endPoint = 'http://localhost:3001';

// Provider component
export const AxiosProvider = ({ children }) => {
  const { token } = useLogin();
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
  const post = async (url, body, showGlobalMsg = true) => {
    const headers = getHeaders(token)
    try {
      const response = await axiosInstance.post(url, body, {headers});
      return response.data;
    } catch (error) {
      if (showGlobalMsg) {
        handleError(error);
      }
      return error.response.data;
    }
  };

  const get = async (url, showGlobalMsg = true) => {
    const headers = getHeaders(token)
    try {
      const response = await axiosInstance.get(url, {headers});
      return response.data;
    } catch (error) {
      if (showGlobalMsg) {
        handleError(error);
        dangerToast(error);
      }
      throw error;
    }
  };

  // Provide the functions and error state
  return (
    <AxiosContext.Provider value={{ post, get, error }}>
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