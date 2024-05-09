import React, { useState } from "react";
import "./index.css";
import RegisterViewModal from "../../viewModal/registerViewModal";
import { Link } from "react-router-dom";
import { PathName } from "../../helper/constants/pathNames.ts";
import { TextMessage } from "../../helper/constants/textMessage.ts";
import { TextField } from "@mui/material";

function Register() {
  const { formData, handleInputChange, handleSubmit, loading } =
    RegisterViewModal();
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light">Register</h3>
              </div>
              <div className="card-body">
                <form>
                  <TextField
                    fullWidth
                    style={{
                      marginTop: 15,
                    }}
                    label="First Name"
                    id="outlined-size-small"
                    size="small"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    style={{
                      marginTop: 15,
                    }}
                    fullWidth
                    label="Last Name"
                    id="outlined-size-small"
                    size="small"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    style={{
                      marginTop: 15,
                    }}
                    type="email"
                    label="Email Address"
                    id="outlined-size-small"
                    size="small"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    type="password"
                    style={{
                      marginTop: 15,
                    }}
                    fullWidth
                    label="Password"
                    id="outlined-size-small"
                    size="small"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <TextField
                    type="password"
                    style={{
                      marginTop: 15,
                    }}
                    fullWidth
                    label="Confirm Password"
                    id="outlined-size-small"
                    size="small"
                    name="passwordConfirm"
                    placeholder="Confirm your password"
                    value={formData.passwordConfirm}
                    onChange={handleInputChange}
                  />
                  <button
                    onClick={(e) => handleSubmit(e)}
                    // href={PathName.registerSuccessPath}
                    className="btn btn-primary align-middle mt-3"
                    disabled={loading}
                  >
                    {loading && (
                      <span
                        className="spinner-border spinner-border-sm mr-4"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Register
                  </button>
                </form>
              </div>
              <div className="card-footer text-center">
                <div className="small mb-1">
                  <Link
                    className="nav-link text-primary pb-2"
                    to={PathName.loginPath}
                  >
                    {TextMessage.ALREADYHAVEACCOUNT}
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

export default Register;
