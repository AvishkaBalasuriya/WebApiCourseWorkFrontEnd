import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { fetchLoginData, fetchOTP } from "../../../store/logginActions";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Row, Col, Card } from "react-bootstrap";
import APIURl from "../../../APIConfig";
import axios from "axios";

import notify from "devextreme/ui/notify";
class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.state = {
      retunToVerification: 1,
      userId: null,
      TempID: "",
    };
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  OnNotification = (message, type) => {
    notify({
      message: message,
      type: type,
      displayTime: 3000,
      position: { at: "top right", offset: "50" },
    });
  };

  OnClickForgetPassword = (email) => {
    var data = JSON.stringify({ contact: email });
    var config = {
      method: "post",
      url: "" + APIURl.URL + "otp/issue",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log("asdasdasd", response.data);
        if (response.data.success) {
          this.onLoadPanelHiding(response.data.message, "success");
          this.setState({
            retunToVerification: 2,
            userId: response.data.data.userId,
          });
        } else {
          this.onLoadPanelHiding(
            response.data.error == null
              ? response.data.message
              : response.data.error,
            "error"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        this.onLoadPanelHiding("Error", "error");
      });
  };

  onLoadPanelHiding = (message, type) => {
    this.setState({
      LoadPanelVisible: false,
    });

    notify({
      message: message,
      type: type,
      displayTime: 3000,
      position: { at: "top right", offset: "50" },
    });
  };

  OnClickVerifyOTP = (OTP) => {
    axios
      .post("" + APIURl.URL + "otp/verify", {
        userId: this.state.userId,
        otpCode: OTP,
      })
      .then((response) => {
        if (response.data.success) {
          this.onLoadPanelHiding(response.data.message, "success");
          this.setState({
            retunToVerification: 3,
            TempID: response.data.data.otpId,
          });
        } else {
          this.onLoadPanelHiding(
            response.data.error == null
              ? response.data.message
              : response.data.error,
            "error"
          );
        }
      })
      .catch((error) => {
        console.log("error", error);
        this.onLoadPanelHiding("Error", "error");
      });
  };

  OnClickPasswordChange = (password, confirmPassword) => {
    var data = JSON.stringify({
      otpId: this.state.TempID,
      password: password,
      passwordConfirm: confirmPassword,
    });

    var config = {
      method: "post",
      url: "" + APIURl.URL + "auth/forget",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        if (response.data.success) {
          this.onLoadPanelHiding(response.data.message, "success");
          this.setState({
            retunToVerification: 4,
            TempID: 1,
          });
        } else {
          this.onLoadPanelHiding(
            response.data.error == null
              ? response.data.message
              : response.data.error,
            "error"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        this.onLoadPanelHiding("Error", "error");
      });
  };

  render() {
    if (this.state.retunToVerification == 1) {
      return (
        <Aux>
          <Breadcrumb />
          <div className="auth-wrapper">
            <div className="auth-content">
              <div className="auth-bg">
                <span className="r" />
                <span className="r s" />
                <span className="r s" />
                <span className="r" />
              </div>
              <div className="card">
                <div className="card-body text-center">
                  <div className="mb-4">
                    <i className="feather icon-unlock auth-icon" />
                  </div>
                  <h3 className="mb-4">Shop More Forget Password</h3>

                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Or Mobile Number"
                      name="email"
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group text-left"></div>
                  <button
                    className="btn btn-primary shadow-2 mb-4"
                    onClick={() => this.OnClickForgetPassword(this.state.email)}
                  >
                    Send
                  </button>

                  <p>
                    <a className="mb-0 text-muted" href="/login">
                      Login
                    </a>
                  </p>

                  <p className="mb-0 text-muted"></p>
                  <p className="mb-0 text-muted">Version 2.6.0</p>
                </div>
              </div>
            </div>
          </div>
        </Aux>
      );
    } else {
      if (this.state.retunToVerification == 2) {
        return (
          <Aux>
            <Breadcrumb />
            <div className="auth-wrapper">
              <div className="auth-content">
                <div className="auth-bg">
                  <span className="r" />
                  <span className="r s" />
                  <span className="r s" />
                  <span className="r" />
                </div>
                <div className="card">
                  <div className="card-body text-center">
                    <div className="mb-4">
                      <i className="feather icon-unlock auth-icon" />
                    </div>
                    <h3 className="mb-4">Email Variication</h3>
                    <Row>
                      <Col md={2} xl={2}></Col>
                      <Col md={4} xl={4}>
                        <div className="timer-wrapper mb-4">
                          <CountdownCircleTimer
                            isPlaying
                            duration={10}
                            colors={[
                              ["#004777", 0.33],
                              ["#F7B801", 0.33],
                              ["#A30000"],
                            ]}
                            onComplete={() => [true, 1000]}
                          >
                            {renderTime}
                          </CountdownCircleTimer>
                        </div>
                      </Col>
                    </Row>
                    <div className="input-group mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Your OTP"
                        name="OTP"
                        onChange={this.onChange}
                      />
                    </div>

                    <button
                      className="btn btn-primary shadow-2 mb-4"
                      onClick={() => this.OnClickVerifyOTP(this.state.OTP)}
                    >
                      Verify
                    </button>

                    <p className="mb-0 text-muted"></p>
                    <p className="mb-0 text-muted">Version 2.6.0</p>
                  </div>
                </div>
              </div>
            </div>
          </Aux>
        );
      } else {
        if (this.state.retunToVerification == 3) {
          return (
            <Aux>
              <Breadcrumb />
              <div className="auth-wrapper">
                <div className="auth-content">
                  <div className="auth-bg">
                    <span className="r" />
                    <span className="r s" />
                    <span className="r s" />
                    <span className="r" />
                  </div>
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="mb-4">
                        <i className="feather icon-unlock auth-icon" />
                      </div>
                      <h3 className="mb-4">Change Password</h3>

                      <div className="input-group mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter Password"
                          name="Password"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter Confirm Password"
                          name="ConPassword"
                          onChange={this.onChange}
                        />
                      </div>

                      <button
                        className="btn btn-primary shadow-2 mb-4"
                        onClick={() =>
                          this.OnClickPasswordChange(
                            this.state.Password,
                            this.state.ConPassword
                          )
                        }
                      >
                        Verify
                      </button>

                      <p className="mb-0 text-muted"></p>
                      <p className="mb-0 text-muted">Version 2.6.0</p>
                    </div>
                  </div>
                </div>
              </div>
            </Aux>
          );
        } else {
          return <Redirect to={"/login"} />;
        }
      }
    }
  }
}

const renderTime = ({ remainingTime }) => {
  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.loggedReducer);
  return {
    data: state.loggedReducer,
  };
};

export default connect(mapStateToProps)(ForgetPassword);
