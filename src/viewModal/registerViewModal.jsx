import React, { useContext, useState } from 'react'
import { PASSWORD_REGEX } from '../helper/constants/constant.ts';
import { useLogin } from '../context/login.context.jsx';
import { POST, getHeaders } from '../api/restClient.ts';
import URL from '../api/url.ts'
import { PathName } from '../helper/constants/pathNames.ts';
import { useNavigate } from "react-router-dom";
function RegisterViewModal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    "firstName": "",
  "lastName": "",
  "email": "",
  "password": "",
  "passwordConfirm": "",
  });
  const [showToast, setShowToast] = useState(false);
  const [showToastMessage, setshowToastMessage] = useState('');
  const loginStore = useLogin();
   /** Function to handle form field changes */
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /** Click on Register button to registration */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validatePassword(formData.password, formData.passwordConfirm)){
      setTimeout(() => {
        setShowToast(false);
      }, 700);
      return;
    }
    try {
      const response = await POST(URL.Register,getHeaders(null),formData);
      console.log("response --->", JSON.stringify(response));
      if(response.data.statusCode===200){
        const output = response?.data?.data;
        console.debug("🚀 ------------------------------------🚀")
        console.debug("🚀 ~ handleSubmit ~ output:", output)
        console.debug("🚀 ------------------------------------🚀")
        if(output){
          console.log("Error ----> ")
          loginStore.setToken(output?.token);
          loginStore.login(output.userData);
          navigate(PathName.registerSuccessPath);
        }
      }
    } catch (error) {
    }

  };

  /** check valid Password 
   * check password and confirm password 
   */
  const validatePassword =(password , confirmPassword)=>{
    if(password != confirmPassword){
      setshowToastMessage("Password not matched!")
      setShowToast(true);
      return false;
    }
    if(!PASSWORD_REGEX.test(password)){
      setshowToastMessage("Missing a special character")
      setShowToast(true);
      return false;
    }
    return true;
  }


  return {
    handleInputChange,
    handleSubmit,
    formData,
    setFormData,
    showToast, setShowToast,
    showToastMessage,

  }
}

export default RegisterViewModal
