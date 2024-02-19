import React, { useEffect, useState } from "react";
import { PathName } from "../../helper/constants/pathNames.ts";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../../assets/index.ts";

function RegisterSuccessFully() {
  const navigate = useNavigate();
  const [countdown, setCountDown] = useState(3);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown(count => count - 1)
    }, 1000);
    return () => {
      console.log("clear")
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (countdown < 0) {
      navigate(PathName.homePath);
    }
  }, [countdown, navigate])
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card col-3  d-flex justify-content-center p-5 ">
        <img
          src={imageUrl.SuccessImg}
          className="card-img-top  w-25 h-25 d-flex align-self-center mt-10"
          alt="..."
        />
        <div className="card-body d-flex flex-column justify-content-center">
          <p className="fw-bold text-center f-3">Register SuccessFully</p>
          <p className="text-center f-3">Thank you for you Registration</p>
          <a className="text-center f-3 bg-red " href={PathName.homePath}>
            redirection to home screen in {countdown} s.
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccessFully;
