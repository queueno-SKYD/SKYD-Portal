import { Button, TextField } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./index.css";
import ForgetPasswordViewModal from "../../viewModal/forgetPasswordViewModal.jsx";

function ForgotPassword() {
  const {
    otpCode,
    loading,
    otpData,
    IsOtpScreen,
    clickOnBackButton,
    setotpCode,
    handleChange,
    seconds,
    minutes,
    reLoading,
    callToResendOtp,
    callToSendOtp,
    callToVerifyOtp,
  } = ForgetPasswordViewModal();

  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-5  ">
            <div className="card  border-0  shadow-lg rounded-lg ">
              <ArrowBackIosIcon
                onClick={() => clickOnBackButton()}
                style={{
                  marginLeft: 15,
                  marginTop: 10,
                  color: "#85B4B1",
                  fontSize: 15,
                  cursor: "pointer",
                }}
              />
              <h3 className="text-center font-weight-light mt-2">
                Reset Password
              </h3>
              {IsOtpScreen ? (
                <div className="card-body">
                  <form>
                    <p
                      className="m-2 mb-1"
                      style={{ fontSize: 14, color: "#929090" }}
                    >
                      Enter code sent
                    </p>

                    <MuiOtpInput
                      borderColor={"#85B4B1"}
                      TextFieldsProps={{ size: "small" }}
                      length={6}
                      value={otpCode}
                      onChange={(e) => setotpCode(e)}
                    />
                    <TextField
                      type="password"
                      style={{
                        marginTop: 25,
                      }}
                      fullWidth
                      label="Password"
                      id="outlined-size-small"
                      size="small"
                      name="password"
                      value={otpData.password}
                      onChange={handleChange}
                    />
                    <TextField
                      type="password"
                      style={{
                        marginTop: 10,
                      }}
                      fullWidth
                      label="Confirm Password"
                      id="outlined-size-small"
                      size="small"
                      name="confirmPassword"
                      value={otpData.confirmPassword}
                      onChange={handleChange}
                    />

                    <div className="countdown-text">
                      {seconds > 0 || minutes > 0 ? (
                        <p>
                          Time Remaining:{" "}
                          <span style={{ fontWeight: 600 }}>
                            {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                          </span>
                        </p>
                      ) : (
                        <p>Didn't receive code?</p>
                      )}

                      <button
                        disabled={seconds > 0 || minutes > 0 || reLoading}
                        style={{
                          color:
                            seconds > 0 || minutes > 0 || reLoading
                              ? "#DFE3E8"
                              : "#FF5630",
                        }}
                        onClick={callToResendOtp}
                      >
                        Resend OTP{" "}
                        {reLoading && (
                          <span
                            style={{ marginLeft: 10 }}
                            className="spinner-border spinner-border-sm mr-4"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                      </button>
                    </div>

                    <Button
                      className="mt-3"
                      fullWidth
                      style={{
                        backgroundColor:
                          otpCode.length !== 6 ? "#DFE3E8" : "#85B4B1",
                        color: "white",
                      }}
                      variant="contained"
                      size="small"
                      onClick={() => callToVerifyOtp()}
                      disabled={loading || otpCode.length !== 6}
                    >
                      {loading && (
                        <span
                          style={{ marginRight: 10 }}
                          className="spinner-border spinner-border-sm mr-4"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      Submit
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="card-body">
                  <form>
                    <TextField
                      fullWidth
                      label="Email Address"
                      id="outlined-size-small"
                      size="small"
                      name="email"
                      value={otpData.email}
                      onChange={handleChange}
                    />
                    <Button
                      className="mt-5"
                      fullWidth
                      variant="contained"
                      size="small"
                      style={{ backgroundColor: "#85B4B1", color: "white" }}
                      onClick={() => callToSendOtp()}
                      disabled={loading}
                    >
                      {loading && (
                        <span
                          style={{ marginRight: 10 }}
                          className="spinner-border spinner-border-sm mr-4"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      Continue
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
