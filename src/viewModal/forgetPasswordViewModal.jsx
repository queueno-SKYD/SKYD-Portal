import React, { useEffect, useState } from "react";
import {
  dangerToast,
  successToast,
  warningToast,
} from "../components/customToast";
import { PASSWORD_REGEX } from "../helper/constants/constant.ts";

import url from "../api/url.ts";
import { PathName } from "../helper/constants/pathNames.ts";
import { useNavigate } from "react-router-dom";
import useAxios from "../api/restClient.jsx";

function ForgetPasswordViewModal() {
  const axios = useAxios();
  const [IsOtpScreen, setIsOtpScreen] = useState(false);
  const [otpCode, setotpCode] = useState("");
  const [loading, setloading] = useState(false);
  const [reLoading, setreLoading] = useState(false);
  const [otpData, setotpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setotpData({ ...otpData, [name]: value });
  };

  const callToSendOtp = async () => {
    const { email } = otpData;
    if (email === "") {
      warningToast("Please enter email !");
      return;
    }
    try {
      setloading(true);
      const response = await axios.post(url.forgotPassword, {
        email,
      });
      const output = response.data;
      if (output.statusCode === 200) {
        successToast(output.message);
        setIsOtpScreen(true);
        resetTimer();
      } else {
        dangerToast(output.message);
        return;
      }
      console.log("Response -------> ", response);
    } catch (error) {
      console.log("error ------>", JSON.stringify(error));
      dangerToast(error.message);
    } finally {
      setloading(false);
    }
  };

  const callToVerifyOtp = async () => {
    const { email, password, confirmPassword } = otpData;
    if (otpCode === "" || otpCode.length < 6) {
      warningToast("Please enter valid otp !");
      return;
    }
    if (email === "") {
      warningToast("Please enter email !");
      return;
    }
    if (password === "" || confirmPassword === "") {
      warningToast("Please enter password !");
      return;
    }
    if (password !== confirmPassword) {
      warningToast("Password and confirm password should be same !");
      return;
    }
    if (!PASSWORD_REGEX.test(password)) {
      warningToast("Password should be strong !");
      return;
    }

    try {
      setloading(true);
      const response = await axios.post(url.verifyOtp, {
        ...otpData,
        otp: Number(otpCode),
      });
      const output = response.data;
      if (output.statusCode === 200) {
        successToast(output.message);
        setIsOtpScreen(true);
        setotpData({
          email: "",
          password: "",
          confirmPassword: "",
        });
        setotpCode("");
        navigate(PathName.loginPath);
      } else {
        dangerToast(output.message);
        return;
      }
    } catch (error) {
      console.log("error ------>", JSON.stringify(error));
      dangerToast(error.message);
    } finally {
      setloading(false);
    }
  };

  const callToResendOtp = async (e) => {
    e.preventDefault();
    try {
      setreLoading(true);
      const { email } = otpData;
      const response = await axios.post(url.forgotPassword, {
        email,
      });
      const output = response.data;
      if (output.statusCode === 200) {
        successToast(output.message);
        resetTimer();
      } else {
        dangerToast(output.message);
        return;
      }
    } catch (error) {
      dangerToast(error.message);
    } finally {
      setreLoading(false);
    }
  };

  const resetTimer = () => {
    setMinutes(0);
    setSeconds(59);
  };

  const clickOnBackButton = ()=>{
    if (!IsOtpScreen) {
      navigate(PathName.loginPath);
    } else {
      setIsOtpScreen(false);
    }
  }

  return {
    minutes,
    callToVerifyOtp,
    callToResendOtp,
    resetTimer,
    callToSendOtp,
    handleChange,
    IsOtpScreen,
    loading,
    reLoading,
    clickOnBackButton,
    setotpCode,
    seconds,minutes,
    otpCode,loading,
    otpData
  };
}

export default ForgetPasswordViewModal;
