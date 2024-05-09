import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useAppContext } from "../../context/app.context.jsx";
import { PathName } from "../../helper/constants/pathNames.ts";
import url from "../../api/url.ts";
import { dangerToast } from "../../components/customToast";
import useAxios from "../../api/restClient";
import { TextField } from "@mui/material";

function Login() {
  const axios = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const loginStore = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData?.email && formData?.passwordConfirm) {
      console.log("error");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(url.Login, formData);
      if (response?.statusCode === 200) {
        const output = response?.data;
        const status = response?.httpStatus;
        if (output && status === "OK") {
          console.log("Error ----> ");
          loginStore.setToken(output?.token);
          loginStore.login(output.userData);
          navigate(PathName.registerSuccessPath);
        } else {
          dangerToast(response?.message)
        }
      }
    } catch (error) {
      dangerToast(error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light">Login</h3>
              </div>
              <div className="card-body mt-2">
                <form>
                  <TextField
                    fullWidth
                    label="Email"
                    id="outlined-size-small"
                    size="small"
                    name="email"
                    placeholder="Enter email address"
                    value={formData?.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    type="password"
                    style={{
                      marginTop: 25,
                    }}
                    fullWidth
                    label="Password"
                    placeholder="Enter password"
                    id="outlined-size-small"
                    size="small"
                    name="password"
                    value={formData?.password}
                    onChange={handleInputChange}
                  />
                  {/* <div className="form-group pt-3">
                              <div className="custom-control custom-checkbox">
                                  <input className="custom-control-input" id="rememberPasswordCheck" type="checkbox" />
                                  <label className="custom-control-label" htmlFor="rememberPasswordCheck">Remember password</label>
                              </div>
                          </div> */}
                  <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                    <Link className="small" to={PathName.forgotPassword}>
                      Forgot Password?
                    </Link>
                    <button
                      onClick={(e) => handleSubmit(e)}
                      // href={PathName.registerSuccessPath}
                      className="btn btn-primary align-middle"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <span
                          className="spinner-border spinner-border-sm mr-4"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      Log in
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center">
                <div className="small">
                  <Link to={PathName.registerPath}>
                    Need an account? Sign up!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
