import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { POST, getHeaders } from "../../api/restClient.ts";
import { useLogin } from "../../context/login.context";
import { PathName } from "../../helper/constants/pathNames.ts";
import url from "../../api/url.ts";

function Login() {
  const loginStore = useLogin();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData?.email && formData?.passwordConfirm){
      console.log("error")
      return;
    }
    console.debug(formData)
    try {
      const response = await POST(url.Login, getHeaders(null), formData);
      console.log("response --->", JSON.stringify(response));
      if(response.data.statusCode === 200){
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
  return (
    <div className="login-container">
      <h2>Login</h2>

      <form>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-3 col-form-label" >
            Email
          </label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail3" name="email"
              value={formData?.email}
              onChange={handleInputChange}/>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword3" name="password"
              value={formData?.password}
              onChange={handleInputChange}/>
          </div>
        </div>
        <button
          onClick={(e) => handleSubmit(e)}
          // href={PathName.registerSuccessPath}
          className="btn btn-primary align-middle"
        >
          Login in
        </button>
      </form>
    </div>
  );
}

export default Login;
